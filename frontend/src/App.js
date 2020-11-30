import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NotFoundScreen from './screens/NotFoundScreen';

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
          <Router component={NotFoundScreen} />
      </main>
    </Router>
  );
}

export default App;
