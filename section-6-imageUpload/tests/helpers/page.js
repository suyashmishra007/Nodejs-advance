const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
    static async build(){

        const browser = await puppeteer.launch({
            headless : true,
            args : ['--no-sandbox']
        });

        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage,{
            get : function(target , property){
                return target[property] || browser[page] || page[property]; 
            }
        })
    }

    constructor(page,browser){
        this.page = page;
    }

    async login(){
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
    
        await this.page.setCookie(...cookies);
    
        // refresh the page
        await this.page.goto('http://localhost:3000/blogs');
    
    }

    async getContentsOf(selector){
        const text = await this.page.$eval(selector, ele => ele.innerHTML);
        return text;
    }
}

module.exports = CustomPage;
