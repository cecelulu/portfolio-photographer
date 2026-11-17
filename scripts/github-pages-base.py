# Préfixe tous les chemins absolus du site par /portfolio-photographer (hébergement GitHub Pages).
import os, re, sys
root, base = sys.argv[1], '/portfolio-photographer'
top = sorted(n for n in os.listdir(root) if not n.startswith('.'))
names = '|'.join(re.escape(n) for n in top)
pat = re.compile(r'(?<=[\"\'`(,\s=])/(?=(?:' + names + r')(?:[/\"\'`)?#\s,]|$))')
home = re.compile(r'(?<=href=)(["\'])/\1')
count = 0
for d, dirs, files in os.walk(root):
    dirs[:] = [x for x in dirs if not x.startswith('.')]
    for f in files:
        if not f.endswith(('.html', '.css', '.js', '.txt', '.xml', '.json', '.webmanifest', '.svg')): continue
        p = os.path.join(d, f); s = open(p, encoding='utf-8').read()
        s2, n1 = pat.subn(base + '/', s)
        s2, n2 = home.subn(lambda m: m.group(1) + base + '/' + m.group(1), s2)
        if n1 or n2: open(p, 'w', encoding='utf-8').write(s2); count += n1 + n2
print('rewritten', count, 'top-level:', top)
