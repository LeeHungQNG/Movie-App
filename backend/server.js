// const express = require('express'); // in package.json => type: commonJS
import express from 'express'; // in package.json => type: module
import authRoutes from './routes/auth.route.js';
const app = express();

app.use('/api/v1/auth', authRoutes);

app.listen(5000, () => {
  console.log('Server started at localhost:5000');
});
