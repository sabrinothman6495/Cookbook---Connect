import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile'; // Now under pages

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<UserProfile />} /> {/* Adjusted path */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;