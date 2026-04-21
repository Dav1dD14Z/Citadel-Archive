// Updates the styles of the select element based on the selected value
export const updateSelectStyles = (id, mainClass) => {
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