import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import ProductHandler from './screens/ProductHandler';
import EditProduct from './screens/EditProduct';
import HandlePresupuesto from './screens/HandlePresupuesto';
import PresupuestosListScreen from './screens/PresupuestosListScreen';
import TiendasList from './screens/TiendasList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PdfGenerator from './screens/PdfGenerator';
import Dashboard from './screens/Dashboard';
import UploadFiles from './screens/UploadFiles';
import Logout from './screens/Logout';


function App() {
  return (
    <Router>
      <main className="bg-light">
        <Route path="/login" component={LoginScreen} exact />
        <Route path="/" component={Dashboard} exact />
        <Route path="/dashboard" component={Dashboard} exact />

          <Route path='/productos' component={HomeScreen} exact />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />

          <Route path='/product/:id' component={EditProduct} />
          <Route path='/create-product' component={ProductHandler} exact />
          
          <Route path='/create/:type' component={HandlePresupuesto} exact />
          <Route path='/edit/:type/:id/' component={HandlePresupuesto} exact />

          <Route path='/list/:type' component={PresupuestosListScreen} exact />
          <Route path='/list/:type/search/:keyword' component={PresupuestosListScreen} exact />
          <Route path='/list/:type/page/:pageNumber' component={PresupuestosListScreen} exact />
          <Route
            path='/list/:type/search/:keyword/page/:pageNumber'
            component={PresupuestosListScreen}
            exact
          />

          <Route path='/pdf/:type/:id' component={PdfGenerator} exact />
          <Route path='/files' component={UploadFiles} exact />
          <Route path="/tiendas" component={TiendasList} />
          <Route path="/logout" component={Logout} />
         {/*  <Route component={NotFoundScreen} /> */}
      </main>
      <ToastContainer />
    </Router>
  );
}

export default App;
