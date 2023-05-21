import { Link, useNavigate } from "react-router-dom";
import {getToken, setToken} from "../Api";

function Navbar() {
  const navigate = useNavigate();

  let token = getToken();

  const logout = (event) => {
    event.preventDefault();
    setToken("");
    navigate("/", { replace: true });
  };

  return (
    <div className="max-w-screen-xl">
      <nav className="flex flex-no-wrap w-full items-center justify-between bg-neutral-100">
        <div className="flex w-full flex-wrap items-center justify-between ">
          <ul className="flex items-center p-4">
            <li className="mx-5">
              <Link to="/" className="hover:text-blue-800">
                Home
              </Link>
            </li>
            <li className="mx-5">
              <Link to="/books" className="hover:text-blue-800">
                Books
              </Link>
            </li>
          </ul>

        {!token ? (
            <Link to="/login" className="hover:text-blue-800">
                <button className="items-center p-4">Login</button>
            </Link>
        ) : (
            <Link
                to="/"
                className="hover:text-blue-800"
                onClick={logout}>
                <button className="items-center p-4">Logout</button>
            </Link>
        )}
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
