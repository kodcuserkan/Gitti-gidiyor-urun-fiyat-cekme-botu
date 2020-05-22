const puppeteer = require('puppeteer');
require('dotenv').config();

const username = process.env.GG_USER_NAME;
const password = process.env.GG_USER_PSWRD;

(async () => {

    try {

        const browser = await puppeteer.launch({
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        });
        const page = await browser.newPage();
        await page.goto('https://www.gittigidiyor.com/uye-girisi?url=%2F', { delay: 1150 });
        await page.type('#L-UserNameField', username, { delay: 50 });
        await page.type('#L-PasswordField', password, { delay: 30 });

        await Promise.all([
            page.waitForNavigation(),
            page.click('#gg-login-enter')
        ]);

        await Promise.all([
            page.waitForNavigation(),
            page.goto('https://www.gittigidiyor.com/apple-iphone-11-pro-max_spp_733278?renk=Yeşil&dahili-hafiza=256+GB', { delay: 150 })
        ]);

        const data = await page.evaluate(() => {
            
            let fiyat = document.querySelector('#sp-price-highPrice').innerHTML;
            fiyat = parseFloat(fiyat.replace('TL','').replace('.',""));
            return fiyat;

        });

        console.log("Fiyat : ", data);

        await page.screenshot({ path: 'result.png' });

        await browser.close();

    } catch (error) {
        console.log("Ereor: ", error);
    }

})();