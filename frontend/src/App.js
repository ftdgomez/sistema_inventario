import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NotFoundScreen from './screens/NotFoundScreen';
import ProductHandler from './screens/ProductHandler';
import EditProduct from './screens/EditProduct';
import CreatePresupuesto from './screens/CreatePresupuesto';
import CreateNotaDeEntrega from './screens/CreateNotaDeEntrega';

function App() {
  return (
    <Router>
      <main className="bg-light">
        <Route path="/login" component={LoginScreen} exact />
        <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={EditProduct} />
          <Route path='/create-product' component={ProductHandler} exact />
          <Route path='/presupuesto/create' component={CreatePresupuesto} exact />
          <Route path='/nota-de-entrega/create' component={CreateNotaDeEntrega} exact />
          <Route component={NotFoundScreen} />
      </main>
    </Router>
  );
}

export default App;
