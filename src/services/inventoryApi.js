const API_URL = "http://localhost:3000";

async function request(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Помилка під час виконання запиту до API");
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return null;
}

export function getPhotoUrl(id) {
  return `${API_URL}/inventory/${id}/photo`;
}

export function getInventory() {
  return request(`${API_URL}/inventory`);
}

export function getInventoryItem(id) {
  return request(`${API_URL}/inventory/${id}`);
}

export function createInventoryItem(data) {
  const formData = new FormData();

  formData.append("inventory_name", data.inventory_name);
  formData.append("description", data.description);

  if (data.photo) {
    formData.append("photo", data.photo);
  }

  return request(`${API_URL}/register`, {
    method: "POST",
    body: formData,
  });
}

export function updateInventoryText(id, data) {
  return request(`${API_URL}/inventory/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inventory_name: data.inventory_name,
      description: data.description,
    }),
  });
}

export function updateInventoryPhoto(id, photo) {
  const formData = new FormData();
  formData.append("photo", photo);

  return request(`${API_URL}/inventory/${id}/photo`, {
    method: "PUT",
    body: formData,
  });
}

export function deleteInventoryItem(id) {
  return request(`${API_URL}/inventory/${id}`, {
    method: "DELETE",
  });
}