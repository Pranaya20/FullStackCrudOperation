import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter,Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import AddEdit from './pages/AddEdit';
import View from './pages/View';

function App() {
  return (
    <BrowserRouter> 
        <div className="App">
      <ToastContainer position='top-center'/>
     <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route path='/home' element={< Home />}></Route>
            <Route path='/addcontact' element={< AddEdit />}></Route>
            <Route path='/updatecontact/:id' element={< AddEdit />}></Route>
            <Route path='/viewcontact/:id' element={<View />}></Route>
      </Routes>
    </div>
    
    </BrowserRouter>
   
  );
}

export default App;
