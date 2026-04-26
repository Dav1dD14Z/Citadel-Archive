import { updateSelectStyles, renderCards, fetchData, filterCharactersByName, filterCharactersByStatus } from "./functions/functionsUI.js";
import { updateSelectStylesInformation } from "./data/information.js";
import anomaly from "./components/anomaly.js";
import loader from "./components/loader.js";

let cardsContainer = document.querySelector('.cards__container');
let form = document.querySelector('.hero__form');
let loadButton = document.querySelector('.cards__button');
let statusSelect = document.querySelector('.cards__status');
let heroSelect = document.querySelector('.hero__select');

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

const characterNotFound = (status, description) => {
    cardsContainer.innerHTML = "";
    let template = anomaly(status, description);
    cardsContainer.innerHTML = template;
    loadButton.classList.add('cards__button--disabled') 
}

const renderLoader = () => {
    cardsContainer.innerHTML = '';
    loadButton.classList.add('cards__button--disabled')
    let template = loader();
    cardsContainer.innerHTML = template;
    loadButton.classList = 'cards__button';
}

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
        characterNotFound(error.message, "There was an issue fetching the characters. The API might be down or you might have lost connection to the Citadel's network. Try again later or check your connection.");
    }
}

const renderByStatus = (newStatus) => {
    charactersState.setStatus(newStatus);

    let characters = charactersState.getCharacters();
    let filter = charactersState.getFilter();

    let charactersFilteredByName = filterCharactersByName(characters, filter);
    let filteredCharacters = filterCharactersByStatus(charactersFilteredByName, newStatus);

    if(filteredCharacters.length === 0) return characterNotFound();
    renderLoader();
    renderCards(cardsContainer, filteredCharacters)
}

const main = async () => {
    updateSelectStylesInformation.forEach(info => {
        updateSelectStyles(info.id, info.mainClass);
    });

    renderLoader()
    let filter = charactersState.getFilter();
    fetchCharacters(filter);
}

form.addEventListener('submit', (e) => {
    let characterName = document.querySelector('.hero__input').value;
    loadButton.classList.remove('cards__button--disabled') 
    e.preventDefault();
    renderLoader();

    let characters = charactersState.getCharacters();
    let status = charactersState.getStatus();
    charactersState.setFilter(characterName);

    let filteredCharacters = filterCharactersByName(characters, characterName);
    let charactersFilteredByStatus = filterCharactersByStatus(filteredCharacters, status);
    
    if(!characterName || characterName.trim() === "") {
        document.querySelector('.hero__input').value = '';
        let newFilter = 'all';
        charactersState.setFilter(newFilter);
        let charactersFilteredByStatus = filterCharactersByStatus(characters, status)
        return renderCards(cardsContainer, charactersFilteredByStatus)
    } 
    
    if(charactersFilteredByStatus.length === 0) return characterNotFound();

    renderCards(cardsContainer, charactersFilteredByStatus);
    document.querySelector('.hero__input').value = '';
})

loadButton.addEventListener('click', () => {
    let characters = charactersState.getCharacters();
    let filter = charactersState.getFilter();
    let pageNumber = charactersState.getPageNumber();
    charactersState.setPageNumber(pageNumber + 1);
    renderLoader();
    fetchCharacters(filter);
})

statusSelect.addEventListener('change', () => {
    let newStatus = statusSelect.value;
    renderByStatus(newStatus);
})

heroSelect.addEventListener('change', () => {
    let newStatus = heroSelect.value;
    renderByStatus(newStatus);
});

cardsContainer.addEventListener('click', (e) => {
    if(e.target && e.target.classList.contains("anomaly__reset") || e.target && e.target.closest(".anomaly__reset")) {
        loadButton.classList.remove('cards__button--disabled') 
        document.querySelector('.hero__input').value = '';
        renderLoader();

        let characters = charactersState.getCharacters();
        let newStatus = 'all'
        let newFilter = 'all';
        charactersState.setFilter(newFilter);
        charactersState.setStatus(newStatus);
    
        let charactersFilteredByName = filterCharactersByName(characters, newFilter);
        let charactersFilteredByStatus = filterCharactersByStatus(charactersFilteredByName, newStatus);
        renderCards(cardsContainer, charactersFilteredByStatus);
    }
    if(e.target && e.target.classList.contains("anomaly__retry") || e.target && e.target.closest(".anomaly__retry")) {
        document.querySelector('.hero__input').value = ''
        let filter = charactersState.getFilter();
        renderLoader()
        fetchCharacters(filter);
    }
})

main();