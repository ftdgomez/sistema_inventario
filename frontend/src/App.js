import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import ProductHandler from './screens/ProductHandler';
import EditProduct from './screens/EditProduct';
import CreatePresupuesto from './screens/CreatePresupuesto';
import PresupuestosListScreen from './screens/PresupuestosListScreen';
import InvoiceListScreen from './screens/InvoiceListScreen';
import TiendasList from './screens/TiendasList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PdfGenerator from './screens/PdfGenerator';
import CreateInvoice from './screens/CreateInvoice';

function App() {
  return (
    <Router>
      <main className="bg-light">
        <Route path="/login" component={LoginScreen} exact />
        
          <Route path='/' component={HomeScreen} exact />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />

          <Route path='/product/:id' component={EditProduct} />
          <Route path='/create-product' component={ProductHandler} exact />
          
          <Route path='/presupuesto/create' component={CreatePresupuesto} exact />
          <Route path='/presupuesto/edit/:id' component={CreatePresupuesto} exact />
          <Route path='/presupuesto/:id' component={PdfGenerator} exact />
          <Route path='/presupuestos' component={PresupuestosListScreen} exact />
          <Route path='/presupuestos/search/:keyword' component={PresupuestosListScreen} exact />
          <Route path='/presupuestos/page/:pageNumber' component={PresupuestosListScreen} exact />
          <Route
            path='/presupuestos/search/:keyword/page/:pageNumber'
            component={PresupuestosListScreen}
            exact
          />

          <Route path='/invoice/create' component={CreateInvoice} exact />
          <Route path='/invoice/edit/:id' component={CreateInvoice} exact />
          <Route path='/invoice/:id' component={PdfGenerator} exact />
          <Route path='/invoices' component={InvoiceListScreen} exact />
          <Route path='/invoices/search/:keyword' component={InvoiceListScreen} exact />
          <Route path='/invoices/page/:pageNumber' component={InvoiceListScreen} exact />
          <Route
            path='/presupuestos/search/:keyword/page/:pageNumber'
            component={InvoiceListScreen}
            exact
          />


          <Route path="/tiendas" component={TiendasList} />

         {/*  <Route component={NotFoundScreen} /> */}
      </main>
      <ToastContainer />
    </Router>
  );
}

export default App;
