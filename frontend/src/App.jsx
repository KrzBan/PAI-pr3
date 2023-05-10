import { Link } from "react-router-dom";

import './App.css'

function App() {

  return (
    <>
      <div>
        
      </div>
      <h1>Online Library</h1>

      <div className="card flex flex-col items-center text-center">
        <Link to="books">Books</Link>
        <Link to="login">Login</Link>
        <Link to="register">Sign-up</Link>
      </div>
    </>
  )
}

export default App
