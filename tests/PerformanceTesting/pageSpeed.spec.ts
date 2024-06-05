import { test } from '@playwright/test';
import { excelOperation } from '../../src/utils/excel/excelOperation';
var Excel = require('exceljs');

export interface pageSpeedScore {
    rowNum: number,
    url: string,
    score: {
        performance: number,
        accessibility: number,
        bestPractices: number,
        seo: number,
        dateTime: Date,
    }
}

test('Pagespeed API call for Mobile', async ({ request }) => {
    test.setTimeout(18000000);
    let sheet = "Sheet5";
    var excelOp = new excelOperation(sheet);
    await excelOp.initExcelOp();
    let resultData = await excelOp.getUrlList();

    let strategy = 'mobile';
    const cat1 = "PERFORMANCE";
    const cat2 = "ACCESSIBILITY";
    const cat3 = "BEST_PRACTICES";
    const cat4 = "SEO";
    for (let index = 0; index < resultData.length; index++) {
        const queryParam: string = `key=AIzaSyDlqVOEONZV90Bsy5H04N0VxaNm1a56Ms8&url=${resultData[index].url}&strategy=${strategy}&category=${cat1}&category=${cat2}&category=${cat3}&category=${cat4}`;
        const response = await request.get(`https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?${queryParam}`);
        const respBody = (await response?.json())

        if (response.status() === 200) {
            let score1 = ((respBody?.lighthouseResult?.categories?.performance?.score) as number) * 100
            let score2 = ((respBody?.lighthouseResult?.categories?.accessibility?.score) as number) * 100
            let score3 = ((respBody?.lighthouseResult?.categories?.['best-practices']?.score) as number) * 100;
            let score4 = ((respBody?.lighthouseResult?.categories?.seo?.score) as number) * 100;

            resultData[index].score.performance = score1;
            resultData[index].score.accessibility = score2;
            resultData[index].score.bestPractices = score3;
            resultData[index].score.seo = score4;
            resultData[index].score.dateTime = new Date();

        }
    }

    //  write data to excel
   await excelOp.writeScore(resultData,strategy);

})

test('Pagespeed API call for Desktop', async ({ request }) => {
    test.setTimeout(18000000);
    let sheet = "Sheet5";
    var excelOp = new excelOperation(sheet);
    await excelOp.initExcelOp();
    let resultData = await excelOp.getUrlList();

    let strategy = 'desktop';
    const cat1 = "PERFORMANCE";
    const cat2 = "ACCESSIBILITY";
    const cat3 = "BEST_PRACTICES";
    const cat4 = "SEO";
    for (let index = 0; index < resultData.length; index++) {
        const queryParam: string = `key=AIzaSyDlqVOEONZV90Bsy5H04N0VxaNm1a56Ms8&url=${resultData[index].url}&strategy=${strategy}&category=${cat1}&category=${cat2}&category=${cat3}&category=${cat4}`;
        const response = await request.get(`https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed?${queryParam}`);
        const respBody = (await response?.json())

        if (response.status() === 200) {
            let score1 = ((respBody?.lighthouseResult?.categories?.performance?.score) as number) * 100
            let score2 = ((respBody?.lighthouseResult?.categories?.accessibility?.score) as number) * 100
            let score3 = ((respBody?.lighthouseResult?.categories?.['best-practices']?.score) as number) * 100;
            let score4 = ((respBody?.lighthouseResult?.categories?.seo?.score) as number) * 100;

            resultData[index].score.performance = score1;
            resultData[index].score.accessibility = score2;
            resultData[index].score.bestPractices = score3;
            resultData[index].score.seo = score4;
            resultData[index].score.dateTime = new Date();
        }
    }

    //  write data to excel
   await excelOp.writeScore(resultData,strategy);

})
