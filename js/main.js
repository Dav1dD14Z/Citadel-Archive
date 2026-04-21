const updateSelectStyles = (id, mainClass) => {
    const element = document.querySelector(`#${id}`)
    if(!element) return;
    
    element.addEventListener('change', function() {
        this.classList.remove(
            `${mainClass}--dead`,
            `${mainClass}--alive`,
            `${mainClass}--unknown`
        );
        
        if (this.value === 'all') return;
        if (this.value === 'dead') this.classList.add(`${mainClass}--dead`);
        if (this.value === 'alive') this.classList.add(`${mainClass}--alive`);
        if (this.value === 'unknown') this.classList.add(`${mainClass}--unknown`);
    })
};

const main = () => {
    updateSelectStyles("heroSelect", "hero__select")
    updateSelectStyles("characterStatus", "cards__status")
}

main();