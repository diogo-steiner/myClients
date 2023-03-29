import { Route, Routes } from "react-router-dom";
import { ClientsPage } from "../pages/ClientsPage";
import { HomePage } from "../pages/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/clients" element={<ClientsPage />} />
      </Route>
    </Routes>
  );
};
