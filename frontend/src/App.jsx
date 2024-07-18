import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Component/Nav.jsx';
import Footer from './Component/Footer.jsx';
import Homepage from './Homepage.jsx';
import Index from './index.jsx';
import Register from './Component/Register.jsx';
import Login from './Component/Login.jsx';
import Dashboard from './Component/Dashboard.jsx';
import Admindashboard from './Component/Admindashboard.jsx';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminChild from './pages/Admin/AdminChild';
import AdminActivite from './pages/Admin/AdminActivite';
import AdminRelation from './pages/Admin/AdminRelation';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';




function App() {
  return (
    <Router>
      <div>
        <Nav /> {/* Composant Nav ajouté ici */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/adminusers" element={<AdminUsers />} />
          <Route path="/adminchild" element={<AdminChild />} />
          <Route path="/adminactivite" element={<AdminActivite />} />
          <Route path="/adminrelation" element={<AdminRelation />} />
          <Route path="/index" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />


        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
