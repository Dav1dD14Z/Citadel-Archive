import { updateSelectStyles, renderCards } from "./functions/functionsUI.js";
import { updateSelectStylesInformation } from "./data/information.js";

const main = () => {
    updateSelectStylesInformation.forEach(info => {
        updateSelectStyles(info.id, info.mainClass);
    });

    renderCards('https://rickandmortyapi.com/api/character/?page=2');
}

main();