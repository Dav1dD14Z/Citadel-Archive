import { updateSelectStyles, renderCards, fetchData, filterCharactersByName, filterCharactersByStatus } from "./functions/functionsUI.js";
import { updateSelectStylesInformation } from "./data/information.js";

let cardsContainer = document.querySelector('.cards__container');
let form = document.querySelector('.hero__form');
let loadButton = document.querySelector('.cards__button');
let statusSelect = document.querySelector('.cards__status');

const initializeStatus = () => {
    let characters = [];
    let filter = 'all';
    let pageNumber = 1;
    let status = "all"
    return {
        setCharacters: (newCharacters) => characters = [...characters, ...newCharacters],
        getCharacters: () => characters,
        setFilter: (newFilter) => filter = newFilter,
        getFilter: () => filter,
        getPageNumber: () => pageNumber,
        setPageNumber: (newNumber) => pageNumber = newNumber,
        getStatus: () => status,
        setStatus: (newStatus) => status = newStatus
    }
}

let charactersState = initializeStatus();

const fetchCharacters = async (filter) => {
    try {
        let pageNumber = charactersState.getPageNumber();
        let data = await fetchData(pageNumber);
        charactersState.setCharacters(data);
        let characters = charactersState.getCharacters();
        let status = charactersState.getStatus();
        
        let charactersFilteredByName = filterCharactersByName(characters, filter);
        let characterFilteredByStatus = filterCharactersByStatus(charactersFilteredByName, status);
        renderCards(cardsContainer, characterFilteredByStatus);
    } catch (error) {
        cardsContainer.innerHTML = `Temporal Error: ${error}`
    }
}

const main = async () => {
    updateSelectStylesInformation.forEach(info => {
        updateSelectStyles(info.id, info.mainClass);
    });

    let filter = charactersState.getFilter();
    fetchCharacters(filter);
}

main();

form.addEventListener('submit', (e) => {
    let characterName = document.querySelector('.hero__input').value;
    e.preventDefault();
    form.reset();

    let characters = charactersState.getCharacters();
    let status = charactersState.getStatus();
    charactersState.setFilter(characterName);

    let filteredCharacters = filterCharactersByName(characters, characterName);
    
    if(!characterName || characterName.trim() === "") {
        let newFilter = 'all';
        charactersState.setFilter(newFilter);
        let charactersFilteredByStatus = filterCharactersByStatus(characters, status)
        return renderCards(cardsContainer, charactersFilteredByStatus)
    } 
    
    if(filteredCharacters.length === 0) return cardsContainer.innerHTML = "No user found!"
    
    let charactersFilteredByStatus = filterCharactersByStatus(filteredCharacters, status);

    renderCards(cardsContainer, charactersFilteredByStatus);
})

loadButton.addEventListener('click', () => {
    let characters = charactersState.getCharacters();
    let filter = charactersState.getFilter();
    let pageNumber = charactersState.getPageNumber();
    charactersState.setPageNumber(pageNumber + 1);
    fetchCharacters(filter);
})

statusSelect.addEventListener('change', () => {
    let newStatus = statusSelect.value;
    charactersState.setStatus(newStatus);

    let characters = charactersState.getCharacters();
    let filter = charactersState.getFilter();

    let charactersFilteredByName = filterCharactersByName(characters, filter);
    let filteredCharacters = filterCharactersByStatus(charactersFilteredByName, newStatus);

    if(filteredCharacters.length === 0) return cardsContainer.innerHTML = "No user found!"
    renderCards(cardsContainer, filteredCharacters)
})
