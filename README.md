# Configuração do Ambiente e Ferramentas
Após separar um repositório GIT dedicado (com o .gitignore configurado no modo Node),
no site [Getting Started | WebdriverIO](https://webdriver.io/docs/gettingstarted/), vamos seguir as instruções.
`npm init wdio@latest .`
Durante a instalação, vamos escolher as opções:
`E2E Testing - of web or Mobile Applications`
`On my local machine`
`Mobile - native, hybrid and mobile web apps, on Android or iOS`
`Android - native, hybrid and mobile web apps, tested on emulators` (...)
`Mocha (https://mochajs.org/)`
Do you want to use Typescript to write tests? `No` (vamos usar JS mesmo)
Do you want WebdriverIO to autogenerate some test files? `Yes` (para ver exemplos)
What should be the location of your spec files? `apenas aperte Enter (padrão)`
Do you want to use page objects? `Yes`
Where are your page objects located? `apenas aperte Enter (padrão)`
Which reporter do you want to use? `use espaço para selecionar opções (opcional)`
Do you want to add a plugin to your test setup? `apenas aperte Enter (padrão)`
Would you like to include Visual Testing to your setup? `No`
Do you want to add a service to your test setup? `Appium`
Do you want me to run "npm install"? `Yes`
Continue with Appium setup using appium-installer? `Yes, mesmo configurado, podemos utilizar isso para garantir que as coisas estão prontas`
Marque sempre `Both` para ter o máximo de abrangência.

Para garantir, instale o ChromeDriver da seguinte forma:
`npm install chromedriver --save-dev --legacy-peer-deps`

No Android Studio, vamos obter as informações necessárias para preencher os campos `cababilities` no arquivo `wdio.conf.js` que foi gerado automaticamente após a instalação do wdio. Vamos trocar o nome, versão do Android para aquele que aparece no dispositivo no *Device Manager*
```JavaScript
capabilities: [{
        // Configurações para aplicação híbrida
        platformName: 'Android',
        browserName: 'Chrome',
        'appium:deviceName': 'nightwatch-android-11',
        'appium:platformVersion': '11.0',
        'appium:automationName': 'UiAutomator2',
        'appium:chromedriverAutodownload': true
    }],
```
também configure:
```JavaScript
services: [
        ['appium', {
            args: {
                address: '127.0.0.1',
                port: 4723,
                allowInsecure: '*:chromedriver_autodownload'
            },
            logPath: './'
        }]
    ],
```
Escreva `appium` no terminal para abri-lo.
Em outro terminal, digite a inicialização *(detalhada no package.json)*: `npm run wdio`
Se por algum raio de motivo não funcionar, use o comando:
`npm i --save-dev appium` e tente novamente.

Crie o arquivo "teste-app.e2e.js" dentro de `\test\specs\`
No arquivo escreva "describe", aperte CTRL + ESPAÇO e selecione o snippet do Mocha (plugin ES6) para auto-completar. Coloque o tíutlo do teste, depois o mesmo com "it" para definir os passos.
Para que o aplicativo não se feche automaticamente ao abrir devido à ausência de instruções, vamos colocar um `await driver.pause(5000);`para pausar por 5 segundos

# Estruturação e Implementação de Testes Automatizados
Primeiro vamos criar um arquivo \test\specs\*login.spec.js* e o \test\pageobjects\*login.page.js*
Com o dispositivo conectado no Appium Inspector, podemos obter os elementos em cena na tela do celular.
### Specs
Olhando na descrição do elemento selecionado, temos o "accessibility id". Essa é a referência que vamos utilizar para automatizar os comandos nos testes.
Para fazer teste de validação colocaremos: 
`expect( await $('id=<elemento>')).toBeDisplayed()` 

Adendo: quando o elemento não é do tipo "accessbility id" ele precisa ser declarado explicitamente, até mesmo se ele for somente "id"

Lembre-se de verificar se o teste finaliza com a exibição de algum modal de configuração para não interromper o teste seguinte.

exemplo para primeira linha --> `accessibility id: Login`
```JavaScript
describe('Funcionalidade: Login', () => {
    it('Deve fazer login com sucesso', async () => {
        await $('~Login').click();
        await $('~input-email').setValue('teste@teste.com');
        await $('~input-password').setValue('senha@123');
        await $('~button-LOGIN').click();
        
        expect(await $('id=android:id/message')).toBeDisplayed();
        await driver.pause(5000);
        await driver.acceptAlert();
    });
});
```
### Pages Objects
Vamos criar uma classe para que ela sirva como parâmetros de referência na hora de criar o script de testes. Isso permitirá que a manutenção seja centralizada e auxiliar na criação de mais testes.
```JavaScript
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

}  

export default new LoginPage();
```
### QoL:
* Usar beforeEach(), otimizar funções para reutilização de código.
* Utilize o código a seguir para executar um único script:
	`npm run wdio -- --spec <diretório>`
* Na raiz do projeto, crie um arquivo `jsconfig.json` com o seguinte conteúdo:
```JSON
{
    "compilerOptions":{
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
        ]
    }
}
```
**Isso permitirá que o código tenha auto-complete auxiliado no IntelliSense!**

# Automação de Interações Avançadas e Boas Práticas
Podemos utilizar um recurso do Appium Inspector para gravar as interações com o aplicativo e obter elementos que foram clicados para agilizar.
Para isso, basta clicar no botão de câmera que fica ao lado da lupa, escolher o elemento na tela espelhada e depois apertar o botão de mira (tap) para confirmar o click.
Também é possível limpar campos de entrada e enviar informações dependendo do tipo de elemento selecionado.
Na categoria "**Recorder**" será possível obter a função equivalente para o script. Não esqueça de configurar o modo para JS/TS - WebdriverIO, que é o método que estamos utilizando para automatizar os testes.
Aproveitando que estamos gravando ações na tela do celular, e quando precisamos registrar um arrasto? Para isto serve o botão "type/swipe by coordinates" com um desenho de uma caixa pontilhada com uma cruz no centro (fazendo uma referência de mira).

