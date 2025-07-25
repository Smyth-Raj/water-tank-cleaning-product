// Static in-memory data store (can be JSON or DB later)
const users = [
  { id: '1', email: 'customer@example.com', password: 'cust123', role: 'customer' },
  { id: '1', email: 'customer2@example.com', password: 'cust123', role: 'customer' },
  { id: '2', email: 'cleaner@example.com', password: 'clean123', role: 'cleaner' },
  { id: '3', email: 'admin@example.com', password: 'admin123', role: 'admin' },
];

const bookings = [
  { id: '101', customer: 'John', cleaner: 'cleanedHigh', time: '10AM', status: 'reasigned' },
  { id: '102', customer: 'Jaggu', cleaner: 'Raghu', time: '10AM', status: 'pending' },
  { id: '103', customer: 'Indrajeet', cleaner: 'Ramendra', time: '10AM', status: 'pending' },
  { id: '104', customer: 'Ravi', cleaner: 'Saku', time: '10AM', status: 'pending' },
  { id: '105', customer: 'Ranjana', cleaner: 'Daku', time: '11PM', status: 'pending' },
  { id: '106', customer: 'Rekha', cleaner: 'bhakesh', time: '10AM', status: 'pending' },
  { id: '107', customer: 'Rakhi', cleaner: 'indresh', time: '12PM', status: 'pending' }

];

module.exports = {
  users,
  bookings
};
