import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Menu from "./components/Menu";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastros from "./pages/Cadastros";
import NotFound from "./pages/NotFound";

function RoutesApp() {
  return (
    <Router>
      {/* <Menu /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastros />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default RoutesApp;
