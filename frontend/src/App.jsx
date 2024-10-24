import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';
import AuthProvider from './context/AuthContext';
import RecipeProvider from './context/RecipeContext';
import ThemeProvider from './context/ThemeContext'; // Import ThemeProvider

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <ThemeProvider> {/* Wrap the app with ThemeProvider */}
          <Router>
            <div>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/recipes/:id" element={<RecipeDetails />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/profile" element={<UserProfile />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ThemeProvider>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;