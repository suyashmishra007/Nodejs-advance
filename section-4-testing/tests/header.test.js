const puppeteer = require('puppeteer');

test('Add two numbers',() => {
    const sum =  1 + 2 ;
    expect(sum).toEqual(3);
})


test('We cam launch a browser',async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    
    await page.goto('http://localhost:3000');

    const text = await page.$eval('a.brand-logo',ele => ele.innerHTML)
    expect(text).toEqual('Blogster');

    await browser.close();

})


