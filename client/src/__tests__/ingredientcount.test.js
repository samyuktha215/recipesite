import { getIngredientCount, filterRecipes, countByCategory } from '../utils/recipeHelpers';

describe('getIngredientCount', () => {
    const testRecipe = {
        ingredients: [ 'whiskey', 'sugar', 'water', 'lemon', 'ice' ]    
    };

    test('returns correct ingredient count', () => {
        expect(getIngredientCount(testRecipe)).toBe(5);
    });

    test('returns 0 for recipe with no ingredients', () => {
        expect(getIngredientCount({ ingredients: [] })).toBe(0);
    });
});

describe('filterRecipes', () => {
    const recipes = [
        { name: 'Aperol Spritz', ingredients: ['Aperol', 'Prosecco', 'Soda Water'] },
        { name: 'Gin & Tonic', ingredients: ['Gin', 'Tonic Water'] },
        { name: 'Dark & Stormy', ingredients: ['Dark Rom', 'Ginger Beer'] },
        { name: 'Mojito', ingredients: ['White Rum', 'Sugar', 'Lime', 'Mint', 'Soda Water'] }
    ];

    test('filters recipes by ingredient', () => {
        expect(filterRecipes(recipes, 'Gin')).toHaveLength(1);
        expect(filterRecipes(recipes, 'Soda Water')).toHaveLength(2);
        expect(filterRecipes(recipes, 'Vodka')).toHaveLength(0);
    });
});

describe('countByCategory', () => {
    const recipes = [
        { category: 'Veganska Drinkar' },
        { category: 'Klassiska Drinkar' },
        { category: 'Varma Drinkar' },
        { category: 'Klassiska Drinkar' }
    ];

    test('counts recipes by category', () => {
        const result = countByCategory(recipes);
        expect(result).toEqual({
            'Veganska Drinkar': 1,
            'Klassiska Drinkar': 2,
            'Varma Drinkar': 1
        });
    });
});