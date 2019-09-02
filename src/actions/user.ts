import { Page } from 'puppeteer'
import config from '../config';
import { findItemByTwoCss } from './common'

export class UserAction {

    /**
     * 注册界面
     */
    public async register(page: Page, username: string, password: string, respassword: string, email: string) {
        await page.goto(config.url);

        const registLink = await page.waitForSelector('a[href="/signup"]');
        await registLink.click();

        const userIput = await page.waitForSelector('#loginname');
        await userIput.type(username);
        const passwdInput = await page.waitForSelector('#pass');
        await passwdInput.type(password);
        const repasswdInput = await page.waitForSelector('#re_pass');
        await repasswdInput.type(respassword);
        const emailInput = await page.waitForSelector('#email');
        await emailInput.type(email);

        const registBtn = await page.waitForSelector('input[type="submit"]');
        await registBtn.click();


    }

    public async login(page: Page, username: string, password: string) {

        await page.goto(config.url);
        const loginLink = await page.waitForSelector('a[href="/signin"]');
        await loginLink.click();

        const usernameInput = await page.waitForSelector('#name');
        await usernameInput.type(username);

        const passwordInput = await page.waitForSelector('#pass');
        await passwordInput.type(password);

        const loginBtn = await page.waitForSelector('input[type="submit"]');
        await loginBtn.click();
    }


    public async navToTabByName(page: Page, tabName: string) {
        const css = 'div[class="header"] > a.topic-tab';

        await page.waitForSelector(css);
        const allTab = await page.$$(css);
        const allTabText = await page.$$eval(css, eles => eles.map(ele => ele.textContent));
        const index = allTabText.findIndex(t => {
            t = t ? t : '';
            return t.includes(tabName);
        })

        if (index < 0) {
            throw new Error(`找不到元素${tabName}，请检查拼写, 页面上元素值为 ${allTabText}`)
        }

        const tab = allTab[index];
        await tab.click();

    }


    // 到达个人中心页面
    public async goToUserCenter(page: Page) {
        const userAvatar = await page.waitForSelector('a[class="user_avatar"]');
        await userAvatar.click();

    }


    // 个人中心页面 找到己创建的话题
    public async findTopicByName(page: Page, name: string) {
        const css1 = 'div[id="content"] > div.panel'
        const css2 = 'div[id="content"] > div.panel >div[class="header"]'
        const panle = await findItemByTwoCss(page,css1,css2,'最近创建的话题');

        const cells = await panle.$$('div[class="cell"] a[class="topic_title"]');
        const cellTitles = await panle.$$eval('div[class="cell"] a[class="topic_title"]',eles=>eles.map(ele=>ele.textContent))
        console.log('cellTitles',cellTitles);
        const index = cellTitles.findIndex(cell => {
            if(cell){
                return cell.includes(name)
            }
        })
        console.log('index == ',index)
        if(index == -1 ) throw new Error(`找不到元素${name}`);
     
        return cells[index];
    }


}
