import { screen } from '@testing-library/react';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('pokemon details', () => {
  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const id = 4;
    const routePokemon = `/pokemon/${id}`;
    const pokemonSelected = data.find((pokemon) => pokemon.id === id);
    const pokemonName = pokemonSelected?.name;
    renderWithRouter(<App />, { route: routePokemon });
    const pokemonNameDetails = screen.getByRole('heading', {
      name: `${pokemonName} Details`,
    });
    expect(pokemonNameDetails).toBeInTheDocument();
    expect(pokemonNameDetails).toHaveTextContent(`${pokemonName} Details`);

    const pokemonNameHeading = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(pokemonNameHeading).toBeInTheDocument();

    const pokemonDescription = screen.getByText(/the flame/i);
    expect(pokemonDescription).toBeInTheDocument();
    expect(pokemonDescription).toHaveTextContent(
      /the flame on its tail shows the strength of its life force\. if it is weak, the flame also burns weakly\./i,
    );
  });

  it('Testa se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    const id = 4;
    const routePokemon = `/pokemon/${id}`;
    const pokemonSelected = data.find((pokemon) => pokemon.id === id);
    const pokemonLocations = pokemonSelected?.foundAt.map(
      ({ location }) => location,
    );
    const locationLength = pokemonLocations?.length || 0;
    console.log(pokemonLocations);
    renderWithRouter(<App />, { route: routePokemon });
    const heading = screen.getByRole('heading', {
      name: /game locations of charmander/i,
    });
    expect(heading).toBeInTheDocument();
    const locations = screen.getAllByRole('img', {
      name: /charmander location/i,
    }) as HTMLImageElement[];

    expect(locations).toHaveLength(locationLength);

    for (let index = 0; index < locationLength; index += 1) {
      expect(locations[index]).toHaveAttribute('src', pokemonSelected?.foundAt[index].map);
    }
    if (locationLength && pokemonLocations) {
      for (let index = 0; index < locationLength; index += 1) {
        const location = screen.getByText(pokemonLocations[index]);
        expect(location).toBeInTheDocument();
      }
    }
  });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', async () => {
    const id = 4;
    const routePokemon = `/pokemon/${id}`;
    const { user } = renderWithRouter(<App />, { route: routePokemon });
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkbox).toBeInTheDocument();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
