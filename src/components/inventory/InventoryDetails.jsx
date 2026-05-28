import { getPhotoUrl } from "../../services/inventoryApi";

function InventoryDetails({ item }) {
  return (
    <article className="details-card">
      <img
        className="details-image"
        src={getPhotoUrl(item.id)}
        alt={item.inventory_name}
      />

      <div>
        <p className="subtitle">Деталі інвентарю</p>
        <h1>{item.inventory_name}</h1>
        <p className="details-description">
          {item.description || "Опис відсутній."}
        </p>
      </div>
    </article>
  );
}

export default InventoryDetails;