import pathlib

def strip_comments(src: str) -> str:
    out = []
    i = 0
    n = len(src)
    state = 'normal'
    quote_char = None
    while i < n:
        ch = src[i]
        nxt = src[i+1] if i+1 < n else ''
        if state == 'normal':
            if ch == '"' or ch == "'":
                quote_char = ch
                out.append(ch)
                state = 'string'
                i += 1
                continue
            if ch == '':
                out.append(ch)
                state = 'template'
                i += 1
                continue
            if ch == '/' and nxt == '/':
                if i+2 < n and src[i+2] == '/':
                    out.append('///')
                    i += 3
                    while i < n and src[i] != '\n':
                        out.append(src[i])
                        i += 1
                    continue
                i += 2
                while i < n and src[i] != '\n':
                    i += 1
                continue
            if ch == '/' and nxt == '*':
                i += 2
                while i < n-1 and not (src[i] == '*' and src[i+1] == '/'):
                    i += 1
                i += 2
                continue
            out.append(ch)
            i += 1
        elif state == 'string':
            out.append(ch)
            if ch == '\\':
                if i+1 < n:
                    out.append(src[i+1])
                    i += 2
                    continue
            if ch == quote_char:
                state = 'normal'
            i += 1
        elif state == 'template':
            out.append(ch)
            if ch == '\\':
                if i+1 < n:
                    out.append(src[i+1])
                    i += 2
                    continue
            if ch == '':
                state = 'normal'
            i += 1
    return ''.join(out)

root = pathlib.Path('.').resolve()
patterns = ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.mjs']
changed = []
for pat in patterns:
    for path in root.glob(pat):
        if path.name == 'strip_comments.py':
            continue
        text = path.read_text(encoding='utf-8')
        newtext = strip_comments(text)
        if newtext != text:
            path.write_text(newtext, encoding='utf-8')
            changed.append(str(path.relative_to(root)))
print('changed files:', len(changed))
for p in changed:
    print(p)
