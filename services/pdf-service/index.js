const express = require('express');
const fs = require('fs');
const path = require('path');
const { subscribe } = require('../../kafka/index');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = 4004;

// 🧾 Generate PDF from booking data
function generateBookingPDF(booking) {
  const pdfPath = path.join(__dirname, `booking-${booking.id}.pdf`);
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(pdfPath));
  doc.fontSize(20).text('Water Tank Cleaning Booking Summary', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Booking ID: ${booking.id}`);
  doc.text(`Customer: ${booking.customer}`);
  doc.text(`Cleaner: ${booking.cleaner}`);
  doc.text(`Status: ${booking.status}`);
  doc.text(`Time: ${booking.time}`);
  doc.end();

  console.log(`[PDF] Booking PDF generated at ${pdfPath}`);
}

// 👂 Subscribe to booking updates
subscribe('BOOKING_UPDATED', (booking) => {
  console.log(`[PDF Service] Generating PDF for booking #${booking.id}`);
  generateBookingPDF(booking);
});

app.listen(PORT, () => {
  console.log(`PDF Service running on http://localhost:${PORT}`);
});
