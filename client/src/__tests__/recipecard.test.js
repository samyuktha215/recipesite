import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecipeCard from '../components/recipes/RecipeCard';

const MockRecipeCard = (props) => {
  return (
    <BrowserRouter>
      <RecipeCard {...props} />
    </BrowserRouter>
  );
};

describe('RecipeCard', () => {
    const mockRecipe = {
        name: 'Aperol Spritz',
        image: 'https://i.imgur.com/cKbbc6W.png',
        rating: 4,
        ingredientCount: 3,
        _id: '1',
        category: 'Cocktail',
        difficulty: 'Lätt',
        timeInMins: 5,
        commentsCount: 0
    };

    test('renders recipe information correctly', () => {
        render(<MockRecipeCard drink={mockRecipe} />);

        expect(screen.getByText(mockRecipe.name)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', mockRecipe.image);
        expect(screen.getByText(`Antal ingredienser: ${mockRecipe.ingredientCount}`)).toBeInTheDocument();
        expect(screen.getByText(`Kategori: ${mockRecipe.category}`)).toBeInTheDocument();
    });
});