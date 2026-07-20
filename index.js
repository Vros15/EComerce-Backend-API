const express = require("express");
const mongoose = require("mongoose");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const logger = require("morgan");
const connectToMongoDB = require("./database/connectToMongoDB");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    code: "RATE_LIMITED",
    message: "Too many requests, please try again later.",
    details: null,
  },
});

const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(logger(`dev`));
app.use("/api", limiter);

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