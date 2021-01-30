import logo from './logo.svg';
import './App.css';
import tw from 'twin.macro'
import {
  BrowserRouter,
  Route
} from 'react-router-dom'

import HomePage from './Pages/HomePage'
import AdminPage from './Pages/AdminPage'
import AdminProductsPage from './Pages/AdminProductsPage';
import ViewAllProducts from './Pages/ViewAllProducts'
import AddProductsPage from './Pages/AddProductPage'
import AdminCategoriesPage from './Pages/AdminCategoriesPage';
import AdminOrdersPage from './Pages/AdminOrdersPage';
import CategoriesPage from './Pages/CategoriesPage';


function App() {
  return (
    <BrowserRouter>
    <Route exact path='/' component={HomePage}/>
    <Route path='/categories' component={CategoriesPage}/>
    <Route exact path='/admin' component={AdminPage}/>
    <Route exact path='/admin/products' component={AdminProductsPage}/>
    <Route exact path='/admin/products/viewAll' component={ViewAllProducts}/>
    <Route exact path='/admin/products/addProduct' component={AddProductsPage}/>
    <Route exact path='/admin/orders' component={AdminOrdersPage}/>
    <Route exact path='/admin/categories' component={AdminCategoriesPage}/>
  </BrowserRouter>
  );
}

export default App;
