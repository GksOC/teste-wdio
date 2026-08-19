class SwipePage {
    // Seletores
    get #menuSwipe() { return $('~Swipe') }
    get #carrousel() { return $('//android.view.ViewGroup[@resource-id="Carousel"]') }
    get #wdioIcon() { return $('~WebdriverIO logo') }

    // Métodos/Actions
    async abrirMenuSwipe() {
        await this.#menuSwipe.click();
    };

    async arrastarCarrossel(dir = 'left', d = 500, p = 0.8) {
        await browser.swipe({
            direction: dir,                     
            duration: d,                        
            percent: p,                         
            scrollableElement: this.#carrousel, 
        });
    }

    async arrastarTela(dir = 'up', d = 500, p = 0.75) {
        await browser.swipe({
            direction: dir,     
            duration: d,       
            percent: p,        
        });
    }

    async verificaCard(n){
        await $(`//android.view.ViewGroup[@resource-id="__CAROUSEL_ITEM_${n}__"]/android.view.ViewGroup[@content-desc="card"]`).click();
    }

    async verificarIcon(){
        await this.#wdioIcon.click();
    }
}

export default new SwipePage();