import { Routes, Route } from "react-router-dom";
import RecipesList from "./pages/RecipesList.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/recipes" element={<RecipesList />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/recipes/edit/:id" element={<EditRecipe />} />
      </Routes>
    </>
  );
}

export default App;
