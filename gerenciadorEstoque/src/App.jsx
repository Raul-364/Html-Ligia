import { BrowserRouter, Routes, Route } from "react-router-dom";
import CadastroUsuario from "./pages/CadastroUsuario"
import Login from "./pages/Login";
import Inventario from "./pages/Inventario";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<CadastroUsuario/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/inventario" element={<Inventario/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
