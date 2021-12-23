// cd 20Oct
// node HackerrankAutomation.js --url=https://www.hackerrank.com --config=config.json 

// npm init -y
// npm install minimist
// npm install puppeteer

let minimist = require("minimist");
let puppeteer = require("puppeteer");
let fs = require("fs");
let args = minimist(process.argv);

let configJSON = fs.readFileSync(args.config, "utf-8");
let config = JSON.parse(configJSON);

async function run(){
    let browser = await puppeteer.launch({
        headless: false,
        args: [
            '--start-maximized'
        ],
        defaultViewport: null
    });
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto(args.url);

    await page.waitForSelector("li#menu-item-2887")
    await page.click("li#menu-item-2887");

    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
    await page.click("a[href='https://www.hackerrank.com/login']");

    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']", config.userid);

    await page.waitForSelector("input[name='password']");
    await page.type("input[name='password']", config.password);

    await page.waitForSelector("button[data-analytics='LoginPassword']");
    await page.click("button[data-analytics='LoginPassword']");

    await page.waitForSelector("a.nav-link.contests");
    await page.click("a.nav-link.contests");

    await page.waitForSelector("a[href='/administration/contests/']")
    await page.click("a[href='/administration/contests/']")
    await page.waitFor(2000);

    // await page.waitForSelector("a.backbone.block-center");
    
}

run();
