#!/usr/bin/env python3
"""Validate every question bank in data/.

Catches the failure modes that are invisible in a spreadsheet but break the
app at runtime: a correct index pointing at a choice that does not exist, a
row whose columns have slipped, non-ASCII that becomes mojibake, a bare
fraction that a spreadsheet turned into a date, and an unescaped '$' that
KaTeX would swallow as a math delimiter.

Usage: python check_data.py   (exit status 1 if anything is wrong)
"""
import csv
import os
import re
import sys

DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')
REQUIRED = ('domain', 'description', 'correct', 'choice0')
DIFFICULTIES = {'beginner', 'easy', 'medium', 'hard', 'expert'}
# math and statistics use $...$ deliberately for LaTeX; everywhere else a
# dollar sign is currency and must be written \$ so KaTeX leaves it alone.
MATH_BANKS = ('math', 'statistics')
BARE_DOLLAR = re.compile(r'(?<!\\)\$')
BARE_FRACTION = re.compile(r'^\d+\s*/\s*\d+$')

problems = []


def report(fname, line, msg):
    problems.append(f'{fname}:{line}: {msg}')


def check_bank(path):
    fname = os.path.basename(path)
    subject = fname.rsplit('_', 1)[0]
    with open(path, newline='', encoding='utf-8') as fh:
        rows = list(csv.reader(fh))
    if not rows:
        return report(fname, 1, 'file is empty')
    header = [h.strip().lower() for h in rows[0]]
    for col in REQUIRED:
        if col not in header:
            report(fname, 1, f'missing required column: {col}')
    width = len(header)
    seen = {}
    for line, raw in enumerate(rows[1:], start=2):
        if not any(c.strip() for c in raw):
            continue
        if len(raw) != width:
            report(fname, line, f'has {len(raw)} fields, header has {width}')
            continue
        row = dict(zip(header, raw))
        desc = row.get('description', '').strip()
        if not desc:
            report(fname, line, 'empty description')
        elif desc in seen:
            report(fname, line, f'duplicate of line {seen[desc]}')
        else:
            seen[desc] = line

        choices = [row.get(f'choice{i}', '').strip() for i in range(10)]
        present = [i for i, c in enumerate(choices) if c]
        if len(present) < 2:
            report(fname, line, f'needs at least 2 choices, has {len(present)}')
        if len(set(choices[i] for i in present)) != len(present):
            report(fname, line, 'duplicate choice text')

        correct = row.get('correct', '').strip()
        if not correct or not correct.isdigit():
            report(fname, line, f'correct must be digit indices, got {correct!r}')
        else:
            for d in set(correct):
                if int(d) not in present:
                    report(fname, line,
                           f'correct={correct} points at choice{d}, which is empty or absent')

        diff = row.get('difficulty', '').strip().lower()
        if diff and diff not in DIFFICULTIES:
            report(fname, line, f'unknown difficulty {diff!r}')

        point = row.get('point', '').strip()
        if point and not point.isdigit():
            report(fname, line, f'point must be a number, got {point!r}')

        verified = row.get('verified', '').strip().lower()
        if verified and verified not in ('true', 'false', '1', '0', 'yes', 'no'):
            report(fname, line, f'verified must be blank/true/false, got {verified!r}')

        for col, value in row.items():
            if not value:
                continue
            if not value.isascii():
                bad = [c for c in value if not c.isascii()]
                report(fname, line, f'non-ASCII {bad[:3]} in {col}')
            if BARE_FRACTION.match(value):
                report(fname, line, f'{col} is a bare fraction ({value!r}); a spreadsheet '
                                    'will turn it into a date')
            if subject not in MATH_BANKS and BARE_DOLLAR.search(value):
                report(fname, line, f'unescaped "$" in {col}; write it as \\$ so KaTeX '
                                    'does not read it as a math delimiter')


def check_manifest():
    path = os.path.join(DATA, '_manifest.csv')
    with open(path, newline='', encoding='utf-8') as fh:
        rows = list(csv.DictReader(fh))
    listed = set()
    for line, row in enumerate(rows, start=2):
        f = (row.get('file') or '').strip()
        if not f:
            continue
        listed.add(f)
        if not os.path.exists(os.path.join(DATA, f)):
            report('_manifest.csv', line, f'lists {f}, which does not exist')
    on_disk = {f for f in os.listdir(DATA) if f.endswith('.csv') and not f.startswith('_')}
    for f in sorted(on_disk - listed):
        report('_manifest.csv', 1, f'{f} exists but is not listed, so it is unreachable')


def check_localization():
    path = os.path.join(DATA, '_localization.csv')
    with open(path, newline='', encoding='utf-8') as fh:
        rows = list(csv.reader(fh))
    seen = {}
    for line, row in enumerate(rows[1:], start=2):
        if not any(c.strip() for c in row):
            continue
        if len(row) != 2:
            report('_localization.csv', line, f'expected 2 fields, got {len(row)}')
            continue
        key = row[0].strip()
        if key in seen:
            report('_localization.csv', line, f'duplicate key {key!r} (also line {seen[key]})')
        seen[key] = line


def main():
    banks = sorted(f for f in os.listdir(DATA)
                   if f.endswith('.csv') and not f.startswith('_'))
    for f in banks:
        check_bank(os.path.join(DATA, f))
    check_manifest()
    check_localization()
    if problems:
        print(f'{len(problems)} problem(s) found:\n')
        for p in problems:
            print(' ', p)
        return 1
    print(f'OK: {len(banks)} question banks, manifest and localization all valid.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
