
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  //Switch,
  Route,
  Routes
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './screens/Cart';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';

function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/createuser' element={<Signup/>} />
          <Route exact path='/cart' element={<Cart/>} />
          <Route exact path='/myOrder' element={<MyOrder/>} />

        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
