import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomScene from './components/RoomScene';
import LaptopPage from './pages/LaptopPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RoomScene />} />
                <Route path="/laptop" element={<LaptopPage />} />
            </Routes>
        </Router>
    );
}

export default App;
