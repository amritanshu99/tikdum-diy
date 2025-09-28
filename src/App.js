import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Buy from "./pages/Buy";

export default function App() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-white to-slate-50 text-black">
      <BrowserRouter>
        <Header />
        {/* No footer spacer here. Footer is fixed and doesn't take layout height. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
        </Routes>

        {/* Fixed footer overlays bottom without reserving space */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}
