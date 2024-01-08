import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Setavatar from './pages/Setavatar.jsx';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/setavatar' element={<Setavatar/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Chat/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
