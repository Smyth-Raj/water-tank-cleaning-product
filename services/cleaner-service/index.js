const express = require('express');
const bodyParser = require('body-parser');
const { subscribe } = require('../../kafka/index');

const app = express();
const PORT = 4003;
app.use(bodyParser.json());

// 📥 Listen for BOOKING_CREATED events
subscribe('BOOKING_CREATED', (booking) => {
  console.log(`[Cleaner] New booking received:`, booking);

  // Simulate business logic: Accept the booking
  console.log(`[Cleaner] Auto-accepting booking #${booking.id}`);

  // Normally would call booking-service or emit event to update
  // but we only log it here for demo purposes.
});

// 📥 Listen for status updates
subscribe('BOOKING_UPDATED', (booking) => {
  console.log(`[Cleaner] Booking updated:`, booking);
});

app.listen(PORT, () => {
  console.log(`Cleaner Service running on http://localhost:${PORT}`);
});
