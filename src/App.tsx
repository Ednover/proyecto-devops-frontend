import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages";
import { Layout, Logout, RequireAuthUser } from "./components";
import { useState } from "react";
import { AuthUser } from "./context";
import { Dashboard } from "./pages/dashboard";
import { Budgets } from "./pages/budgets";
import { Cards } from "./pages/cards";
import { Transactions } from "./pages/transactions";
import { Accounts } from "./pages/accounts";

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
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/transactions" element={<Transactions />} />
            </Route>
          </Route>
        </Routes>
      </AuthUser.Provider>
    </BrowserRouter>
  );
}

export default App;
