import { Page } from 'puppeteer';
import { clear } from './common'
export class TopicAction {
    // 创建话题
    public async createTopic(page: Page, tab: string, title: string, content: string) {

        await page.select('#tab-value', tab);

        // title
        const titleInput = await page.waitForSelector('#title');
        await titleInput.click();
        await clear(page);
        await titleInput.type(title)

        // content
        const contentArea = await page.waitFor('div.CodeMirror-scroll');
        await contentArea.click();
        await clear(page);
        // await contentArea.type(content);
        await page.keyboard.type(content);

        // submit
        const submitBtn = await page.waitForSelector('input[type="submit"]')
        await submitBtn.click();

    }


    // 修改话题
    public async editTopic(page: Page, tab: string, title: string, content: string) {
        await this.createTopic(page, tab, title, content);
    }

    // 删除话题
    public async delTopic(page: Page) {

        await page.waitForNavigation();

        page.on('dialog', async(dialog)=>{
            console.log("dialog",dialog.message());
            await dialog.accept();
        })

        const delIcon = await page.waitForSelector('a[class="delete_topic_btn"]')
        await delIcon.click();
    }



}

