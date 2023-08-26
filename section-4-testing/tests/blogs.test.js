const Page = require('./helpers/page');
let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
})

afterEach(async () => {
    await page.close();
})

// ! TODO: TESTING PENDING
// describe('When logged in', () => {
//     beforeEach(async() => {
//         await page.login();
//         await page.click('a.btn-floating');
//     });

//     test('Can see blog create form', async () => {
//         const label = await page.getContentsOf('form label');
//         expect(label).toEqual('Blog Title');
//     })
//     describe('And using valid inputs',async()=>{
//         beforeEach( async ()=>{
//             // await page.type('#mytextarea', 'Hello');
//             await page.type('.title .input','Testing title')
//             await page.type('.content .content','Testing Content');
//             await page.click('form button');
//         });
//         test('Submitting takes user to review screen', async ()=>{
//             const text = await page.getContentsOf('h5');
//             expect(text).toEqual('Please confirm your entries')
//         })
//         test('Submitting than saving adds blog to index page', async ()=>{
//             await page.click('btn.green');
//             await page.waitFor('.card');

//             const title = await page.getContentsOf('.card-title');
//             const content = await page.getContentsOf('p');
             
//             expect(title).toEqual('Testing title')
//             expect(content).toEqual('Testing Content')
//         })
//     })
//     describe('And using invalid inputs',async () => {
//         beforeEach(async()=>{
//             await page.click('form button')
//         });
//         test('the form shows an error message', async () => {
//             const titleError = await page.getContentsOf('.title .red-text');
//             const contentError = await page.getContentsOf('.content .red-text');

//             expect(titleError).toEqual('You must provide a value')
//             expect(contentError).toEqual('You must provide a value')
//         })
//     })
// })
