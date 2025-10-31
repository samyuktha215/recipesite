export const getIngredientCount = (recipe) => {
    return recipe.ingredients?.length || 0;
};

export const filterRecipes = (recipes, searchIngredient) => {
    return recipes.filter(recipe => 
        recipe.ingredients.some(ingredient => 
            ingredient.toLowerCase() === searchIngredient.toLowerCase()
        )
    );
};

export const countByCategory = (recipes) => {
    return recipes.reduce((acc, recipe) => {
        const category = recipe.category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});
};