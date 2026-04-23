export default function(name, status, species, imageURL, origin, id, firstCard) {
    return `<article class="card card--${status.toLowerCase()}" id="card-${id}" aria-label="Card for ${name}, a ${species} from ${origin} with status ${status}">
            <span class="card__status" aria-label="Status: ${status}" title="The status of the character ${name}">
                <div class="card__circle card__circle--${status.toLowerCase()}" aria-hidden="true"></div>
                <p>${status}</p>
            </span>
            <figure class="card__figure">
                <img src="${imageURL}" alt="Image of ${name}" class="card__img" loading="eager" fetchpriority="high">
            </figure>
            <div class="card__information">
                <h3 class="card__name">${name}</h3>
                <p class="card__info card__info--${status.toLowerCase()}">${species}<span>${origin}</span></p>
                <div class="card__links">
                    <a href="#" class="card__link card__link--${status.toLowerCase()}" title="Link to the detail section of ${name}">
                        <p>
                            View Bio-Data
                        </p>
                        <i class="fa-solid fa-arrow-right card__arrowImage" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </article>
    `;
} 