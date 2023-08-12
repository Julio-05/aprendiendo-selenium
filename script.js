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

        // Ingresar el correo electrónico o número de teléfono y la contraseña
        await driver.findElement(By.id('email')).sendKeys('el_julio_05_2001@hotmail.com');
        await driver.findElement(By.id('pass')).sendKeys('lolasticul003', Key.RETURN);

        // Esperar un momento para asegurarte de que la página esté cargada (puedes ajustar este tiempo)
        await driver.sleep(5000);

        // Realizar más acciones

        // ... Tus acciones adicionales ...

        // Agregar una prueba Mocha para el inicio de sesión
        mocha.suite.emit('pre-require', global, 'mocha', mocha);
        mocha.suite.emit('require', function () {
            it('Inicio de sesión exitoso', async function () {
                // ... Tu código de prueba ...
                // Por ejemplo, podrías verificar que ciertos elementos estén presentes después del inicio de sesión
            });
        });

        // Capturar capturas de pantalla y realizar más acciones

        // Capturar una captura de pantalla después del inicio de sesión exitoso
        await takeScreenshot(driver, 'screenshot_inicio_sesion.png');

        // Realizar más acciones

        // Capturar otra captura de pantalla después de realizar más acciones

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
    console.log(`Captura de pantalla guardada comooo: ${filename}`);
}

runTest();






// const { Builder, By, Key } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const fs = require('fs');
// const Mocha = require('mocha');
// const Mochawesome = require('mochawesome');

// async function runTest() {
//     const options = new chrome.Options();
//     options.addArguments('--start-maximized');
//     const driver = new Builder()
//         .forBrowser('chrome')
//         .setChromeOptions(options)
//         .build();

//     const mocha = new Mocha();
//     mocha.reporter('mochawesome'); // Use the Mochawesome reporter

//     try {
//         // Abrir la página de Facebook
//         await driver.get('https://www.facebook.com');

//         // Historia 1: Inicio de Sesión Exitoso en Facebook
//         mocha.suite.emit('pre-require', global, 'mocha', mocha);
//         mocha.suite.emit('require', function () {
//             it('Inicio de sesión exitoso en Facebook', async function () {
//                 // Ingresar el correo electrónico y la contraseña
//                 await driver.findElement(By.id('email')).sendKeys('el_julio_05_2001@hotmail.com');
//                 await driver.findElement(By.id('pass')).sendKeys('lolasticul003', Key.RETURN);
//                 // Verificar que la redirección sea exitosa a la página de inicio
//                 // Por ejemplo, verificar que un elemento en el feed esté presente
//                 await takeScreenshot(driver, 'screenshot_inicio_sesion.png');
//             });
//         });

//         // ... Resto de las historias ...

//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         await driver.quit();
//         mocha.run();
//     }
// }

// async function takeScreenshot(driver, filename) {
//     const screenshotData = await driver.takeScreenshot();
//     fs.writeFileSync(filename, screenshotData, 'base64');
//     console.log(`Captura de pantalla guardada como: ${filename}`);
// }

// runTest();


















// const { Builder, By, Key } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const fs = require('fs');
// const Mocha = require('mocha');

// async function runTest() {
//     const options = new chrome.Options();
//     options.addArguments('--start-maximized');
//     const driver = new Builder()
//         .forBrowser('chrome')
//         .setChromeOptions(options)
//         .build();

//     const mocha = new Mocha();
//     mocha.reporter('mochawesome'); // Use the Mochawesome reporter

//     try {
//         // Abrir la página de Facebook
//         await driver.get('https://www.facebook.com');

//         // Ingresar el correo electrónico o número de teléfono y la contraseña
//         await driver.findElement(By.id('email')).sendKeys('el_julio_05_2001@hotmail.com');
//         await driver.findElement(By.id('pass')).sendKeys('lolasticul003', Key.RETURN);

//         // Esperar un momento para asegurarte de que la página esté cargada (puedes ajustar este tiempo)
//         await driver.sleep(5000);

//         // Realizar más acciones

//         // ... Tus acciones adicionales ...

//         // Agregar una prueba Mocha para el inicio de sesión
//         describe('Inicio de sesión exitoso', function () {
//             it('verificar que ciertos elementos estén presentes', async function () {
//                 // ... Tu código de prueba ...
//                 // Por ejemplo, podrías verificar que ciertos elementos estén presentes después del inicio de sesión
//             });
//         });

//         // Capturar capturas de pantalla y realizar más acciones

//         // Capturar una captura de pantalla después del inicio de sesión exitoso
//         await takeScreenshot(driver, 'screenshot_inicio_sesion.png');

//         // Realizar más acciones

//         // Capturar otra captura de pantalla después de realizar más acciones

//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         await driver.quit();

//         // Agregar el informe Mochawesome al final
//         mocha.run();
//     }
// }

// async function takeScreenshot(driver, filename) {
//     const screenshotData = await driver.takeScreenshot();
//     fs.writeFileSync(filename, screenshotData, 'base64');
//     console.log(`Captura de pantalla guardada como: ${filename}`);
// }

// runTest();
