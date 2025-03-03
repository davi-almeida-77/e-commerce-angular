const express = require('express');
const cors = require("cors");

const indexRouters = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());


app.use('/', indexRouters);

app.get("/", (req, res) => {
  res.status(200).send("Health Check");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server On  http://localhost:${PORT} `);
});
