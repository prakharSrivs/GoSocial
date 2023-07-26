import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Home from './Components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        {/* <Route path="*" element={<Navigate to="/not-found" replace />} /> */}
        <Route path='/projects' element={<></>} />

        {/* <Route path='/not-found' element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
