#!/usr/bin/env python3
"""Local dev server for CSVQuiz with a debug-mode save endpoint.

Serves the site like `python -m http.server`, and additionally accepts
`POST /verify` from debug mode to write verified=true into a question's CSV row.
Runs on localhost only. Use this instead of http.server when reviewing questions:

    python dev_server.py            # http://localhost:8000

POST /verify body (JSON): {"file": "math_04.csv", "description": "...", "choices": ["...", ...]}
The matching row (by description + choices) gets its `verified` column set to true.
"""
import csv
import io
import json
import re
import sys
import pathlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = pathlib.Path(__file__).parent.resolve()
DATA = ROOT / "data"
SAFE_NAME = re.compile(r"^[A-Za-z0-9_]+\.csv$")
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000


def mark_row(fname, description, choices, value):
    """Set verified=<value> on the row matching description + choices. Returns (ok, remaining)."""
    if not SAFE_NAME.match(fname):
        return False, "bad filename"
    path = (DATA / fname).resolve()
    if path.parent != DATA or not path.exists():
        return False, "not found"
    with open(path, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fields = list(reader.fieldnames or [])
        rows = list(reader)
    if "verified" not in fields:
        fields.append("verified")
    choice_cols = [c for c in fields if re.fullmatch(r"choice\d+", c)]
    matched = False
    for row in rows:
        if row.get("description", "") != description:
            continue
        row_choices = [row.get(c, "") for c in choice_cols if row.get(c, "")]
        if row_choices == list(choices):
            row["verified"] = value
            matched = True
            break
    if not matched:
        return False, "no matching row"
    buf = io.StringIO()
    w = csv.DictWriter(buf, fieldnames=fields)
    w.writeheader()
    for row in rows:
        w.writerow({k: row.get(k, "") for k in fields})
    path.write_text(buf.getvalue(), encoding="utf-8")
    remaining = sum(1 for row in rows if (row.get("verified", "") or "").strip() == "")
    return True, remaining


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=str(ROOT), **k)

    def _json(self, code, obj):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        ep = self.path.split("?")[0]
        if ep not in ("/verify", "/void"):
            self._json(404, {"ok": False, "error": "unknown endpoint"})
            return
        try:
            length = int(self.headers.get("Content-Length", 0))
            payload = json.loads(self.rfile.read(length) or b"{}")
            value = "true" if ep == "/verify" else "false"
            ok, info = mark_row(payload.get("file", ""), payload.get("description", ""), payload.get("choices", []), value)
            if ok:
                self._json(200, {"ok": True, "remaining": info})
            else:
                self._json(400, {"ok": False, "error": info})
        except Exception as e:  # noqa: BLE001
            self._json(500, {"ok": False, "error": str(e)})


if __name__ == "__main__":
    with ThreadingHTTPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"CSVQuiz dev server on http://localhost:{PORT}  (Ctrl+C to stop)")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nstopped")
