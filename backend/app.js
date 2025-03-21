const express = require('express');
const cors = require("cors");
const { getMostSoldProducts } = require('./services/mostSoldService');

const indexRouters = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/products/most-sold', async (req, res) => {
  try {
    const mostSold = await getMostSoldProducts();
    res.json(mostSold);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message, data: err.data });
  }
});

app.use('/', indexRouters);

app.get("/", (req, res) => {
  res.status(200).send("Health Check");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server On  http://localhost:${PORT} `);
});
