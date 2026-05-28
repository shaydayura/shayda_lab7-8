import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InventoryDetails from "../components/inventory/InventoryDetails";
import { getInventoryItem } from "../services/inventoryApi";

function AdminInventoryDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        setLoading(true);
        const data = await getInventoryItem(id);
        setItem(data);
      } catch {
        setError("Не вдалося завантажити деталі інвентарю.");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  return (
    <main className="page">
      <Link className="back-link" to="/admin">
        ← Назад до адмін-панелі
      </Link>

      {loading && <p className="loading-state">Завантаження...</p>}
      {error && <p className="error-state">{error}</p>}
      {item && <InventoryDetails item={item} />}
    </main>
  );
}

export default AdminInventoryDetails;