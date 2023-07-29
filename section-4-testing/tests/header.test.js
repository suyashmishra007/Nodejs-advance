const puppeteer = require('puppeteer');
const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
const Page = require('./helpers/page');
let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
})

afterEach(async () => {
    await page.close();
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

    const user = await userFactory();

    const {
        session,
        sig
    } = await sessionFactory(user);
    // Set above values on chromium cookie

    const cookies = [{
        'name': 'session',
        'value': session
    }, {
        'name': 'session.sig',
        'value': sig
    }];

    await page.setCookie(...cookies);

    // refresh the page
    await page.goto('http://localhost:3000');

    // await page.waitFor('a[href="/auth/logout"]')

    const text = await page.$eval('a[href="/auth/logout"]', ele => ele.innerHTML)
    expect(text).toEqual('Logout');

})
