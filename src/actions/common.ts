
import {Page} from 'puppeteer';

export async function clear(page:Page){
    await page.keyboard.down('Control');
    await page.keyboard.press('a');
    await page.keyboard.up('Control');

    await page.keyboard.press('Backspace');
}