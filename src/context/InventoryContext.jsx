import { createContext, useContext, useEffect, useState } from "react";
import {
  deleteInventoryItem,
  getInventory,
} from "../services/inventoryApi";

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getInventory();
      setItems(data);
    } catch (err) {
      setError("Не вдалося завантажити інвентар.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    await deleteInventoryItem(id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const value = {
    items,
    loading,
    error,
    loadInventory,
    removeItem,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error("useInventory must be used inside InventoryProvider");
  }

  return context;
}