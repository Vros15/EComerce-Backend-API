const express = require("express");
const mongoose = require("mongoose");
const app = express();
const logger = require("morgan");
const connectToMongoDB = require("./database/connectToMongoDB");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");


app.use(express.json());
app.use(logger(`dev`));

app.use("/api/customers", require("./routes/customersRouter"));
app.use("/api/products", require("./routes/productsRouter"));
app.use("/api/carts", require("./routes/cartsRouter"));
app.use("/api/orders", require("./routes/ordersRouter"));

app.use(notFound);
app.use(errorHandler);
  
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectToMongoDB();

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  const shutdown = async (signal) => {
    console.log(`${signal} received. Shutting down gracefully...`);

    server.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

startServer().catch((error) => {
  console.error("Server startup failed", error);
  process.exit(1);
});