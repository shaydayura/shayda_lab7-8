import { useState } from "react";
import InventoryGallery from "../components/gallery/InventoryGallery";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import { useFavorites } from "../hooks/useFavorites";
import { useInventory } from "../context/InventoryContext";

function Favorites() {
  const { items, loading, error } = useInventory();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);

  const favoriteItems = items.filter((item) =>
    favorites.includes(Number(item.id))
  );

  return (
    <main className="page">
      <section className="gallery-hero">
        <p className="subtitle">Улюблені</p>
        <h1>Збережений інвентар</h1>
        <p>
          Тут відображаються тільки ті позиції, які користувач додав
          у список улюблених.
        </p>
      </section>

      {loading && <p className="loading-state">Завантаження...</p>}
      {error && <p className="error-state">{error}</p>}

      {!loading && !error && (
        <InventoryGallery
          items={favoriteItems}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onOpen={setSelectedItem}
        />
      )}

      <InventoryQuickView
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </main>
  );
}

export default Favorites;