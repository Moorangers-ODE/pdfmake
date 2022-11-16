var fonts = {
  THSarabunNew: {
    normal: "./fonts/THSarabunNew/THSarabunNew.ttf",
    bold: "./fonts/THSarabunNew/THSarabunNew Bold.ttf",
    italics: "./fonts/THSarabunNew/THSarabunNew Italic.ttf",
    bolditalics: "./fonts/THSarabunNew/THSarabunNew BoldItalic.ttf",
  },
};

var PdfPrinter = require("pdfmake");
var printer = new PdfPrinter(fonts);
var fs = require("fs");

var docDefinition = {
  pageMargins: [50, 45, 50, 40],
  pageSize: "A5",
  pageOrientation: "landscape",

  content: [
    // Header
    {
      text: "ใบแจ้งยืนยันการชำระเงิน \n",
      fontSize: 18,
      bold: true,
      alignment: "center",
      decoration: "underline",
    },
    {
      image: "./image/cropped-on-demand-logo-1.png",
      width: 100,
      alignment: "center",
    },
    {
      text: "บริษัท ออนดีมานด์ เอ็ดดูเคชั่น จำกัด \n",
      fontSize: 16,
      bold: true,
      alignment: "center",
    },
    {
      text: [
        "เลขที่ห้อง PLA.F05 D000000 (Zone D) อาคารเอ็ม บี เค ทาวเวอร์ \n",
        "ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330 \n",
        "โทรศัพท์ 02-251-9456 \n\n",
      ],
      fontSize: 12,
      bold: false,
      alignment: "center",
    },
    {
      columns: [
        {
          width: "25%",
          text: "{{OrderNo}}",
          alignment: "left",
        },
        {
          width: "*",
          text: "",
        },
        {
          width: "*",
          text: "",
        },
        {
          width: "25%",
          text: "{{DD / MM / YYYY}}",
          alignment: "right",
        },
      ],
      fontSize: 12,
      bold: false,
    },
    {
      columns: [
        {
          width: "15%",
          text: "{{customerNo.}} \n\n",
          alignment: "left",
        },
        {
          width: "50%",
          text: "{{firstName}} {{lastName}} ",
        },
        {
          width: "*",
          text: "",
        },
        {
          width: "25%",
          text: "{{time}} ",
          alignment: "right",
        },
      ],
      fontSize: 12,
      bold: false,
    },

    // Table
    {
      style: "table",
      table: {
        widths: ["15%", "*", "10%", "10%", "15%"],
        body: [
          [
            { text: "รหัส", bold: true },
            { text: "รายการ", bold: true },
            { text: "จำนวน", bold: true },
            { text: "ส่วนลด", bold: true },
            { text: "เป็นเงิน", bold: true },
          ],
          [
            ["1399"],
            [
              {
                text: "PHYSICS V-SERIES TCAS เล่ม 1-7 For Dek 66",
                alignment: "left",
              },
            ],
            ["1"],
            ["0.00"],
            ["8900.00"],
          ],
          [
            ["3399-S09"],
            [
              {
                text: "PACK เคมี TCAS เล่ม 1 - 5 For Dek 66",
                alignment: "left",
              },
            ],
            ["1"],
            ["0.00"],
            ["8900.00"],
          ],

          [[], [], [], ["รวม"], ["17800.00"]],
        ],
      },
      fontSize: 12,
      bold: false,
      alignment: "center",
      layout: "lightHorizontalLines",
    },
    {
      text: "\n Payment Method: {{paymentInfo}}",
      alignment: "left",
    },
  ],
  defaultStyle: {
    font: "THSarabunNew",
  },
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("receipt-payment.pdf"));
pdfDoc.end();
