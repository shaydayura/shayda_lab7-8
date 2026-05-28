import InventoryCard from "./InventoryCard";

function InventoryGallery({
  items,
  isFavorite,
  onToggleFavorite,
  onOpen,
}) {
  if (items.length === 0) {
    return (
      <p className="empty-state">
        Немає інвентарю для відображення.
      </p>
    );
  }

  return (
    <div className="gallery-grid">
      {items.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={onToggleFavorite}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

export default InventoryGallery;