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
  pageMargins: [10, 20, 10, 10],
  pageSize: {
    width: 300,
    height: "auto",
  },

  content: [
    {
      image: "./image/cropped-on-demand-logo-1.png",
      width: 200,
      alignment: "center",
    },
    {
      text: "\n",
    },
    {
      image: "./image/prompay-logo.png",
      width: 100,
      alignment: "center",
    },
    {
      image: "./image/qrcode.png",
      width: 200,
      alignment: "center",
    },
    // {
    //   images: qrcode,
    // },
    {
      text: "บริษัท ออนดีมานด์ เอ็ดดูเคชั่น จำกัด \n",
      fontSize: 18,
      bold: true,
      alignment: "center",
    },
    {
      text: [
        "ชื่อ-นามสกุล อัศจรรย์ ช้างทอง \n",
        "รหัสชำระเงิน (Payment Code/Ref.1) 4000004670 \n",
        "รหัสนักเรียน (Student ID/Ref.2) 6000038099 \n",
      ],
      fontSize: 16,
      bold: false,
      alignment: "center",
    },
    {
      text: "จำนวนเงิน 17800.00 บาท \n\n",
      fontSize: 16,
      bold: true,
      alignment: "center",
    },
  ],

  defaultStyle: {
    font: "THSarabunNew",
  },
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("qrcode.pdf"));
pdfDoc.end();
