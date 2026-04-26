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

const render = (data) => renderCards(cardsContainer, data);

const applyFilters = () => {
    let characters = charactersState.getCharacters();
    let filter = charactersState.getFilter();

    if(!filter || filter === 'all') return characters;
    let filteredCharacters = filterCharacters(characters, filter);
    if(filteredCharacters.length === 0) return cardsContainer.innerHTML = 'No character was found!'
    return filteredCharacters;
}

const fetchCharacters = async (filter) => {
    try {
        let pageNumber = charactersState.getPageNumber();
        let data = await fetchData(pageNumber);
        charactersState.setCharacters(data);
        let characters = charactersState.getCharacters();
        
        render(fetchCharacters());
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

    render(applyFilters())
})

loadButton.addEventListener('click', () => {
    let characters = charactersState.getCharacters();
    let filter = charactersState.getFilter();
    let pageNumber = charactersState.getPageNumber();
    charactersState.setPageNumber(pageNumber + 1);
    fetchCharacters(filter);
})