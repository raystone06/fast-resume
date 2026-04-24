import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportToPDF(elementId: string, filename = 'cv.pdf') {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element #${elementId} introuvable`);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  let position = 0;
  let remaining = imgHeight;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  remaining -= pageHeight;

  while (remaining > 0) {
    pdf.addPage();
    position -= pageHeight;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    remaining -= pageHeight;
  }

  pdf.save(filename);
}
