import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('FavoritePokemon', () => {
  it('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const noFavoritePokemon = screen.getByText(/No favorite Pokémon found/i);
    expect(noFavoritePokemon).toBeInTheDocument();
  });
  it('Exibe pokemons favoritados', async () => {
    const { user } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });

    await user.click(moreDetails);

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });

    await user.click(checkbox);

    await user.click(favoriteLink);

    const pikachu = screen.getByText(/pikachu/i);

    expect(pikachu).toBeInTheDocument();
  });
});
