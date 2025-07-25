const express = require('express');
const bodyParser = require('body-parser');
const { publishEvent } = require('../../kafka/index');
const { bookings } = require('../../shared/data');
const { verifyToken } = require('../../shared/auth');
const cors = require('cors');
const app = express();
const PORT = 4002;
app.use(bodyParser.json());

// ➕ Create Booking Command
app.post('/commands/create', (req, res) => {
  const { customer, cleaner, time } = req.body;
  const id = bookings.length + 1;
  const booking = { id, customer, cleaner, status: 'Pending', time };
  bookings.push(booking);

  publishEvent('BOOKING_CREATED', booking);
  res.json({ success: true, booking });
});

// 📝 Update Booking Status Command
app.post('/commands/update', (req, res) => {
  const { id, status } = req.body;
  const booking = bookings.find(b => b.id == id);
  if (booking) {
    booking.status = status;
    publishEvent('BOOKING_UPDATED', booking);
    res.json({ success: true, booking });
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});
app.get('/bookings', (req, res) => {
  res.json(bookings);
});
app.listen(PORT, () => {
  console.log(`Booking Service running on http://localhost:${PORT}`);
});
