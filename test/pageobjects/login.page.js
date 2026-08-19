class LoginPage {
    // Seletores
    get #menuLogin() { return $('~Login'); }
    get #campoEmail() { return $('~input-email'); }
    get #campoSenha() { return $('~input-password'); }
    get #botaoLogin() { return $('~button-LOGIN'); }
    get #mensagemSucesso() { return $('id=android:id/message'); }
    get #botaoModalSucesso() { return $('id=android:id/button1'); }

    // Métodos/Actions
    async abrirMenuLogin() {
        await this.#menuLogin.click();
    }

    async preencherEmail(email, senha) {
        await this.#campoEmail.clearValue();
        await this.#campoEmail.setValue(email);
        await this.#campoSenha.clearValue();
        await this.#campoSenha.setValue(senha);
        await this.#botaoLogin.click();
    }

    async verificarMensagemEClicarBotao(shouldClickButton = true) {
        let temp = await this.#mensagemSucesso.getText();
        if(shouldClickButton) {
            await this.#botaoModalSucesso.click();
        }
        return temp;
    }

    async verificarMensagemErro(texto){
        let temp = $(`//android.widget.TextView[@text="${texto}"]`);
        await expect(temp).toHaveText(texto);
    }

}

export default new LoginPage();