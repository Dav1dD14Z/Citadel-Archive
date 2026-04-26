import card from '../components/card.js';

// Updates the styles of the select element based on the selected value
export const updateSelectStyles = (id, mainClass) => {
    const element = document.querySelector(`#${id}`)
    if(!element) return;
    
    element.addEventListener('change', function() {
        this.classList.remove(
            `${mainClass}--dead`,
            `${mainClass}--alive`,
            `${mainClass}--unknown`
        );
        
        if (this.value === 'all') return;
        if (this.value === 'dead') this.classList.add(`${mainClass}--dead`);
        if (this.value === 'alive') this.classList.add(`${mainClass}--alive`);
        if (this.value === 'unknown') this.classList.add(`${mainClass}--unknown`);
    })
};

// Fetch the API data based on the URL params
export const fetchData = async (pageNumber) => {
    let URL = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;
    let response = await fetch(URL);
    if(!response.ok) throw new Error("Error loading the data. Try again");

    let data = await response.json();
    return data.results
};

// Render the cards
export const renderCards = (cardsContainer, data) => {
    let cardsHTML = '';
    cardsContainer.innerHTML = ''

    data.forEach((character, index) => {
        cardsHTML += card(character.name, character.status, character.species, character.image, character.location.name, character.id, index)
    });
    cardsContainer.innerHTML = cardsHTML;
}

// Filters the characters
export const filterCharacters = (data, name) => {
    if(data.length === 0) return [];
    let characters = data.filter(character => character.name.toLowerCase().includes(name.toLowerCase()));
    if(characters.length === 0) return [];
    return characters;
}