const { Book } = require("../models");

class BookController {
  // Get Books
  static async getAllBooks(req, res) {
    try {
      const data = await Book.findAll();

      //res.send() -> HTML

      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }

  // Create Book
  static async createBook(req, res) {
    try {
      const { title, author, stock, description } = req.body;
      const data = await Book.create({
        title,
        author,
        stock,
        description,
      });
      console.log(req.body);
      res.status(201).json({
        status: "success",
        message: "Book created",
        data,
      });
    } catch (error) {
      res.status(400).json({
        status: "success",
        message: "Error creating book",
      });
    }
  }

  // Get Book by ID
  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      const data = await Book.findOne({
        where: {
          id,
        },
      });

      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }

  // Update Book by ID
  static async updateBookById(req, res) {
    try {
      const { id } = req.params;
      const { title, author, stock, description } = req.body;

      const data = await Book.update(
        { title, author, stock, description },
        {
          where: {
            id,
          },
          returning: true,
        }
      );

      res.status(200).json({
        status: "success",
        message: "Book updated",
        data,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }

  // Delete Book by ID
  static async deleteBookById(req, res) {
    try {
      const { id } = req.params;

      const deletedRowCount = await Book.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        status: "success",
        message: "Book deleted",
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}

module.exports = BookController;
