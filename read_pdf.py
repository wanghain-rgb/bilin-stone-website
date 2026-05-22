import pypdf
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

files = [
    r'C:\Users\wangh\OneDrive\Leonora\02.电风扇\JIANHUI E-catalogue - EN - 25V8.pdf',
]

for f in files:
    print(f'\n\n=== FILE: {f.split(chr(92))[-1]} ===\n')
    reader = pypdf.PdfReader(f)
    for i, page in enumerate(reader.pages[:25]):
        extracted = page.extract_text() or ''
        if extracted.strip():
            print(f'--- Page {i+1} ---')
            print(extracted[:2000])
