import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import About from "./pages/About";
import Apply from "./pages/Apply";
import Tesekkur from "./pages/tesekkur";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programlar" element={<Programs />} />
          <Route path="/hakkimizda" element={<About />} />
          <Route path="/basvuru" element={<Apply />} />
          <Route path="/tesekkur" element={<Tesekkur />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
