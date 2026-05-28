import { getPhotoUrl } from "../../services/inventoryApi";

function InventoryCard({ item, isFavorite, onToggleFavorite, onOpen }) {
  return (
    <article className="gallery-card">
      <button
        className={isFavorite ? "favorite-button active" : "favorite-button"}
        onClick={(event) => {
          event.stopPropagation();
          onToggleFavorite(item.id);
        }}
      >
        ♥
      </button>

      <div className="gallery-image-wrapper" onClick={() => onOpen(item)}>
        <img
          className="gallery-image"
          src={getPhotoUrl(item.id)}
          alt={item.inventory_name}
        />
      </div>

      <div className="gallery-card-body" onClick={() => onOpen(item)}>
        <h2>{item.inventory_name}</h2>
        <p>{item.description || "Опис відсутній."}</p>
      </div>
    </article>
  );
}

export default InventoryCard;