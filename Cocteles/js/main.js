const URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

function mostrarCocktails() {
  const cocktailContainer = document.getElementById("cocktailContainer");
  cocktailContainer.innerHTML = "";

  fetch(URL)
    .then(response => response.json())
    .then(data => {
      const cocktails = data.drinks;
      cocktails.forEach(cocktail => {
        const name = cocktail.strDrink;
        const image = cocktail.strDrinkThumb;

        const cocktailElement = document.createElement("div");
        cocktailElement.className = "cocktail";

        const imgElement = document.createElement("img");
        imgElement.className = "cocktail-img";
        imgElement.src = image;
        imgElement.alt = name;

        const buttonElement = document.createElement("button");
        buttonElement.className = "ver-mas-btn";
        buttonElement.textContent = "Ver más";
        buttonElement.addEventListener("click", () => {
          mostrarInformacion(cocktailElement, cocktail, imgElement); // Llamada a la función para mostrar la información del cocktail
        });

        cocktailElement.appendChild(imgElement);
        cocktailElement.appendChild(buttonElement);

        cocktailContainer.appendChild(cocktailElement);
      });
    })
    .catch(error => console.log(error));
}

function mostrarInformacion(cocktailElement, cocktail) {
  const infoElement = document.createElement("div");
  infoElement.className = "cocktail-info";

  const nameElement = document.createElement("h2");
  nameElement.className = "cocktail-name";
  nameElement.textContent = cocktail.strDrink;

  const categoryElement = document.createElement("p");
  categoryElement.className = "cocktail-category";
  categoryElement.textContent = "Categoría: " + cocktail.strCategory;

  const instructionsElement = document.createElement("p");
  instructionsElement.className = "cocktail-instructions";
  instructionsElement.textContent = "Instrucciones: " + cocktail.strInstructions;

  const ingredientsElement = document.createElement("p");
  ingredientsElement.className = "cocktail-ingredients";
  ingredientsElement.textContent = "Ingredientes: " + getIngredients(cocktail);

  infoElement.appendChild(nameElement);
  infoElement.appendChild(categoryElement);
  infoElement.appendChild(instructionsElement);
  infoElement.appendChild(ingredientsElement);

  // Verificar si el infoElement ya está presente antes de agregarlo
  const existingInfoElement = cocktailElement.nextElementSibling;
  if (existingInfoElement && existingInfoElement.className === "cocktail-info") {
    // Si el infoElement ya existe, simplemente reemplazamos su contenido
    existingInfoElement.innerHTML = infoElement.innerHTML;
  } else {
    // Si no existe, agregamos el infoElement como un hermano después del cocktailElement
    cocktailElement.parentNode.insertBefore(infoElement, cocktailElement.nextSibling);
  }
}

function ocultarInformacion(cocktailElement) {
  // Verificar si existe un infoElement
  const infoElement = cocktailElement.nextElementSibling;
  if (infoElement && infoElement.className === "cocktail-info") {
    // Eliminar el infoElement
    infoElement.parentNode.removeChild(infoElement);
  }
}

function mostrarCocktails() {
  const cocktailContainer = document.getElementById("cocktailContainer");
  cocktailContainer.innerHTML = "";

  fetch(URL)
    .then(response => response.json())
    .then(data => {
      const cocktails = data.drinks;
      cocktails.forEach(cocktail => {
        const name = cocktail.strDrink;
        const image = cocktail.strDrinkThumb;

        const cocktailElement = document.createElement("div");
        cocktailElement.className = "cocktail";

        const imgElement = document.createElement("img");
        imgElement.className = "cocktail-img";
        imgElement.src = image;
        imgElement.alt = name;

        const verMasButton = document.createElement("button");
        verMasButton.textContent = "Ver más";
        verMasButton.className = "ver-mas-button";
        verMasButton.addEventListener("click", () => {
          mostrarInformacion(cocktailElement, cocktail);
          verMasButton.style.display = "none";
          verMenosButton.style.display = "block";
        });

        const verMenosButton = document.createElement("button");
        verMenosButton.textContent = "Ver menos";
        verMenosButton.className = "ver-menos-button";
        verMenosButton.style.display = "none";
        verMenosButton.addEventListener("click", () => {
          ocultarInformacion(cocktailElement);
          verMenosButton.style.display = "none";
          verMasButton.style.display = "block";
        });

        cocktailElement.appendChild(imgElement);
        cocktailElement.appendChild(verMasButton);
        cocktailElement.appendChild(verMenosButton);

        cocktailContainer.appendChild(cocktailElement);
      });
    })
    .catch(error => console.log(error));
}



function getIngredients(cocktail) {
  // Función getIngredients existente en el código anterior
  // Retorna los ingredientes formateados como una cadena de texto
}

mostrarCocktails();





