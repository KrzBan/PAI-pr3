const {Book} = require('../models/index');

module.exports.getAll = async (res) => {
    const books = await Book.findAll();

    res.status(200).json(books);
  };

module.exports.get = async (res, body, params) => {

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

module.exports.create = async (res, body, params) => {

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

module.exports.update = async (res, body, params) => {

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

module.exports.delete = async (res, body, params) => {

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
  
module.exports.claim = async (res, body, params) => {

    const id = Number(params.id);

    const book = await Book.findOne({where:{id: id}});
    if(book === null){
        return res.status(400).json({
            status: 400,
            message: `Book ID ${id} not found!`,
          });
    }

    

    return res.status(204).json({});
};

module.exports.return = async (res, body, params) => {

    const id = Number(params.id);

    const book = await Book.findOne({where:{id: id}});
    if(book === null){
        return res.status(400).json({
            status: 400,
            message: `Book ID ${id} not found!`,
          });
    }



    return res.status(204).json({});
};