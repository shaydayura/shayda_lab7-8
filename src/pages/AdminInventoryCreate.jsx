import { Link, useNavigate } from "react-router-dom";
import InventoryForm from "../components/inventory/InventoryForm";
import { createInventoryItem } from "../services/inventoryApi";
import { useInventory } from "../context/InventoryContext";

function AdminInventoryCreate() {
  const navigate = useNavigate();
  const { loadInventory } = useInventory();

  const handleCreate = async (data) => {
    await createInventoryItem(data);
    await loadInventory();
    navigate("/admin");
  };

  return (
    <main className="page">
      <Link className="back-link" to="/admin">
        ← Назад до адмін-панелі
      </Link>

      <div className="form-card">
        <h1>Додати новий інвентар</h1>

        <InventoryForm
          submitText="Створити"
          showPhotoInput={true}
          onSubmit={handleCreate}
        />
      </div>
    </main>
  );
}

export default AdminInventoryCreate;