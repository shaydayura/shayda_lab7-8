import { useState } from "react";
import { Link } from "react-router-dom";
import InventoryTable from "../components/inventory/InventoryTable";
import ConfirmModal from "../components/inventory/ConfirmModal";
import { useInventory } from "../context/InventoryContext";

function AdminInventory() {
  const { items, loading, error, removeItem } = useInventory();
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDelete = async () => {
    if (!itemToDelete) {
      return;
    }

    await removeItem(itemToDelete.id);
    setItemToDelete(null);
  };

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <p className="subtitle">Адмін-панель</p>
          <h1>Управління інвентарем складу</h1>
        </div>

        <Link className="primary-button" to="/admin/create">
          Додати інвентар
        </Link>
      </div>

      {loading && <p className="loading-state">Завантаження інвентарю...</p>}
      {error && <p className="error-state">{error}</p>}

      {!loading && !error && (
        <InventoryTable items={items} onDelete={setItemToDelete} />
      )}

      {itemToDelete && (
        <ConfirmModal
          title="Підтвердження видалення"
          message={`Ви справді хочете видалити "${itemToDelete.inventory_name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setItemToDelete(null)}
        />
      )}
    </main>
  );
}

export default AdminInventory;