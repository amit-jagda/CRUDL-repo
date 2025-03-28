const { Op } = require("sequelize");
const Book = require("../model/books.model");
const checkAdmin = require("../helperFunctions/checkAdmin");
const { validateInputData } = require("../middleware/joiValidation");
const giveResponse = require("../globalHandler/globalResponseFunction");

// ("/books")
async function getBooks(req, res, next) {
  const bookStatus = checkAdmin(req);
  console.log(`booksstatus`, bookStatus);
  const books = await Book.findAll({
    where: {
      status: {
        [Op.or]: bookStatus,
      },
    },
  });
  // return res.status(200).json(books);
  giveResponse(200, res, {
    books: books,
    by: req.user,
  });
}

// ('/books/{id}')
async function getBook(req, res, next) {
  const bookId = req.params.id;
  try {
    console.log(bookId);
    const oneBook = await Book.findAll({
      where: {
        id: bookId,
      },
    });
    if (oneBook.length) {
      giveResponse(200, res, oneBook);
    }
    giveResponse(400, res, {
      message: "Could not find your book in database",
    });
  } catch (err) {
    giveResponse(500, res, {
      message: `There was error fetching book with ${bookId}`,
      Error: err,
    });
  }
}

// ('/books/{id}')
async function deleteBook(req, res, next) {
  const bookId = req.params.id;
  const book = await Book.findAll({
    where: {
      id: bookId,
    },
  });
  const deletedRows = await Book.destroy({
    where: {
      id: bookId,
    },
  });
  if (deletedRows > 0) {
    giveResponse(200, res, {
      message: "Book was deleted Successfully",
      Book: book,
    });
  } else {
    giveResponse(404, res, { message: "Book was not found" });
  }
}

// ("/books")
async function addBook(req, res, next) {
  let checkbook = req.body;
  let response = validateInputData(checkbook);
  const { username, password, ...newBook } = req.body;

  if (response.error) {
    console.log(response.error.details);
    giveResponse(400, res, response.error.details);
  } else {
    // checking if book exists
    const askedBook = await Book.findAll({
      where: {
        name: req.body.name,
      },
    });
    // console.log("askedBook: ", askedBook);
    if (askedBook.length > 0) {
      giveResponse(409, res, {
        message: `Book with ${req.body.name} name already exists`,
      });
    } else {
      // adding new book
      const book = await Book.create(newBook);
      giveResponse(200, res, {
        message: "Book Added successfully",
        book: book,
      });
    }
  }
}

// ('/books/{id}')
async function editBook(req, res, next) {
  const bookId = req.params.id;
  // validate - Input
  console.log(bookId);
  const findbook = await Book.findAll({
    where: {
      id: bookId,
    },
  });
  if (findbook.length > 0) {
    const response = validateInputData(req.body);

    if (response.error) {
      console.log(response.error.details);
      giveResponse(400, res, response.error.details);
    } else {
      // creating newbook
      const { name, author, publishyear, status } = req.body;
      const newBook = {
        name,
        author,
        publishyear,
        status,
      };

      const response = await Book.update(newBook, {
        where: {
          id: bookId,
        },
      });
      giveResponse(200, res, {
        message: `Book with id:${bookId} updated successFully`,
      });
    }
  } else {
    giveResponse(400, res, {
      message: `Book with id:${bookId} Is not in the database`,
    });
  }
}

// ("/books/{id}")
async function editBookData(req, res, next) {
  const bookId = req.params.id;
  // validate - Input
  const response = validateInputData(req.body, true);

  if (response.error) {
    console.log(response.error.details);
    giveResponse(400, res, response.error.details);
  } else {
    // creating newbook
    const { role, ...updatedBook } = req.body;

    // findByPk => Primary Key
    const bookExists = await Book.findByPk(bookId);

    if (!bookExists) {
      giveResponse(404, res, { error: "Book not found" });
    }

    const [updatedRows] = await Book.update(updatedBook, {
      where: {
        id: bookId,
      },
    });
    if (updatedRows > 0) {
      const updatedBook = await Book.findByPk(bookId);
      giveResponse(200, res, {
        message: "Book updated successFully",
      });
    } else {
      giveResponse(500, res, { error: "Failed to update book" });
    }
  }
}

module.exports = {
  getBooks,
  getBook,
  deleteBook,
  addBook,
  editBook,
  editBookData,
};
