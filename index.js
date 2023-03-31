const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;
const HOST = 'localhost';

const server = app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
