import { useState } from "react";

function InventoryForm({
  initialValues = {
    inventory_name: "",
    description: "",
  },
  submitText = "Зберегти",
  showPhotoInput = true,
  onSubmit,
}) {
  const [formData, setFormData] = useState(initialValues);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const handleTextChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.inventory_name.trim() === "") {
      setError("Назва інвентарю є обов’язковою.");
      return;
    }

    setError("");
    onSubmit({
      ...formData,
      inventory_name: formData.inventory_name.trim(),
      description: formData.description.trim(),
      photo,
    });
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      {error && <p className="error-state">{error}</p>}

      <label>
        Назва інвентарю *
        <input
          type="text"
          name="inventory_name"
          value={formData.inventory_name}
          onChange={handleTextChange}
          placeholder="Наприклад, Ноутбук HP"
        />
      </label>

      <label>
        Опис
        <textarea
          name="description"
          value={formData.description}
          onChange={handleTextChange}
          placeholder="Короткий опис інвентарю"
        />
      </label>

      {showPhotoInput && (
        <label>
          Фото
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>
      )}

      <button className="primary-button" type="submit">
        {submitText}
      </button>
    </form>
  );
}

export default InventoryForm;