import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('About', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutTitle).toBeInTheDocument();

    const firstParagraph = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon\./i,
    );
    expect(firstParagraph).toBeInTheDocument();
    const secondParagraph = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them\./i,
    );
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });
    const image = screen.getByRole('img', {
      name: /pokédex/i,
    }) as HTMLImageElement;

    expect(image).toBeInTheDocument();

    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
