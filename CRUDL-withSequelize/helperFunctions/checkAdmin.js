function checkAdmin(req) {
  let bookStatus = [];
  if (!req.body.role) {
    bookStatus = ["available"];
  } else if (req.body.role == "admin") {
    bookStatus = ["available", "not available"];
  }
  return bookStatus;
}

module.exports = checkAdmin;
