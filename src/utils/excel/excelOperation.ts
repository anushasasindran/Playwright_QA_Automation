import { pageSpeedScore } from "../../../tests/PerformanceTesting/pageSpeed.spec";
import * as path from "path";
var Excel = require("exceljs");

export class excelOperation {
  sheet: string;
  workbook: any;
  worksheet: any;
  filePath1: string;

  constructor(sheet: string) {
    this.sheet = sheet;
  }

  async initExcelOp() {
    let name = __dirname;
    this.filePath1 = path.resolve(
      name.substr(0, name.lastIndexOf("/") + 1),
      "TestData\\WAC_Partner_Priority_Test.xlsx"
    );
    this.workbook = new Excel.Workbook();
    await this.workbook.xlsx.readFile(this.filePath1);
    this.worksheet = this.workbook.getWorksheet(this.sheet);
  }

  async getUrlList() {
    let resultData: pageSpeedScore[] = [];
    for (let i = 3; i <= this.worksheet.rowCount; i++) {
      let url = this.worksheet?.getRow(i).getCell(3).value;
      if (url && url.toString().startsWith("https")) {
        resultData.push({
          rowNum: i,
          url: url.toString(),
          score: {
            performance: 0,
            accessibility: 0,
            bestPractices: 0,
            seo: 0,
            dateTime: new Date(),
          },
        });
      }
    }
    return resultData;
  }

  async writeScore(resultData, strategy) {
    for (let index = 0; index < (await resultData).length; index++) {
      if (strategy === "mobile") {
        this.worksheet.getCell(`I${resultData[index].rowNum}`).value =
          resultData[index].score.performance;
        this.worksheet.getCell(`J${resultData[index].rowNum}`).value =
          resultData[index].score.accessibility;
        this.worksheet.getCell(`K${resultData[index].rowNum}`).value =
          resultData[index].score.bestPractices;
        this.worksheet.getCell(`L${resultData[index].rowNum}`).value =
          resultData[index].score.seo;
        let date = resultData[index].score.dateTime;
        let options = { timeZone: "America/Chicago" };
        let CSTtime = date.toLocaleString("en-US", options);
        this.worksheet.getCell(`M${resultData[index].rowNum}`).value = CSTtime;
      } else if (strategy === "desktop") {
        this.worksheet.getCell(`D${resultData[index].rowNum}`).value =
          resultData[index].score.performance;
        this.worksheet.getCell(`E${resultData[index].rowNum}`).value =
          resultData[index].score.accessibility;
        this.worksheet.getCell(`F${resultData[index].rowNum}`).value =
          resultData[index].score.bestPractices;
        this.worksheet.getCell(`G${resultData[index].rowNum}`).value =
          resultData[index].score.seo;
        let date = resultData[index].score.dateTime;
        let options = { timeZone: "America/Chicago" };
        let CSTtime = date.toLocaleString("en-US", options);
        this.worksheet.getCell(`H${resultData[index].rowNum}`).value = CSTtime;
      }
    }
    this.workbook.xlsx.writeFile(this.filePath1);
  }
}
