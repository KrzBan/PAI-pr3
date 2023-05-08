import {  Routes, Route, BrowserRouter } from "react-router-dom";
 
//history
import { history } from './utils/History';
 
//pages
import App from './App.jsx'
import Books from './components/Books'

//import HomePage from "./pages/HomePage"
//import LoginPage from "./pages/Login"
 
function AppRouter() {
   return (
       <BrowserRouter history={history}>
           <Routes>
                <Route path="/" Component={App} />
                <Route path="/books" Component={Books} />
           </Routes>
       </BrowserRouter>
   );
}
 
export default AppRouter