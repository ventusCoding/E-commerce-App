const { server } = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXEPTION! 💥💥 Shutting Down... 💥💥");
  process.exit(1);
});

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successful");
  });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLER REJECTION! 💥💥 Shutting Down... 💥💥");
  server.close(() => {
    process.exit(1);
  });
});
