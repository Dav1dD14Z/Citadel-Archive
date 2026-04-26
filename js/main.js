import { updateSelectStyles, renderCards, fetchData, filterCharacters } from "./functions/functionsUI.js";
import { updateSelectStylesInformation } from "./data/information.js";

let cardsContainer = document.querySelector('.cards__container');
let form = document.querySelector('.hero__form');
let loadButton = document.querySelector('.cards__button');

const initializeStatus = () => {
    let characters = [];
    let filter = 'all';
    let pageNumber = 1;
    return {
        setCharacters: (newCharacters) => characters = [...characters, ...newCharacters],
        getCharacters: () => characters,
        setFilter: (newFilter) => filter = newFilter,
        getFilter: () => filter,
        getPageNumber: () => pageNumber,
        setPageNumber: (newNumber) => pageNumber = newNumber
    }
}

let charactersState = initializeStatus();

const fetchCharacters = async (filter) => {
    try {
        let pageNumber = charactersState.getPageNumber();
        let data = await fetchData(pageNumber);
        charactersState.setCharacters(data);
        let characters = charactersState.getCharacters();
        
        if(!filter) return renderCards(cardsContainer, characters);
        if(filter === 'all') return renderCards(cardsContainer, characters);

        let filteredCharacters = filterCharacters(characters, filter);
        renderCards(cardsContainer, filteredCharacters);
    } catch (error) {
        cardsContainer.innerHTML = `Temporal Error: ${error}`
    }
}

const main = async () => {
    updateSelectStylesInformation.forEach(info => {
        updateSelectStyles(info.id, info.mainClass);
    });
    fetchCharacters();
}

main();

form.addEventListener('submit', (e) => {
    let characterName = document.querySelector('.hero__input').value;
    e.preventDefault();
    form.reset();

    let characters = charactersState.getCharacters();
    let filteredCharacters = filterCharacters(characters, characterName);

    if(!characterName || characterName.trim() === "") return renderCards(cardsContainer, characters)

    if(filteredCharacters.length === 0) return cardsContainer.innerHTML = "No user found!"

    let filterApplied = charactersState.setFilter(characterName);
    renderCards(cardsContainer, filteredCharacters);
})

loadButton.addEventListener('click', () => {
    let characters = charactersState.getCharacters();
    let filter = charactersState.getFilter();
    let pageNumber = charactersState.getPageNumber();
    charactersState.setPageNumber(pageNumber + 1);
    fetchCharacters(filter);
})
