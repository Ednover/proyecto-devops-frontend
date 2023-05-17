import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import { Layout } from "./components";
import { useState } from "react";
import { AuthUser } from "./context";

function App() {

  const [authUser, setAuthUser] = useState(() => !(window.sessionStorage.getItem("Context")) ? {} : JSON.parse(window.sessionStorage.Context));

  return (
    <BrowserRouter>
      <AuthUser.Provider value={{ authUser, setAuthUser }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </AuthUser.Provider>
    </BrowserRouter>
  )
}

export default App
