import SwipePage from '../pageobjects/swipe.page.js';

describe('Funcionalidade: Tela de Swipe', () => {

    beforeEach(async () => {
        await SwipePage.abrirMenuSwipe();
    });

    afterEach(async () => {
        await driver.back();
        await driver.pause(1000);
    });

    it('Vasculhar todo o carrossel', async () => {
        await driver.pause(1000);
        let n = 3
        for (let i = 0; i < n; i++) {
            await SwipePage.arrastarCarrossel();
        }
        await SwipePage.verificaCard(n);
    });

    it('Vasculhar toda a tela', async () => {
        await SwipePage.arrastarTela();
        await SwipePage.arrastarTela();
        await SwipePage.verificarIcon();
    });

});