import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import ProductHandler from './screens/ProductHandler';
import EditProduct from './screens/EditProduct';
import CreatePresupuesto from './screens/CreatePresupuesto';
import PresupuestosListScreen from './screens/PresupuestosListScreen';
import CrearNotaDeEntrega from './screens/CrearNotaDeEntrega'
import NotasDeEntregaListScreen from './screens/NotaDeEntregaListScreen';
import TiendasList from './screens/TiendasList';
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
          <Route path='/nota-de-entrega/create' component={CrearNotaDeEntrega} exact />

          <Route path='/presupuestos' component={PresupuestosListScreen} exact />
          <Route path='/presupuestos/search/:keyword' component={PresupuestosListScreen} exact />
          <Route path='/presupuestos/page/:pageNumber' component={PresupuestosListScreen} exact />
          <Route
            path='/presupuestos/search/:keyword/page/:pageNumber'
            component={PresupuestosListScreen}
            exact
          />

          <Route path='/nota-de-entrega' component={NotasDeEntregaListScreen} exact />
          <Route path='/nota-de-entrega/search/:keyword' component={NotasDeEntregaListScreen} exact />
          <Route path='/nota-de-entrega/page/:pageNumber' component={NotasDeEntregaListScreen} exact />
          <Route
            path='/nota-de-entrega/search/:keyword/page/:pageNumber'
            component={PresupuestosListScreen}
            exact
          />

          <Route path="/tiendas" component={TiendasList} />

         {/*  <Route component={NotFoundScreen} /> */}
      </main>
    </Router>
  );
}

export default App;
