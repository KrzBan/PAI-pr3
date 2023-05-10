import { useNavigate } from "react-router-dom";
import { api } from "../Api"

function BookCreate(){

    const navigate = useNavigate();

    const handleSubmit = () => {
        event.preventDefault();
        const { name, author, isbn, count } = document.forms[0];
        const data = { 
            name: name.value, 
            author: author.value, 
            isbn: isbn.value, 
            count: count.value };

        console.log(data);
        api.post('books', data)
            .then(response => {
                navigate(`../${response.data.id}`);
            }).catch(error =>{
                console.log("Error!");
                console.log(error);
            })
    };

    return (
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
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    );
}

export default BookCreate