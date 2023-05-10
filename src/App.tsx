import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import { Layout } from "./components";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
