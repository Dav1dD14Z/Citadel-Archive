import { updateSelectStyles } from "./functions/functionsUI.js";
import { updateSelectStylesInformation } from "./data/information.js";

const main = () => {
    updateSelectStylesInformation.forEach(info => {
        updateSelectStyles(info.id, info.mainClass);
    });
}

main();