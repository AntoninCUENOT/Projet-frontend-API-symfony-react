export default function IngredientInput({ index, ingredient, onChange, onRemove }) {
  return (
    <div className="ingredient-block">
      <input
        type="text"
        placeholder="Nom"
        value={ingredient.label}
        onChange={(e) => onChange(index, "label", e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Quantité"
        value={ingredient.quantity}
        onChange={(e) => onChange(index, "quantity", e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Unité"
        value={ingredient.unit}
        onChange={(e) => onChange(index, "unit", e.target.value)}
        required
      />

      <button type="button" onClick={() => onRemove(index)}>
        X
      </button>
    </div>
  );
}
