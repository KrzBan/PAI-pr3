import { useNavigate, useParams } from "react-router-dom";
import { api } from "../Api"
import Error from "./Error";
import { useState } from "react";
import { useEffect } from "react";

function BookEdit(){

    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleSubmit = () => {
        event.preventDefault();
        const { name, author, isbn, count } = document.forms[0];
        const data = { 
            name: name.value, 
            author: author.value, 
            isbn: isbn.value, 
            count: count.value };

        api.put(`books/${id}`, data)
            .then(response => {
                navigate(`../${response.data.id}`);
            }).catch(error =>{
              setError(error.response.data.message);
            })
    };

    useEffect(()=>{
      setLoading(true);
      api.get(`books/${id}`).then(res => {
          setBook(res.data);
          setLoading(false);
      })
  }, [id]);

    const clearError = () => {
      setError("");
    }

    return (
      <div>
        <h1>Edit Book</h1>
        {error?
        <Error msg={error} onClick={clearError} />
        :null
        } 

        {loading ? (
                <p className="text-center">Loading...</p>
            ) : (

          <div className="form">
            <form onSubmit={handleSubmit} method="POST">
              <div className="input-container">
                <label>Name </label>
                <input defaultValue={book.name} type="text" name="name" required />
              </div>
              <div className="input-container">
                <label>Author </label>
                <input defaultValue={book.author} type="text" name="author" required />
              </div>
              <div className="input-container">
                <label>ISBN </label>
                <input defaultValue={book.isbn} type="text" name="isbn" required />
              </div>
              <div className="input-container">
                <label>Count </label>
                <input defaultValue={book.count} type="number" name="count" required />
                <span className="font-bold">Out of {book?.count + book?.claimedCount}</span>
              </div>
              <div className="button-container mt-5">
                <input type="submit" />
              </div>
            </form>
          </div>

        )}
      </div>
    );
}

export default BookEdit