const BookController = require("../controllers/book.controller");
const UserController = require("../controllers/user.controller");
const { authorizationCustomer, authorizationAdmin, authorizationAdminAndCustomer } = require("../middlewares/authorization.middleware");

const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Get All
router.get("/books", BookController.getAllBooks);

// Create Book
router.post("/book", authorizationAdmin, BookController.createBook);

// Get Book by ID
router.get("/book/:id", authorizationAdminAndCustomer, BookController.getBookById);

// Update Book by ID
router.put("/book/:id", authorizationAdmin, BookController.updateBookById);

// Delete Book by ID
router.delete("/book/:id", authorizationAdmin, BookController.deleteBookById);

module.exports = router;
