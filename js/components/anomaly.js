export default function(status, description) {
    return `
        <section class="anomaly">
            <figure class="anomaly__imageContainer">
                <img src="./assets/icons/Anomaly.png" alt="Error image" class="anomaly__img" decoding="async" fetchpriority="high">
                <span class="anomaly__sign" aria-hidden="true">!</span>
            </figure>
            <h2 class="anomaly__title">Anomaly Detected: ${status}</h2>
            <p class="anomaly__description">${description}</p>
            <button class=${status === 206 ? "anomaly__retry" : "anomaly__reset"} title="Reset the filters">
                ${status === 206 ? "Reset the life status" : "Retry connection"}
                <i class="fa-solid fa-arrow-rotate-right anomaly__resetImage" aria-hidden="true"></i>
            </button>
        </section>
    `;
}