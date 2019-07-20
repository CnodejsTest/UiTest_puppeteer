import { Page } from 'puppeteer'
import config from '../config';

export class UserAction{

    /**
     * 注册界面
     */
    public async register(page:Page,username:string,password:string,respassword:string,email:string) {
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

    public async login(page:Page,username:string,password:string){

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
}
