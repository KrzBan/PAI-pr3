import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {api} from "../Api";

function Books(){

    let [books, setBooks] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get("books").then((res) => {
            setBooks(res.data);
            setLoading(false);
        })
    }, []);

    return (
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-5">Books</h1>
          <Link to="create">Add Book</Link>
          {loading ? (
            <div className="">loading...</div>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {books.map((book) => (
                <Link to={book.id.toString()} key={book.id}>
                  <div className="bg-gray-200 rounded-lg shadow-lg p-6">
                    <h2 className="text-lg font-bold mb-4">{book.name}</h2>
                    <p className="text-sm mb-2">
                      <span className="font-bold">Author:</span> {book.author}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-bold">ISBN:</span> {book.isbn}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
}

export default Books;