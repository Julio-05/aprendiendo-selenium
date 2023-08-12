const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const Mocha = require('mocha');
const Mochawesome = require('mochawesome');

async function runTest() {
    const options = new chrome.Options();
    options.addArguments('--start-maximized');
    const driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    const mocha = new Mocha();
    mocha.reporter('mochawesome'); 

    try {
        // Abrir la página de Facebook
        await driver.get('https://www.facebook.com');

        // captura de pantalla del inicio del login
        await takeScreenshot(driver, 'screenshot_inicio.png');

        // Ingresar el correo electrónico  y la contraseña
        await driver.findElement(By.id('email')).sendKeys('el_julio_05_2001@hotmail.com');
        await driver.findElement(By.id('pass')).sendKeys('lolasticul003', Key.RETURN);

        await driver.sleep(5000);

        await takeScreenshot(driver, 'screenshot_inicio_sesion.png');

        // Realizar la búsqueda
        const searchInput = await driver.findElement(By.css('input[aria-label="Buscar en Facebook"]'));
        await searchInput.sendKeys('Natanael Florentino', Key.RETURN);

        
        await driver.sleep(3000);

        // Hacer clic en el resultado de búsqueda
        await driver.findElement(By.linkText('Natanael Florentino')).click();

        
        await driver.sleep(5000);

        // Tomar captura de pantalla del perfil del amigo
        await takeScreenshot(driver, 'screenshot_perfil_amigo.png');


    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();

        mocha.run();
    }
}

async function takeScreenshot(driver, filename) {
    const screenshotData = await driver.takeScreenshot();
    fs.writeFileSync(filename, screenshotData, 'base64');
    console.log(`Captura de pantalla guardada como: ${filename}`);
}

runTest();
