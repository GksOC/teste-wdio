class FormPage {
    // Seletores
    get #menuForm() {return $("accessibility id:Forms"); }
    get #textInput() {return $("accessibility id:text-input"); }
    get #inputTextResult() {return $("accessibility id:input-text-result"); }
    get #dropdown() {return $("-android uiautomator:new UiSelector().resourceId(\"text_input\")"); }

    // Métodos/Actions
    async abrirMenuFormulario() {
        await this.#menuForm.click();
    }

    async preencherFormularioEValidar(texto) {
        await this.#textInput.clearValue();
        await this.#textInput.addValue(texto);
        await this.#inputTextResult.click();
        return await this.#inputTextResult.getText();
    }

    async selecionarOpcaoDropdown(opcao) {
        let texto = "";
        await this.#dropdown.click();
        switch(opcao) {
            case 1:
                texto = "Appium is awesome";
                break;
            case 2:
                texto = "webdriver.io is awesome";
                break;
            case 3:
                texto = "This app is awesome";
                break;
        }
        await $(`-android uiautomator:new UiSelector().text(\"${texto}\")`).click(); 
    }

    async validarDropdown() {
        return await this.#dropdown.getText();
    }

}

export default new FormPage();