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

 
function AppRouter() {
   return (
       <BrowserRouter history={history}>
           <Routes>
                <Route path="/"             Component={App} />
                <Route path="/login"        Component={Login} />
                <Route path="/register"     Component={Register} />
                <Route path="books">
                    <Route index element={<Books />} />
                    <Route path=":id" element={<Book />} />
                    <Route path="create"   Component={BookCreate} />
                </Route>
           </Routes>
       </BrowserRouter>
   );
}
 
export default AppRouter