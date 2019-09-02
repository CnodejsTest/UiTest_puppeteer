
import {Page} from 'puppeteer';

export async function clear(page:Page){
    await page.keyboard.down('Control');
    await page.keyboard.press('a');
    await page.keyboard.up('Control');

    await page.keyboard.press('Backspace');
}


export async function findItemByTwoCss(page:Page,css1:string,css2:string,headerName:string){
    await page.waitForSelector(css1);
    const panels = await page.$$(css1);
    const headerNames = await page.$$eval(css2,eles=>eles.map(ele=>ele.textContent))
    console.log("headNames===",headerNames)
    const index = headerNames.findIndex(header=>{
        if (header){
            return header.includes(headerName)
        }
    })
    console.log('index===',index);
    return panels[index]
}