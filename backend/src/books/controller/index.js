const {Book} = require('../models/index');
const {User} = require('../../users/models/index');

module.exports.getAll = async (res) => {
    const books = await Book.findAll();

    res.status(200).json(books);
  };

module.exports.get = async (res, body, req) => {
    const params = req.params;
    const id = Number(params.id);

    const book = await Book.findOne({where:{id: id}});
    if(book === null){
        return res.status(400).json({
            status: 400,
            message: `Book ID ${id} not found!`,
          });
    }

    res.status(200).json(book);
  };

module.exports.create = async (res, body, req) => {
    const params = req.params;
    const { name, author, isbn, count } = body;

    const newBook = Book.build({
        name, author,
        isbn, count,
    });

    try {
        const savedBook = await newBook.save();

        return res.status(201).json(savedBook);
    } catch (error) {
        return res.status(400).json({
          status: 400,
          message: error,
        });
    }
};

module.exports.update = async (res, body, req) => {
    const params = req.params;
    const id = Number(params.id);

    const book = await Book.findOne({where:{id: id}});
    if(book === null){
        return res.status(400).json({
            status: 400,
            message: `Book ID ${id} not found!`,
          });
    }

    const { name, author, isbn, count } = body;

    if(name) book.name = name;
    if(author) book.author = author;
    if(isbn) book.isbn = isbn;
    if(count) book.count = count;

    try {
        const savedBook = await book.save();

        return res.status(201).json(savedBook);
    } catch (error) {
        return res.status(400).json({
          status: 400,
          message: error,
        });
    }
};

module.exports.delete = async (res, body, req) => {
    const params = req.params;
    const id = Number(params.id);

    const book = await Book.findOne({where:{id: id}});
    if(book === null){
        return res.status(400).json({
            status: 400,
            message: `Book ID ${id} not found!`,
          });
    }

    await book.destroy();

    return res.status(204).json({});
};
  
module.exports.claim = async (res, body, req) => {
    const params = req.params;
    const bookId = Number(params.id);

    const book = await Book.findOne({where:{id: bookId}});
    if(book === null){
        return res.status(400).json({
            status: 400,
            message: `Book ID ${id} not found!`,
          });
    }

    const userId = req.user.id;
    const user = await User.findOne({where: {id: userId}});
    if(user === null){
        return res.status(400).json({
            status: 400,
            message: `User ID ${userId} not found!`,
          });
    }

    if(await user.hasBook(book)){
        return res.status(400).json({
            status: 400,
            message: `User ID ${userId} already has book with ID ${bookId}!`,
          });
    }
    if(book.count <= 0){
        return res.status(400).json({
            status: 400,
            message: `Book ID ${id} has no available copies!`,
          });
    }

    --book.count;
    await user.addBook(book);
    await book.addUser(user);
    await user.save();
    await book.save();

    return res.status(204).json({});
};

module.exports.return = async (res, body, req) => {
    const params = req.params;
    const bookId = Number(params.id);

    const book = await Book.findOne({where:{id: bookId}});
    if(book === null){
        return res.status(400).json({
            status: 400,
            message: `Book ID ${id} not found!`,
          });
    }

    const userId = req.user.id;
    const user = await User.findOne({where: {id: userId}});
    if(user === null){
        return res.status(400).json({
            status: 400,
            message: `User ID ${userId} not found!`,
          });
    }

    if(await user.hasBook(book) === false){
        return res.status(400).json({
            status: 400,
            message: `User ID ${userId} does not have book with ID ${bookId}!`,
          });
    }

    ++book.count;
    await user.removeBook(book);
    await book.removeUser(user);
    await user.save();
    await book.save();

    return res.status(204).json({});
};