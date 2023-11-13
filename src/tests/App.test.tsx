import { Router } from "react-router-dom";
import App from "../App";
import renderWithRouter from "../renderWithRouter";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from 'history';

describe("App", () => {
  it("Teste se o topo da aplicação contém um conjunto fixo de links de navegação", () => {
    renderWithRouter(<App />);

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveTextContent("Home");
    expect(links[1]).toHaveTextContent("About");
    expect(links[2]).toHaveTextContent("Favorite Pokémon");
  });
  it("Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.", async () => {
    const { user } = renderWithRouter(<App />);
    const homeLink = screen.getByRole("link", { name: /home/i });
    await user.click(homeLink);
    const homePage = screen.getByRole('heading', {
      name: /encountered pokémon/i,
    })
    expect(homePage).toBeInTheDocument();
  });
  it("Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.", async () => {
    const { user } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole("link", { name: /about/i });
    await user.click(aboutLink);
    const aboutPage = screen.getByRole("heading", {
      name: /about pokédex/i,
    });
    expect(aboutPage).toBeInTheDocument();
  });
  it("Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.", async () => {
    const { user } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole("link", { name: /favorite pokémon/i });
    await user.click(favoriteLink);
    const favoritePage = screen.getByRole("heading", {
      name: /favorite pokémon/i,
    });
    expect(favoritePage).toBeInTheDocument();
  });
  it("Teste se a aplicação é redirecionada para a página Not Found, ao entrar em uma URL desconhecida.", () => {
    renderWithRouter(<App /> , { route: '/pagina-nao-encontrada' });
    const notFoundPage = screen.getByRole("heading", {
      name: /page requested not found/i,
    });
    expect(notFoundPage).toBeInTheDocument();
  }
  );
});
