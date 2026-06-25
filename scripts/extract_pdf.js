const fs = require('fs');
const pdfModule = require('pdf-parse');
console.log('pdfModule type:', typeof pdfModule);
console.log('pdfModule keys:', Object.keys(pdfModule));
const pdf = (typeof pdfModule === 'function') ? pdfModule : (pdfModule.default || pdfModule.parse || pdfModule);
const path = process.argv[2] || 'c:\\Users\\ashis\\Downloads\\web development mandelbubl.pdf';

try{
  let dataBuffer = fs.readFileSync(path);
  pdf(dataBuffer).then(function(data){
    fs.writeFileSync('c:\\Users\\ashis\\Downloads\\TaskFlow1-main\\TaskFlow1-main\\scripts\\pdf_text.txt', data.text, 'utf8');
    console.log('WROTE scripts/pdf_text.txt');
  }).catch(err=>{console.error(err); process.exit(1);});
}catch(err){console.error(err); process.exit(1);}