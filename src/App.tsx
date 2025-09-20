import './App.css';
import About from './components/About/About';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </>
  );
}

export default App;
