import DragPage from '../pageobjects/drag.page.js';

describe('Funcionalidade: Tela de Quebra-Cabeça (drag)', () => {

    beforeEach(async () => {
        await DragPage.abrirMenuDrag();
    });

    afterEach(async () => {
        await browser.relaunchActiveApp();
    });

    it('Deve construir o quebra-cabeça', async () => {
        await DragPage.pegarArrastar({di: 0, xi: 958, yi: 1889}, {df: 1000, xf: 754, yf: 768});
        await DragPage.pegarArrastar({di: 0, xi: 615, yi: 1864}, {df: 1000, xf: 531, yf: 581});
        await DragPage.pegarArrastar({di: 0, xi: 729, yi: 2065}, {df: 1000, xf: 358, yf: 992});
        await DragPage.pegarArrastar({di: 0, xi: 567, yi: 2059}, {df: 1000, xf: 355, yf: 545});
        await DragPage.pegarArrastar({di: 0, xi: 299, yi: 1878}, {df: 1000, xf: 763, yf: 989});
        await DragPage.pegarArrastar({di: 0, xi: 844, yi: 1903}, {df: 1000, xf: 497, yf: 970});
        await DragPage.pegarArrastar({di: 0, xi: 372, yi: 2051}, {df: 1000, xf: 503, yf: 782});
        await DragPage.pegarArrastar({di: 0, xi: 124, yi: 1872}, {df: 1000, xf: 330, yf: 788});
        await DragPage.pegarArrastar({di: 0, xi: 435, yi: 1883}, {df: 1000, xf: 740, yf: 573});
        await driver.pause(1000);
        await DragPage.validarBotão("Retry");
        await driver.pause(1000);
    });
});