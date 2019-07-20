import {Page} from 'puppeteer';

export class TopicAction{

    public async createTopic(page:Page,tab:string,title:string,content:string){

        const tabOption = await page.waitForSelector('#tab-value');
        await tabOption.click();

        // 根据tab文本定位元素
        const allOption = await page.$$('#tab-value > option');
        const allOptionVal = await page.$$eval('#tab-value > option',eles=>(eles.map(ele=>ele.textContent)));
        const index = allOptionVal.findIndex(t=>t==tab);
        if(index>0){
            await allOption[index].click();
        }

        // title
        const titleInput = await page.waitForSelector('#title');
        await titleInput.type(title)

        // content
        const contentArea = await page.waitFor('div.CodeMirror-scroll');
        await contentArea.click();
        await contentArea.type(content);

        // submit
        const submitBtn = await page.waitForSelector('input[type="submit"]')
        await submitBtn.click();

    }
}

