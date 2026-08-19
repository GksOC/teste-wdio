import LoginPage from '../pageobjects/login.page.js';

describe('Funcionalidade: Login', () => {

    beforeEach(async () => {
        await LoginPage.abrirMenuLogin();
    });

    // it('Deve fazer login com sucesso', async () => {
    //     await $('~Login').click();
    //     await $('~input-email').setValue('teste@teste.com');
    //     await $('~input-password').setValue('senha@123');
    //     await $('~button-LOGIN').click();
        
    //     expect(await $('id=android:id/message')).toBeDisplayed();
    //     await $('id=android:id/button1').click();
    //     await driver.pause(1000);
    // });

    it('Fazer login usando LoginPage', async () => {
        await LoginPage.preencherEmail('teste@teste.com', 'senha@123');
        expect(await LoginPage.verificarMensagemEClicarBotao(true)).toEqual('You are logged in!');
        await driver.pause(1000);
    });

    // it('Deve falhar ao tentar login com email inválido', async () => {
    //     await $('~Login').click();
    //     await $('~input-email').setValue('teste@teste');
    //     await $('~input-password').setValue('senha@123');
    //     await $('~button-LOGIN').click();

    //     const mensagem = await $('//android.widget.TextView[@text="Please enter a valid email address"]');
    //     expect(mensagem).toBeDisplayed();
    //     await driver.pause(5000);
    // });
    it('Deve falhar ao tentar login com email inválido usando LoginPage', async () => {
        await LoginPage.preencherEmail('teste@teste', 'senha@123');
        await LoginPage.verificarMensagemErro('Please enter a valid email address');
        await driver.pause(1000);
    });
});