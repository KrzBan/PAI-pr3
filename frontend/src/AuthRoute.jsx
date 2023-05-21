import { Navigate } from "react-router-dom";
import { getToken } from "./Api";

// eslint-disable-next-line react/prop-types
const AuthRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
};



export { AuthRoute };