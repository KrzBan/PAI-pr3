import {  Routes, Route, BrowserRouter } from "react-router-dom";
 
//history
import { history } from './utils/History';
 
//pages
import App from './App.jsx'
import Login from './components/Login'
import Register from './components/Register'
import Books from './components/Books'
import Book from './components/Book'
import BookCreate from './components/BookCreate'
import {AuthRoute} from "./Auth";
import Navbar from "./components/Navbar";

 
function AppRouter() {
   return (
       <BrowserRouter history={history}>
            <Navbar />
            <Routes>
                <Route path="/"             Component={App} />
                <Route path="/login"        Component={Login} />
                <Route path="/register"     Component={Register} />
                <Route path="books">
                    <Route index element={<Books />} />
                    <Route path=":id" element={<Book />} />
                    <Route path="create"   element={
                        <AuthRoute>
                            <BookCreate />
                        </AuthRoute>
                    } />
                </Route>
            </Routes>
       </BrowserRouter>
   );
}
 
export default AppRouter