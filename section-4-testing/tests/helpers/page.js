const puppeteer = require('puppeteer');


class CustomPage {
    static async build(){

        const browser = await puppeteer.launch({
            headless : true,
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
}

module.exports = CustomPage;
