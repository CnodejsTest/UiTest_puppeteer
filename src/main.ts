import { UserAction } from './actions/user';
import { TopicAction } from './actions/topic'
import {Page,launch} from 'puppeteer';

async function run(){
    let browser = await launch({headless:false})
    let page:Page =await browser.newPage();
    let useraction = new UserAction();
    let topicAction = new TopicAction();
    await useraction.login(page,'user1','123456');

    await page.goto('http://39.107.96.138:3000/topic/create');
    await topicAction.createTopic(page,'招聘','11111','sssssss');
}

run();