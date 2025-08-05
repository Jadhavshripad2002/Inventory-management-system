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
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const supplierRoutes= require('./routes/supplierRoutes');
const app = express();

const customerRoutes = require('./routes/customerRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

app.use('/api/categories', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/supplier',supplierRoutes);
app.use('/api/customer',customerRoutes);
app.use((req, res) => {
  res.status(404).json({ msg: 'Not found' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
