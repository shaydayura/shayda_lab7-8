import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { InventoryProvider } from "./context/InventoryContext";
import AdminInventory from "./pages/AdminInventory";
import AdminInventoryCreate from "./pages/AdminInventoryCreate";
import AdminInventoryEdit from "./pages/AdminInventoryEdit";
import AdminInventoryDetails from "./pages/AdminInventoryDetails";
import Gallery from "./pages/Gallery";
import Favorites from "./pages/Favorites";
import "./styles/App.css";

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <div className="app">
          <header className="header">
            <Link className="logo" to="/">
              Warehouse Inventory
            </Link>

            <nav className="nav">
              <Link to="/">Галерея</Link>
              <Link to="/favorites">Улюблені</Link>
        
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />

            <Route path="/admin" element={<AdminInventory />} />
            <Route path="/admin/create" element={<AdminInventoryCreate />} />
            <Route path="/admin/:id" element={<AdminInventoryDetails />} />
            <Route path="/admin/:id/edit" element={<AdminInventoryEdit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;