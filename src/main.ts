import { UserAction } from './actions/user'
import {Page,launch} from 'puppeteer';

async function run(){
    let browser = await launch({headless:false})
    let page:Page =await browser.newPage();
    let useraction = new UserAction();
    await useraction.login(page,'user1','123456')
}

run();