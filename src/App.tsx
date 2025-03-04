import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Auth } from './pages/Auth';
import { Login } from './pages/Login';
import { Symptoms } from './pages/Symptoms';
import { DetailedAssessment } from './pages/DetailedAssessment';
import { Results } from './pages/Results';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/terms" element={<Login />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/details" element={<DetailedAssessment />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
