import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import { Layout } from "./components";
import { Dashboard } from "./pages/dashboard";
import { Budgets } from "./pages/budgets";
import { Cards } from "./pages/cards";
import { Transactions } from "./pages/transactions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
