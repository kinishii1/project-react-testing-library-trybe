import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémon/i,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', async () => {
    const { user } = renderWithRouter(<App />);
    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(nextPokemonButton).toBeInTheDocument();
    await user.click(nextPokemonButton);
    const secondPokemon = await screen.findByText(/charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', async () => {
    const { user } = renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons.length).toBe(7);

    const allFilter = filterButtons[0];

    const fireFilter = screen.getByRole('button', {
      name: /fire/i,
    });

    expect(fireFilter).toBeInTheDocument();
    await user.click(fireFilter);

    const typePokemon = await screen.findByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon.innerHTML).toBe('Fire');
    expect(allFilter).toBeInTheDocument();

    const psychicFilter = screen.getByRole('button', {
      name: /psychic/i,
    });

    expect(psychicFilter).toBeInTheDocument();
    await user.click(psychicFilter);

    const typePokemon2 = await screen.findByTestId('pokemon-type');
    expect(allFilter).toBeInTheDocument();
    expect(typePokemon2).toBeInTheDocument();
    expect(typePokemon2.innerHTML).toBe('Psychic');
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    const { user } = renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', {
      name: /all/i,
    });
    const normalFilter = screen.getByRole('button', {
      name: /normal/i,
    });
    expect(normalFilter).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    await user.click(normalFilter);
    const snorlax = await screen.findByText(/snorlax/i);
    expect(snorlax).toBeInTheDocument();
    await user.click(resetButton);
    const pikachu = await screen.findByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
