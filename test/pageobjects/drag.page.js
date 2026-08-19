class DragPage {
    // Seletores
    get #menuDrag() {return $("accessibility id:Drag"); }
    get #buttonRetry() {return $("accessibility id:button-Retry"); }

    // Métodos/Actions
    async abrirMenuDrag() {
        await this.#menuDrag.click();
    }

    async pegarArrastar({di, xi, yi}, {df, xf, yf}) {
    await driver.action('pointer')
        .move({ duration: di, x: xi, y: yi })
        .down({ button: 0 })
        .move({ duration: df, x: xf, y: yf })
        .up({ button: 0 })
        .perform();
    }

    async validarBotão(texto) {
        await this.#buttonRetry.getText(texto);
        await this.#buttonRetry.click();
    }

}

export default new DragPage();