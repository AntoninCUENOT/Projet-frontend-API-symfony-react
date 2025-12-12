import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [servings, setServings] = useState(1);

  useEffect(() => {
    const fetchDetails = async () => {
      // Charger la recette
      const resRecipe = await fetch(`http://localhost:8000/api/recipes/${id}`);
      const dataRecipe = await resRecipe.json();
      setRecipe(dataRecipe);
      setServings(dataRecipe.servings);

      // Charger les ingrédients
      const resIng = await fetch(`http://localhost:8000/api/recipes/${id}/ingredients`);
      const dataIng = await resIng.json();

      setIngredients(Array.isArray(dataIng) ? dataIng : []);
    };

    fetchDetails();
  }, [id]);

  if (!recipe) return <p>Chargement...</p>;

  const factor = servings / recipe.servings;

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>

      <img src={`http://localhost:8000/uploads/${recipe.picture}`} alt={recipe.title} />

      <p>Catégorie : {recipe.category}</p>

      <h3>Portions</h3>
      <input
        type="number"
        min="1"
        value={servings}
        onChange={(e) => setServings(parseInt(e.target.value))}
      />

      <h2>Ingrédients</h2>
      <ul>
        {ingredients.map((i) => (
          <li key={i.id}>
            {i.label} —{" "}
            <strong>{(parseFloat(i.quantity) * factor).toFixed(2)}</strong>{" "}
            {i.unit}
          </li>
        ))}
      </ul>

      <h2>Étapes</h2>
      <pre>{recipe.steps}</pre>
    </div>
  );
}
