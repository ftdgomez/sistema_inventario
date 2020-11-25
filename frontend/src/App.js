import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <main className="bg-light">
        <Route
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
              exact
            />
        <Route path="/" component={HomeScreen} exact />
      </main>
    </Router>
  );
}

export default App;
