import sys
from pathlib import Path
path = sys.argv[1] if len(sys.argv)>1 else r"c:\Users\ashis\Downloads\web development mandelbubl.pdf"
from pypdf import PdfReader
reader = PdfReader(path)
text_parts = []
for p in reader.pages:
    t = p.extract_text()
    if t:
        text_parts.append(t)
text = "\n\n".join(text_parts)
out = Path(__file__).parent / 'pdf_text_py.txt'
out.write_text(text, encoding='utf-8')
print('WROTE', out)
