const express = require("express");
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const productRoutes = require("./routes/productRoutes");
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
const server = http.createServer(app);

app.use(cookieParser());

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/products", productRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = { server };
