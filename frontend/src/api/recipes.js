const API_URL = "http://localhost:8000/api/recipes";

export async function getRecipes(page = 1) {
  const res = await fetch(`${API_URL}?page=${page}`);
  return res.json();
}

export async function getRecipe(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function getIngredients(id) {
  const res = await fetch(`${API_URL}/${id}/ingredients`);
  return res.json();
}

export async function createRecipe(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
