import { getPhotoUrl } from "../../services/inventoryApi";

function InventoryQuickView({ item, onClose }) {
  if (!item) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="quick-view" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <img
          className="quick-view-image"
          src={getPhotoUrl(item.id)}
          alt={item.inventory_name}
        />

        <div className="quick-view-content">
          <p className="subtitle">Quick View</p>
          <h2>{item.inventory_name}</h2>
          <p>{item.description || "Опис відсутній."}</p>
        </div>
      </div>
    </div>
  );
}

export default InventoryQuickView;