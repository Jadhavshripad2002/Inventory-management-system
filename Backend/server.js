// const express = require('express');
// const cors = require('cors');
// const categoryRoutes = require('./routes/categoryRoutes');

// const app = express();

// app.use(cors());
// app.use(express.json());

 

// app.use('/api/categories', categoryRoutes);

// // app.use((req, res) => {
// //   res.status(404).json({ msg: 'Not found' });
// // });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// ✅ middlewares FIRST
app.use(cors());
app.use(express.json());

// ✅ THEN routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

// optional: handle 404
app.use((req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
