const booksDatabase = require("../model/books.model");
const validateInputData = require("../middleware/joiValidation");
const giveResponse = require("../globalHandler/globalResponseFunction");

// get("/books/{id}")
function getBook(req, res) {
  const productId = req.params["id"];
  // conditional query
  let query = "";
  if (req.body.role == "admin") {
    query = `SELECT * FROM books WHERE id=${productId}`;
  } else {
    query = `SELECT * FROM books WHERE  id=${productId} && status = 'available'`;
  }

  booksDatabase.query(query, (error, results) => {
    if (error) {
      console.log(error);
      giveResponse(400, res, {
        error: "Can't get your book details",
      });
    } else if (!results.length) {
      giveResponse(400, res, {
        message: "Your Book is not availabe at this time",
      });
    } else {
      console.log(results.length);
      giveResponse(200, res, results);
    }
  });
}

//// get("/books")
function getBooks(req, res) {
  let query = "";
  if (req.body.role == "admin") {
    query = `SELECT * FROM books`;
  } else {
    query = "SELECT * FROM books WHERE status = 'available'";
  }
  booksDatabase.query(query, (error, results) => {
    if (error) {
      console.log(error);
      giveResponse(400, res, {
        error: "Can't get your book details",
      });
      //   console.log("code executed");
    } else {
      return giveResponse(200, res, results);
    }
  });
}

// post("/books")
function addBook(req, res) {
  const { name, author, publishyear, status } = req.body;
  const bookStatus = status || "available";
  booksDatabase.query(
    "SELECT * FROM books WHERE name = ?", // Changed to search by name
    [name],
    (error, results) => {
      if (error) {
        return giveResponse(500, res, { error: "database error" });
      }
      if (results.length > 0) {
        return giveResponse(409, res, {
          error: `Book with ${name} name already exists!`,
        }); // conflict : 409
      }

      // validate request
      const response = validateInputData(req.body);

      if (response.error) {
        console.log(response.error.details);
        giveResponse(400, res, response.error.details);
      } else {
        // if no error
        booksDatabase.query(
          `INSERT INTO books(name, author, publishyear,status) VALUES (?,?,?,?)`,
          [name, author, publishyear, bookStatus],
          (error, results) => {
            if (error) {
              giveResponse(400, res, {
                error: "Can't Add Book",
              });
            } else if (results.affectedRows == 1) {
              giveResponse(200, res, {
                message: `${name} was successfully added`,
              });
            }
          }
        ); // second query ends // POST
      }
    }
  ); // first query ends // GET
}

// put("/books/{id}")
function editBook(req, res) {
  const bookId = req.params["id"];
  const { name, author, publishyear, status } = req.body;
  const bookStatus = status || "available";

  booksDatabase.query(
    "SELECT * FROM books WHERE id = ?", // search by id
    [bookId],
    (error, results) => {
      if (error) {
        return giveResponse(500, res, { error: "database error" });
      }
      if (results.length === 0) {
        return giveResponse(409, res, {
          error: `Book with id:${bookId} doesn't exists!`,
        }); // conflict : 409
      }

      // validate request
      const response = validateInputData(req.body);
      if (response.error) {
        console.log(response.error.details);
        giveResponse(400, res, response.error.details);
      } else {
        // if no error
        booksDatabase.query(
          `UPDATE books SET name=?, author=?, publishyear=?, status=? WHERE id = ?`,
          [name, author, publishyear, bookStatus, bookId],
          (error, results) => {
            if (error) {
              giveResponse(400, res, {
                message: `Could not upadte this book with bookID:${bookId}`,
              });
            }
            giveResponse(200, res, {
              message: `${name} was succesfully edited`,
              results,
            });
          }
        );
      }
    }
  );
}

// patch("/books/{id}")
function editBookData(req, res) {
  const bookId = req.params["id"];
  const { name, author, publishyear, status } = req.body;

  booksDatabase.query(
    "SELECT * FROM books WHERE name = ?", // Changed to search by name
    [name],
    (error, results) => {
      if (error) {
        return giveResponse(500, res, { error: "booksDatabase error" });
      }
      if (results.length === 0) {
        return giveResponse(409, res, {
          error: `Book with id:${bookId} already exists!`,
        }); // conflict : 409
      }

      const newBookData = req.body;
      response = validateInputData(newBookData, true); // true : only check for Joischema2

      if (response.error) {
        console.log(response.error.details);
        giveResponse(400, res, response.error.details);
      } else {
        let updateQuery = "UPDATE books SET ";
        const updateValues = [];
        const updateFields = [];

        if (name) {
          updateFields.push("name = ?");
          updateValues.push(name);
        }
        if (author) {
          updateFields.push("author = ?");
          updateValues.push(author);
        }
        if (publishyear) {
          updateFields.push("publishyear = ?");
          updateValues.push(publishyear);
        }
        if (status) {
          updateFields.push("status = ?");
          if (status == "available" || "not available") {
            updateValues.push(status);
          } else {
            giveResponse(400, res, {
              message: "Invalid status",
            });
          }
        }

        if (updateFields.length === 0) {
          return giveResponse(400, res, {
            error: "No fields to update provided",
          });
        }

        updateQuery += updateFields.join(", ") + " WHERE id = ?";
        updateValues.push(bookId);

        // name=?, author=?, publishyear=?, status=? WHERE id ?, [name,.., id], ()=>{}
        booksDatabase.query(updateQuery, updateValues, (error, results) => {
          if (error) {
            console.error("booksDatabase error:", error);
            return giveResponse(500, res, { error: "booksDatabase error" });
          }

          if (results.affectedRows === 0) {
            return giveResponse(404, res, { error: "Book not found" });
          }

          giveResponse(200, res, { message: "Book updated successfully" });
        });
      }
    }
  );
}

// delete("/books/{id}")
function deleteBook(req, res) {
  const productId = req.params["id"];

  // remove the book
  booksDatabase.query(
    `DELETE FROM books WHERE id=?`,
    [productId],
    (error, results) => {
      if (error) {
        return giveResponse(500, res, { error: "booksDatabase error" });
      }
      if (results.affectedRows === 0) {
        return giveResponse(404, res, { error: "Book not found" });
      }
      giveResponse(200, res, {
        message: "Book deleted successfully",
        results,
      });
    }
  );
}

module.exports = {
  getBook,
  getBooks,
  addBook,
  deleteBook,
  editBook,
  editBookData,
};
