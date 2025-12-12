import { useState } from "react";
import IngredientInput from "../components/IngredientInput";
import "../styles/addRecipe.css";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [steps, setSteps] = useState("");
  const [picture, setPicture] = useState(null);
  const [servings, setServings] = useState(1);

  const [ingredients, setIngredients] = useState([
    { label: "", quantity: "", unit: "" },
  ]);

  const addIngredient = () => {
    setIngredients([...ingredients, { label: "", quantity: "", unit: "" }]);
  };

  const updateIngredient = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- 1) Création de la recette SANS image ---
    const payload = {
      title,
      category,
      steps,
      servings: Number(servings),
      ingredients: ingredients.map((ing) => ({
        label: ing.label,
        quantity: Number(ing.quantity),
        unit: ing.unit,
      })),
    };

    let recipeId = null;

    try {
      const res = await fetch("http://localhost:8000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const created = await res.json();
      recipeId = created.id;

      if (!recipeId) {
        throw new Error("Erreur : ID absent après création");
      }

      // --- 2) Upload de l'image si fournie ---
      if (picture) {
        const formData = new FormData();
        formData.append("file", picture);

        await fetch(`http://localhost:8000/api/recipes/${recipeId}/image`, {
          method: "POST",
          body: formData,
        });
      }

      alert("Recette créée avec succès !");

      // Reset
      setTitle("");
      setCategory("");
      setSteps("");
      setPicture(null);
      setServings(1);
      setIngredients([{ label: "", quantity: "", unit: "" }]);
    } catch (error) {
      console.error(error);
      alert("Impossible d'ajouter la recette.");
    }
  };

  return (
    <div className="add-recipe">
      <h1>Ajouter une recette</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Titre :
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Catégorie :
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>

        <label>
          Étapes :
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />
        </label>

        <label>
          Image :
          <input
            type="file"
            onChange={(e) => setPicture(e.target.files[0])}
          />
        </label>

        <label>
          Portions :
          <input
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
        </label>

        <h2>Ingrédients</h2>

        {ingredients.map((ing, index) => (
          <IngredientInput
            key={index}
            index={index}
            ingredient={ing}
            onChange={updateIngredient}
            onRemove={removeIngredient}
          />
        ))}

        <button type="button" onClick={addIngredient} className="add-btn">
          + Ajouter un ingrédient
        </button>

        <br /><br />

        <button type="submit" className="submit-btn">
          Créer la recette
        </button>
      </form>
    </div>
  );
}
