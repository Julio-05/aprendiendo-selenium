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
    mocha.reporter('mochawesome'); // Use the Mochawesome reporter

    try {
        // Abrir la página de Facebook
        await driver.get('https://www.facebook.com');

        // Tomar captura de pantalla del inicio del login
        await takeScreenshot(driver, 'screenshot_inicio.png');

        // Ingresar el correo electrónico o número de teléfono y la contraseña
        await driver.findElement(By.id('email')).sendKeys('el_julio_05_2001@hotmail.com');
        await driver.findElement(By.id('pass')).sendKeys('lolasticul003', Key.RETURN);

        // Esperar un momento para asegurarte de que la página esté cargada
        await driver.sleep(5000);

        await takeScreenshot(driver, 'screenshot_inicio_sesion.png');

        // Realizar la búsqueda
        const searchInput = await driver.findElement(By.css('input[aria-label="Buscar en Facebook"]'));
        await searchInput.sendKeys('Natanael Florentino', Key.RETURN);

        // Esperar a que los resultados de búsqueda se carguen
        await driver.sleep(3000);

        // Hacer clic en el resultado de búsqueda
        await driver.findElement(By.linkText('Natanael Florentino')).click();

        // Esperar a que el perfil de la persona buscada se cargue
        await driver.sleep(5000);

        // Tomar captura de pantalla del perfil del amigo
        await takeScreenshot(driver, 'screenshot_perfil_amigo.png');

        // Aquí puedes realizar más acciones en el perfil de la persona buscada

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();

        // Agregar el informe Mochawesome al final
        mocha.run();
    }
}

async function takeScreenshot(driver, filename) {
    const screenshotData = await driver.takeScreenshot();
    fs.writeFileSync(filename, screenshotData, 'base64');
    console.log(`Captura de pantalla guardada como: ${filename}`);
}

runTest();
