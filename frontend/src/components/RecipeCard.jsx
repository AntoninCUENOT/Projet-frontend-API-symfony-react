import { Link } from "react-router-dom";

export default function RecipeCard({ recipe, onDelete, onUpdate }) {
  
  const handleDelete = async () => {
    if (!confirm("Supprimer cette recette ?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/recipes/${recipe.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Échec de la suppression");
      }

      onDelete(recipe.id);
    } catch (error) {
      console.error(error);
      alert("Impossible de supprimer.");
    }
  };

  return (
    <div className="recipe-card">
      <img
        src={`http://localhost:8000/uploads/${recipe.picture}`}
        alt={recipe.title}
      />

      <h3>{recipe.title}</h3>
      <p>Catégorie : {recipe.category}</p>

      <div className="actions">
        <Link to={`/recipes/${recipe.id}`}>Voir</Link>

        <Link to={`/recipes/edit/${recipe.id}`} className="edit-btn">
          Modifier
        </Link>

        <button className="delete-btn" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </div>
  );
}
