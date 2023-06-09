class CoctelAPI {
  constructor() {
    this.apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';
  }

  async fetchCoctels() {
    try {
      const response = await fetch(`${this.apiUrl}/search.php?f=a`);
      const data = await response.json();
      return data.drinks;
    } catch (error) {
      console.error('Error fetching coctels:', error);
      return [];
    }
  }
}

class CoctelCard {
  constructor(coctel) {
    this.coctel = coctel;
  }

  render() {
    const card = document.createElement('div');
    card.classList.add('coctel-card');

    const image = document.createElement('img');
    image.src = this.coctel.strDrinkThumb;
    image.alt = this.coctel.strDrink;
    card.appendChild(image);

    const title = document.createElement('h2');
    title.textContent = this.coctel.strDrink;
    card.appendChild(title);

    const category = document.createElement('p');
    category.textContent = `Category: ${this.coctel.strCategory}`;
    card.appendChild(category);

    const glass = document.createElement('p');
    glass.textContent = `Glass: ${this.coctel.strGlass}`;
    card.appendChild(glass);

    const instructions = document.createElement('p');
    instructions.textContent = this.coctel.strInstructions;
    card.appendChild(instructions);

    const button = document.createElement('button');
    button.textContent = 'Ver más';
    button.addEventListener('click', () => {
      // Implementar lógica para ver más detalles del coctel
      console.log(this.coctel);
    });
    card.appendChild(button);

    return card;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const api = new CoctelAPI();
  const coctels = await api.fetchCoctels();
  const coctelCards = document.getElementById('coctel-cards');

  coctels.forEach(coctel => {
    const card = new CoctelCard(coctel);
    coctelCards.appendChild(card.render());
  });
});
