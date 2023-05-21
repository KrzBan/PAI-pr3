import {api, setToken} from "../Api";
import { Link, useNavigate } from "react-router-dom";

function Login(){

  const navigate = useNavigate();

  const handleSubmit = (event) => {
  // Prevent page reload
    event.preventDefault();

    const { username, password } = document.forms[0];
    const data = { 
      username: username.value, 
      password: password.value,};

    api.post('users/auth/login', data)
      .then(response => {
        setToken(response.data.token);
        navigate(-2);
      }).catch(error =>{
        console.log("Error!");
        console.log(error);
      })
  };

  return (
    <div>
      <h1>Login</h1>
      <div className="form">
        <form onSubmit={handleSubmit} method="POST">
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="username" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="password" required />
          </div>
          <div className="button-container mt-5">
            <input type="submit" />
          </div>
        </form>
        <Link to="/register">Sign-Up</Link>
      </div>
    </div>
    );
}

export default Login;