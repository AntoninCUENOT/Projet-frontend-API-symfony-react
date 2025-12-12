import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import "../styles/recipes.css";

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Limite front-end : 10 recettes par page
  const perPage = 10;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/recipes?page=1&itemsPerPage=30");
        const data = await res.json();

        if (data.member) {
          // Pagination côté FRONT
          const start = (page - 1) * perPage;
          const paginated = data.member.slice(start, start + perPage);

          setRecipes(paginated);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error("Erreur chargement recettes", error);
      }

      setLoading(false);
    };

    fetchRecipes();
  }, [page]);

  const handleDelete = (deletedId) => {
    setRecipes((prev) => prev.filter((r) => r.id !== deletedId));
  };

  const handleUpdate = (updatedRecipe) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
    );
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="recipe-list">
      <h1>Liste des recettes</h1>

      <div className="grid">
        {recipes.length === 0 ? (
          <p>Aucune recette trouvée.</p>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ◀ Page précédente
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>
          Page suivante ▶
        </button>
      </div>
    </div>
  );
}
