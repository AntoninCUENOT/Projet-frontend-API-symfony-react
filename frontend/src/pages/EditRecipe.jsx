import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IngredientInput from "../components/IngredientInput";
import "../styles/addRecipe.css";

export default function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [steps, setSteps] = useState("");
    const [currentPicture, setCurrentPicture] = useState("");
    const [newPicture, setNewPicture] = useState(null);
    const [servings, setServings] = useState(1);

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const res = await fetch(`http://localhost:8000/api/recipes/${id}`);
                const data = await res.json();

                setTitle(data.title);
                setCategory(data.category);
                setSteps(data.steps);
                setCurrentPicture(data.picture);
                setServings(data.servings);

                const resIng = await fetch(`http://localhost:8000/api/recipes/${id}/ingredients`);
                const dataIng = await resIng.json();
                setIngredients(Array.isArray(dataIng) ? dataIng : []);
            } catch (err) {
                console.error(err);
            }

            setLoading(false);
        };

        loadRecipe();
    }, [id]);

    const updateIngredient = (index, field, value) => {
        const updated = [...ingredients];
        updated[index][field] = value;
        setIngredients(updated);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { label: "", quantity: "", unit: "" }]);
    };

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPicture) {
            setCurrentPicture(newPicture.name);
        }
        // --- 1) Update de la recette ---
        const updatedRecipe = {
            title,
            category,
            steps,
            currentPicture,
            servings: parseInt(servings),
            ingredients,
        };

        try {
            const res = await fetch(`http://localhost:8000/api/recipes/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedRecipe),
            });

            if (!res.ok) throw new Error("Erreur API");

            // --- 2) Upload de nouvelle image si fournie ---
            if (newPicture) {
                const formData = new FormData();
                formData.append("file", newPicture);

                await fetch(`http://localhost:8000/api/recipes/${id}/image`, {
                    method: "POST",
                    body: formData,
                });
            }


            alert("Recette mise à jour !");
            navigate(`/recipes/${id}`);
        } catch (error) {
            console.error(error);
            alert("Impossible de modifier la recette.");
        }
    };

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="add-recipe">
            <h1>Modifier la recette</h1>

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
                    Nouvelle image :
                    <input type="file" onChange={(e) => setNewPicture(e.target.files[0])} />
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

                <button type="button" onClick={addIngredient}>
                    + Ajouter un ingrédient
                </button>

                <br /><br />

                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
}
