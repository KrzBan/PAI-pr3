import {  Routes, Route, BrowserRouter } from "react-router-dom";
 
//history
import { history } from './utils/history';
 
//pages
import App from './App.jsx'

//import HomePage from "./pages/HomePage"
//import LoginPage from "./pages/Login"
 
function AppRouter() {
   return (
       <BrowserRouter history={history}>
           <Routes>
                <Route path="/" Component={App} />
           </Routes>
       </BrowserRouter>
   );
}
 
export default AppRouter