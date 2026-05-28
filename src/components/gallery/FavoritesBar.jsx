import { Link } from "react-router-dom";

function FavoritesBar({ count }) {
  return (
    <div className="favorites-bar">
      <span>Улюблених позицій: {count}</span>
      <Link to="/favorites">Переглянути улюблені</Link>
    </div>
  );
}

export default FavoritesBar;