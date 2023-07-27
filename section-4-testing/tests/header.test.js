const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');

let browser , page ;

beforeEach(async ()=>{
    browser = await puppeteer.launch({headless : true});
    page = await browser.newPage({});
    
    await page.goto('http://localhost:3000');
})

afterEach(async ()=>{
    await browser.close();
})

test('Header has a correct text', async () => {
    const text = await page.$eval('a.brand-logo',ele => ele.innerHTML)
    expect(text).toEqual('Blogster');
})

test('Clicking login starts oauth flow',async () => {
    await page.click('.right a');
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/);
})

test('When signed in , shows logout button', async ()=>{

    const { session , sig } = sessionFactory();

    // Set above values on chromium cookie
    await page.setCookie( { name : 'session' , value : session});
    await page.setCookie( { name : 'session.sig' , value : sig});

    // refresh the page
    await page.goto('http://localhost:3000');   

    // await page.waitFor('a[href="/auth/logout"]')

    const text = await page.$eval('a[href="/auth/logout"]', ele => ele.innerHTML)
    expect(text).toEqual('Logout');

})
