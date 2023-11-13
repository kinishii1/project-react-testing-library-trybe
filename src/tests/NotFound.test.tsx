import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('NotFound', () => {
  beforeEach(() => {
    renderWithRouter(<App />, { route: '/rotainexistente' });
  });

  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundTitle).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem com o texto alternativo', () => {
    const notFoundImage = screen.getByRole('img', {
      name: /clefairy pushing buttons randomly with text i have no idea what i'm doing/i,
    });
    expect(notFoundImage).toBeInTheDocument();
  });
  it('Existe uma imagem com o src correspondente', () => {
    const notFoundImage = screen.getByRole('img', {
      name: /clefairy pushing buttons randomly with text i have no idea what i'm doing/i,
    }) as HTMLImageElement;
    expect(notFoundImage.src).toBe('http://localhost:3000/404.gif');
  });
});
