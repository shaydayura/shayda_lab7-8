import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import InventoryForm from "../components/inventory/InventoryForm";
import {
  getInventoryItem,
  updateInventoryPhoto,
  updateInventoryText,
} from "../services/inventoryApi";
import { useInventory } from "../context/InventoryContext";

function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadInventory } = useInventory();

  const [item, setItem] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadItem() {
      const data = await getInventoryItem(id);
      setItem(data);
      setLoading(false);
    }

    loadItem();
  }, [id]);

  const handleUpdateText = async (data) => {
    await updateInventoryText(id, data);
    await loadInventory();
    navigate("/admin");
  };

  const handleUpdatePhoto = async (event) => {
    event.preventDefault();

    if (!photo) {
      setMessage("Спочатку оберіть нове фото.");
      return;
    }

    await updateInventoryPhoto(id, photo);
    await loadInventory();
    setMessage("Фото успішно оновлено.");
  };

  if (loading) {
    return (
      <main className="page">
        <p className="loading-state">Завантаження...</p>
      </main>
    );
  }

  return (
    <main className="page">
      <Link className="back-link" to="/admin">
        ← Назад до адмін-панелі
      </Link>

      <div className="form-card">
        <h1>Редагування інвентарю</h1>

        <InventoryForm
          initialValues={{
            inventory_name: item.inventory_name,
            description: item.description || "",
          }}
          submitText="Оновити текстові дані"
          showPhotoInput={false}
          onSubmit={handleUpdateText}
        />

        <form className="photo-form" onSubmit={handleUpdatePhoto}>
          <h2>Оновлення фотографії</h2>

          {message && <p className="info-state">{message}</p>}

          <input
            type="file"
            accept="image/*"
            onChange={(event) => setPhoto(event.target.files[0])}
          />

          <button className="secondary-action" type="submit">
            Оновити фото
          </button>
        </form>
      </div>
    </main>
  );
}

export default AdminInventoryEdit;