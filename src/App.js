import "./reset.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProductsPage from "./Pages/ProductsPage";
import BasketPage from "./Pages/BasketPage";
import LoginPage from "./Pages/LoginPage";
import DescriptionPage from "./Pages/DescriptionPage";

const ProtectedRoute = ({ currentUser, children }) => {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const currentUser = useSelector((state => state.currentUser.name));

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute currentUser={currentUser}>
              <ProductsPage />
            </ProtectedRoute>
          }
          />
          <Route path="/basket" element={
            <ProtectedRoute currentUser={currentUser}>
              <BasketPage />
            </ProtectedRoute>
          }
          />
          <Route path="/description/:id" element={
            <ProtectedRoute currentUser={currentUser}>
              <DescriptionPage />
            </ProtectedRoute>
          }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reg" element={<LoginPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;