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

const updatedState = () => {
    let characters = charactersState.getCharacters();
    let status = charactersState.getStatus();
    let filter = charactersState.getFilter();
    
    let charactersFilteredByName = filterCharactersByName(characters, filter);
    let characterFilteredByStatus = filterCharactersByStatus(charactersFilteredByName, status);

    return {charactersFilteredByName, characterFilteredByStatus};
}

const validateCharacters = characters => {
    let charactersFilteredByName = characters.charactersFilteredByName;
    let charactersFilteredByStatus = characters.characterFilteredByStatus;

    if(charactersFilteredByStatus.length === 0 && charactersFilteredByName.length !== 0) {
        throw {
            code: 206, 
            message: "The current registry scan returned no matching variants for the selected life-state. However, the Citadel archive is still synchronizing additional dimensions, and compatible entities may appear as more registry pages are loaded."
        }
    }

    if(charactersFilteredByStatus.length === 0) throw {
        code: 404, 
        message: "We couldn't find that character in this dimension. They might have been erased by the Council of Ricks or simply don't exist in our current timeline scan."
    }

    return charactersFilteredByStatus;
}

const renderBasedOnTheState = () => {
    try {
        loadButton.classList.remove('cards__button--disabled') 
        let charactersInformation = updatedState();
        let verifiedInformation = validateCharacters(charactersInformation);
        renderCards(cardsContainer, verifiedInformation)
    } catch (error) {
        return characterNotFound(error.code, error.message);
    }
}

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

const fetchCharacters = async () => {
    try {
        let pageNumber = charactersState.getPageNumber();
        let data = await fetchData(pageNumber);
        charactersState.setCharacters(data);
        renderBasedOnTheState()
    } catch (error) {
        characterNotFound(error.message, "There was an issue fetching the characters. The API might be down or you might have lost connection to the Citadel's network. Try again later or check your connection.");
    }
}

const main = () => {
    updateSelectStylesInformation.forEach(info => {
        updateSelectStyles(info.id, info.mainClass);
    });

    renderLoader()
    fetchCharacters();
}

form.addEventListener('submit', (e) => {
    let characterName = document.querySelector('.hero__input').value;
    e.preventDefault();
    renderLoader();

    charactersState.setFilter(characterName);
    
    if(!characterName || characterName.trim() === "") {
        charactersState.setFilter('all');
    } 

    renderBasedOnTheState();
    document.querySelector('.hero__input').value = '';
})

loadButton.addEventListener('click', () => {
    let pageNumber = charactersState.getPageNumber();
    charactersState.setPageNumber(pageNumber + 1);
    renderLoader();
    fetchCharacters();
})

statusSelect.addEventListener('change', () => {
    let newStatus = statusSelect.value;
    charactersState.setStatus(newStatus);
    renderBasedOnTheState()
})

heroSelect.addEventListener('change', () => {
    let newStatus = heroSelect.value;
    charactersState.setStatus(newStatus);
    renderBasedOnTheState()
});

cardsContainer.addEventListener('click', (e) => {
    if(e.target && e.target.classList.contains("anomaly__reset") || e.target && e.target.closest(".anomaly__reset")) {
        document.querySelector('.hero__input').value = '';
        charactersState.setFilter('all')
        renderBasedOnTheState();
    }
    if(e.target && e.target.classList.contains("anomaly__retry") || e.target && e.target.closest(".anomaly__retry")) {
        document.querySelector('.hero__input').value = ''
        charactersState.setStatus('all');
        renderBasedOnTheState();
    }
})

main();