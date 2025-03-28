const giveResponse = require("../globalHandler/globalResponseFunction");

function isAdmin(req, res, next) {
  // Check if the request method is POST, PUT, DELETE, or PATCH
  if (
    req.method === "POST" ||
    req.method === "PUT" ||
    req.method === "PATCH" ||
    req.method === "DELETE"
  ) {
    // Check if the request body has the 'role' property
    if (!req.body || !req.body.role) {
      return giveResponse(400, res, {
        error: "Role property is required for POST, PUT, and PATCH requests",
      });
    }
  }

  next();
}

module.exports = isAdmin;
