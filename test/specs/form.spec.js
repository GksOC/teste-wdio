import FormPage from '../pageobjects/form.page.js';

describe('Funcionalidade: Tela de formulário', () => {

    beforeEach(async () => {
        await FormPage.abrirMenuFormulario();
    });

    afterEach(async () => {
        await browser.relaunchActiveApp();
    });

    it('Deve preencher o formulário com sucesso', async () => {
        const texto = "Aplicação Appium";
        const resultado = await FormPage.preencherFormularioEValidar(texto);
        expect(resultado).toBe(texto);
        driver.pause(1000);
    });

    it('validar a seleção do dropdown', async () => {
        let randomNumber = Math.floor(Math.random() * 3) + 1;
        // let randomNumber = 1; //coloque um número fixo para testar cada opção do dropdown
        await FormPage.selecionarOpcaoDropdown(randomNumber);
        switch(randomNumber) {
            case 1:
                expect(await FormPage.validarDropdown()).toBe("Appium is awesome");
                break;
            case 2:
                expect(await FormPage.validarDropdown()).toBe("webdriver.io is awesome");
                break;
            case 3:
                expect(await FormPage.validarDropdown()).toBe("This app is awesome");
                break;
        }
        driver.pause(1000);
    });

    it('Deve mudar o switch com arrasto', async () => {
        // switch ON
        await driver.action('pointer')
            .move({ duration: 0, x: 140, y: 1146 })
            .down({ button: 0 })
            .move({ duration: 1000, x: 277, y: 1146 })
            .up({ button: 0 })
            .perform();
        driver.pause(1000);

        // switch OFF
        await driver.action('pointer')
            .move({ duration: 0, x: 229, y: 1154 })
            .down({ button: 0 })
            .move({ duration: 1000, x: 140, y: 1154 })
            .up({ button: 0 })
            .perform();
        driver.pause(1000);

    });

});