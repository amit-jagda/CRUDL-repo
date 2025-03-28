const express = require("express");
const app = express();
const helmet = require("helmet");
//
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./Documentation/swagger.json");
//
const giveResponse = require("./globalHandler/globalResponseFunction");
const globalErrorHandler = require("./globalHandler/globalErrorHandler");
const isAdmin = require("./middleware/isAdmin");
const responseTime = require("./middleware/responseTime");
const booksRouter = require("./router/books.router");
//
const PORT = 8000;

///////// ----------------- MIDDLEWARES----------------- /////////

// helmet
app.use(helmet());
app.use(express.json());
app.use(responseTime);

// authentication : admin
app.use((req, res, next) => isAdmin(req, res, next));
// routing
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/books", booksRouter);

// // Handling non- existing routes
app.use((req, res) => {
  giveResponse(404, res, { error: "Not valid URL" });
});

// handling global errors
app.use(globalErrorHandler);

// listening to port: 8000
app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

// add router
