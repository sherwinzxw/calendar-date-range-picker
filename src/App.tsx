import Layout from "Layout";
import { Route, Routes } from "react-router-dom";
import { NoMatch } from "scenes/NoMatch";
import "./App.css";
import Home from "pages/Home";

function App() {
  return (
      <Routes>
        <Route index element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
  );
}

export default App;
