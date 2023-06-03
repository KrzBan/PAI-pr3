import { useNavigate } from "react-router-dom";
import { api } from "../Api"
import Error from "./Error";
import { useState } from "react";

function BookCreate(){

    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = () => {
        event.preventDefault();
        const { name, author, isbn, count } = document.forms[0];
        const data = { 
            name: name.value, 
            author: author.value, 
            isbn: isbn.value, 
            count: count.value };

        api.post('books', data)
            .then(response => {
                navigate(`../${response.data.id}`);
            }).catch(error =>{
              setError(error.response.data.message);
            })
    };

    const clearError = () => {
      setError("");
    }

    return (
      <div>
        <h1>Add Book</h1>
        {error?
        <Error msg={error} onClick={clearError} />
        :null
        } 
        <div className="form">
          <form onSubmit={handleSubmit} method="POST">
            <div className="input-container">
              <label>Name </label>
              <input type="text" name="name" required />
            </div>
            <div className="input-container">
              <label>Author </label>
              <input type="text" name="author" required />
            </div>
            <div className="input-container">
              <label>ISBN </label>
              <input type="text" name="isbn" required />
            </div>
            <div className="input-container">
              <label>Count </label>
              <input type="number" name="count" required />
            </div>
            <div className="button-container mt-5">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    );
}

export default BookCreate