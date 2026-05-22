const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const files = [
  'C:\\Users\\wangh\\OneDrive\\Leonora\\02.电风扇\\Bilin Stone Brochure.pdf',
  'C:\\Users\\wangh\\OneDrive\\Leonora\\02.电风扇\\JIANHUI E-catalogue - EN - 25V8.pdf',
];

(async () => {
  for (const f of files) {
    console.log('\n\n=== FILE:', path.basename(f), '===\n');
    try {
      const parser = new PDFParse();
      const data = await parser.parse(fs.readFileSync(f));
      const text = data.pages.map(p => p.lines.map(l => l.words.map(w => w.text).join(' ')).join('\n')).join('\n\n');
      console.log(text.slice(0, 8000));
    } catch(e) {
      console.log('Error:', e.message, e.stack?.slice(0, 300));
    }
  }
})();
