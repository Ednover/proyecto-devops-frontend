import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import { Layout, Logout, RequireAuthUser } from "./components";
import { useState } from "react";
import { AuthUser } from "./context";

function App() {

  const [authUser, setAuthUser] = useState(() => !(window.sessionStorage.getItem("Context")) ? {} : JSON.parse(window.sessionStorage.Context));

  return (
    <BrowserRouter>
      <AuthUser.Provider value={{ authUser, setAuthUser }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<RequireAuthUser />}>
            <Route path="/" element={<Layout />} />
            {/* aqui colocar todas las rutas protegidas */}
          </Route>
        </Routes>
      </AuthUser.Provider>
    </BrowserRouter>
  )
}

export default App
