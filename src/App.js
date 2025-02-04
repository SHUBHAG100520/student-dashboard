import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import LoginPage from './components/LoginPage';
import StudentsPage from './components/StudentsPage';
import Sidebar from './components/Sidebar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {user ? (
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <Routes>
            <Route path="/students" element={<StudentsPage />} />
            <Route path="*" element={<Navigate to="/students" />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
