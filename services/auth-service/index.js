const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { users } = require('../../shared/data');
const { generateToken } = require('../../shared/auth');
const cors = require('cors');

const SECRET = 'water_tank_secret';
const app = express();
const PORT = 4001;

app.use(cors());
app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '2h' });
  res.json({ token, user: { email: user.email, role: user.role } });
});

// ✅ Register Endpoint (mock)
app.post('/register', (req, res) => {
  const { email, password, role } = req.body;
  const exists = users.find(u => u.email === email);
  if (exists) return res.status(409).json({ error: 'Email already exists' });

  const newUser = { id: users.length + 1, email, password, role };
  users.push(newUser);
  const token = jwt.sign({ id: newUser.id, email, role }, SECRET, { expiresIn: '2h' });

  res.json({ token, user: { email, role } });
});

app.listen(PORT, () => {
  console.log(`Auth Service running on http://localhost:${PORT}`);
});
