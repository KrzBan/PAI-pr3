import {api, setToken} from "../Api";

function Login(){

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
            }).catch(error =>{
                console.log("Error!");
                console.log(error);
            })
      };

    return (
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
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
        </div>
      );
}

export default Login;