import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CategoryCard() {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://grupp1-mqzle.reky.se/recipes")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((recipe) =>
          recipe.categories.includes(categoryName)
        );
        setRecipes(filtered);
      });
  }, [categoryName]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Recipes in "{categoryName}"
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white shadow rounded-2xl p-4 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
            <p className="text-sm text-gray-600">{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCard;
