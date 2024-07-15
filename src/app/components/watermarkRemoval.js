import { PDFDocument } from 'pdf-lib';

export async function removeWatermarkFromPDF(pdfBytes) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const { height } = page.getSize();
    const watermarkHeight = 50; // Adjust as necessary
    page.setCropBox(0, watermarkHeight, page.getWidth(), height - watermarkHeight);
  });

  const pdfBytesModified = await pdfDoc.save();
  return pdfBytesModified;
}
