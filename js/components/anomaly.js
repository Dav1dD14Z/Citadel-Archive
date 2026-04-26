export default function() {
    return `
        <section class="anomaly">
            <figure class="anomaly__imageContainer">
                <img src="./assets/icons/Anomaly.png" alt="Error image" class="anomaly__img" decoding="async" fetchpriority="high">
                <span class="anomaly__sign" aria-hidden="true">!</span>
            </figure>
            <h2 class="anomaly__title">Anomaly Detected: 404</h2>
            <p class="anomaly__description">We couldn't find that character in this dimension. They might have been erased by the Council of Ricks or simply don't exist in our current timeline scan.</p>
            <button class="anomaly__reset" title="Reset the filters">
                Reset Reality Filters
                <i class="fa-solid fa-arrow-rotate-right anomaly__resetImage" aria-hidden="true"></i>
            </button>
        </section>
    `;
}