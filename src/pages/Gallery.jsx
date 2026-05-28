import { useState } from "react";
import InventoryGallery from "../components/gallery/InventoryGallery";
import InventoryQuickView from "../components/gallery/InventoryQuickView";
import FavoritesBar from "../components/gallery/FavoritesBar";
import { useInventory } from "../context/InventoryContext";
import { useFavorites } from "../hooks/useFavorites";

function Gallery() {
  const { items, loading, error } = useInventory();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <main className="page">
      <section className="gallery-hero">
        <p className="subtitle">Складська система</p>
        <h1>Галерея інвентарю</h1>
        <p>
          Переглядайте доступний інвентар складу, відкривайте деталі
          та додавайте потрібні позиції в улюблені.
        </p>
      </section>

      <FavoritesBar count={favorites.length} />

      {loading && (
        <div className="skeleton-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {error && <p className="error-state">{error}</p>}

      {!loading && !error && (
        <InventoryGallery
          items={items}
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

export default Gallery;