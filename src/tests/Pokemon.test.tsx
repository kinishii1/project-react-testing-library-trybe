import { screen } from "@testing-library/react";
import App from "../App";
import renderWithRouter from "../renderWithRouter";
import data from "../data";

describe("Pokemon", () => {
  it("Teste se é renderizado um card com as informações de determinado Pokémon.", () => {
    const id = 25;
    const routePokemon = `/pokemon/${id}`;
    const pokemonSelected = data.find((pokemon) => pokemon.id === id);
    renderWithRouter(<App />, { route: routePokemon });
    const namePokemonInfo = screen.getByTestId("pokemon-name");

    const pokemonName = pokemonSelected?.name;
    const pokemonType = pokemonSelected?.type;
    const pokemonWeight = pokemonSelected?.averageWeight.value;
    const pokemonMeasurementUt = pokemonSelected?.averageWeight.measurementUnit;
    const formattedWeight = `Average weight: ${pokemonWeight} ${pokemonMeasurementUt}`;

    expect(namePokemonInfo).toBeInTheDocument();
    expect(namePokemonInfo.innerHTML).toBe(pokemonName);

    const typePokemonInfo = screen.getByTestId("pokemon-type");
    expect(typePokemonInfo).toBeInTheDocument();
    expect(typePokemonInfo.innerHTML).toBe(pokemonType);

    const weightPokemonInfo = screen.getByTestId("pokemon-weight");
    expect(weightPokemonInfo).toBeInTheDocument();
    expect(weightPokemonInfo.innerHTML).toBe(formattedWeight);

    const imagePokemonInfo = screen.getByRole("img", {
      name: `${pokemonName} sprite`,
    }) as HTMLImageElement;
    expect(imagePokemonInfo).toBeInTheDocument();
    expect(imagePokemonInfo.src).toBe(pokemonSelected?.image);
    expect(imagePokemonInfo.alt).toBe(`${pokemonName} sprite`);
  });
  it("Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon", () => {
    const expectedPath = `http://localhost:3000/pokemon/25`;
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole("link", {
      name: "More details",
    }) as HTMLLinkElement;
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails.href).toContain(expectedPath);
  });
  it("Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.", async () => {
    const { user } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole("link", {
      name: "More details",
    }) as HTMLLinkElement;
    await user.click(linkDetails);
    const { pathname } = window.location;
    expect(pathname).toBe("/pokemon/25");
  });
  it("Teste se existe um ícone de estrela nos Pokémons favoritados.", async () => {
    const id = 25;
    const routePokemon = `/pokemon/${id}`;
    const pokemonSelected = data.find((pokemon) => pokemon.id === id);
    const pokemonName = pokemonSelected?.name;
    const { user } = renderWithRouter(<App />, { route: routePokemon });
    const favoriteCheckbox = screen.getByRole("checkbox", {
      name: /pokémon favoritado\?/i,
    });
    await user.click(favoriteCheckbox);
    const starIcon = screen.getByRole("img", {
      name: `${pokemonName} is marked as favorite`,
    }) as HTMLImageElement;
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toContain("http://localhost:3000/star-icon.png");
  });
});
