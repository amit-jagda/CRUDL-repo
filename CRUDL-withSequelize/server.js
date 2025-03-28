// require("express-async-errors");
const express = require("express");
const app = express();
const helmet = require("helmet");
//
const giveResponse = require("./globalHandler/globalResponseFunction");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const responseTime = require("./middleware/responseTime");
//
const booksRouter = require("./router/books.router");
const userRouter = require("./router/user.router");
//
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./Documentation/swagger.json");

const PORT = 9100;

///////// ----------------- MIDDLEWARES----------------- /////////
app.use(responseTime);
app.use(helmet());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// get - post - put - patch - delete  books
app.use("/register", userRouter);
app.use("/books", booksRouter);

app.use(globalErrorHandler);
// undefined routes
app.use((req, res) => {
  giveResponse(404, res, { error: "Not valid URL" });
});

//  port: 8000
app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
