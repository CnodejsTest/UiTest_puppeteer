import { UserAction } from './actions/user';
import { TopicAction } from './actions/topic'

import { Page, launch } from 'puppeteer';

async function run() {
    let browser = await launch({ headless: false, slowMo: 100 , defaultViewport:{width:1366,height:700}})
    let page: Page = await browser.newPage();
    let useraction = new UserAction();
    let topicAction = new TopicAction();
    await useraction.login(page, 'user1', '123456');
    await page.waitFor(3 * 1000);

    // await page.goto('http://39.107.96.138:3000/topic/create');
    // await topicAction.createTopic(page,'ask','11111','sssssss');

    // await page.goto('http://39.107.96.138:3000/topic/5d67b526692231084ca27cfb/edit');
    // await topicAction.editTopic(page, 'ask', 'helloworld', '12311231312312312')
    // await page.goto('http://39.107.96.138:3000');
    // await useraction.navToTabByName(page,'招聘')
    // await useraction.navToTabByName(page,'分享')

    await useraction.goToUserCenter(page);
    const topic = await useraction.findTopicByName(page,'helloworld')
    await topic.click();
}

run();