import Map from "./Map";
import Menu from "./Menu";
import Places from "./Places";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    
    <BrowserRouter>
    <Menu />
    <Routes>
        <Route path="/" element={<Map
          center={{ lat: 40, lng: -3}}
          zoom={6}
        />} />
        <Route path="/places" element={<Places/>} />
    </Routes>
</BrowserRouter>
  );
};

export default App;
