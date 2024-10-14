// const express = require('express'); // in package.json => type: commonJS
import express from 'express'; // in package.json => type: module

const app = express();

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(5000, () => {
  console.log('Server started at localhost:5000');
});
