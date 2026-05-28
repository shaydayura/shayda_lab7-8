import { Link } from "react-router-dom";
import { getPhotoUrl } from "../../services/inventoryApi";

function InventoryTable({ items, onDelete }) {
  if (items.length === 0) {
    return <p className="empty-state">Інвентар поки що порожній.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Назва інвентарю</th>
            <th>Опис</th>
            <th>Дії</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  className="table-photo"
                  src={getPhotoUrl(item.id)}
                  alt={item.inventory_name}
                />
              </td>

              <td>{item.inventory_name}</td>

              <td>{item.description || "Без опису"}</td>

              <td>
                <div className="table-actions">
                  <Link to={`/admin/${item.id}`}>Переглянути</Link>
                  <Link to={`/admin/${item.id}/edit`}>Редагувати</Link>
                  <button onClick={() => onDelete(item)}>Видалити</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;