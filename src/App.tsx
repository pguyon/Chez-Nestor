import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./public/Homepage"
import NavBar from "./components/NavBar"
import { AuthProvider } from './context/UserContext';
import Login from './public/Login';
import Dashboard from './admin/Dashboard';
import Appartment from './public/Appartment';
import AddAppartment from './admin/AddAppartment';
import EditAppartment from './admin/EditAppartment';

function App(): JSX.Element {
  return (
    <Router>
      <AuthProvider>        
          <NavBar />          
      <Routes>
        <Route path='/' element={<Homepage appartments={undefined} />}  />
        <Route path='/appartment/:id' element={<Appartment />}  />        
        <Route path='/login' element={<Login />}  />
        <Route path='/dashboard' element={<Dashboard />}  />
        <Route path='/admin/addappartment' element={<AddAppartment />}  />
        <Route path='/admin/editappartment/:id' element={<EditAppartment />}  />
        <Route path='/*' element={<Homepage appartments={undefined} />}  />
      </Routes>
        
      </AuthProvider>
    </Router>
  );
}


export default App
