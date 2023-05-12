const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const pdfParse = require("pdf-parse");
const app = express();
const port = 3003;
const deleteAllFilesOfUploadFolder = require("./utils/deleteAllFiles");
const getManufacturerInformation = require("./utils/extractManufacturersInformation");
const getClassifcationOfHazardousChemical = require("./utils/extractClassifcationOfHazardousChemical");
const getHazardStatements = require("./utils/extractHazardStatements");
const getHazardousComponents = require("./utils/extractHazardousComponents");

const fs = require("fs");

async function extractPdfData(pdfFilePath) {
  const pdfFile = fs.readFileSync(pdfFilePath);
  const data = await pdfParse(pdfFile);

  const section1StartIndex = data.text.indexOf("SECTION 1");
  const section1EndIndex = data.text.indexOf("SECTION 2");
  const section2StartIndex = data.text.indexOf("SECTION 2");
  const section2EndIndex = data.text.indexOf("SECTION 3");
  const section3StartIndex = data.text.indexOf("SECTION 3");
  const section3EndIndex = data.text.indexOf("SECTION 4");

  let section1Text = data.text.slice(section1StartIndex, section1EndIndex);
  let section2Text = data.text.slice(section2StartIndex, section2EndIndex);
  let section3Text = data.text.slice(section3StartIndex, section3EndIndex);

  const productNameRegex = /Product name\s*:\s*(.*)/;
  const productCodeRegex = /Product code\s*:\s*(.*)/;
  const productTypeRegex = /Type of product\s*:\s*(.*)/;

  const signalWordsRegex = /Signal word\s*:\s*(.*)/;

  const substanceMixtureRegex = /Substance \/ Mixture\s*:\s*(.*)/;
  const chemicanNatureRegex = /Chemical nature\s*:\s*(.*)/;

  const productNameMatch = section1Text.match(productNameRegex);
  const productCodeMatch = section1Text.match(productCodeRegex);
  const productTypeMatch = section1Text.match(productTypeRegex);
  const manufacturerInformation = getManufacturerInformation(section1Text);

  const classifcationOfHazardousChemical =
    getClassifcationOfHazardousChemical(section2Text);
  const signalWordMatch = section2Text.match(signalWordsRegex);

  const substanceMatch = section3Text.match(substanceMixtureRegex);
  const chemicalNatureMatch = section3Text.match(chemicanNatureRegex);
  const hazardousComponentArray = getHazardousComponents(section3Text);

  const jsonObject = {
    productName: productNameMatch[1].trim(),
    productCode: productCodeMatch[1].trim(),
    productType: productTypeMatch[1].trim(),
    manufacturerInformation: manufacturerInformation,
    classifcationOfHazardousChemical: classifcationOfHazardousChemical,
    signalWord: signalWordMatch[1].trim(),
    hazardStatements: getHazardStatements(section2Text),
    substance: substanceMatch[1].trim(),
    chemicalNature: chemicalNatureMatch[1].trim(),
    hazardousComponents: hazardousComponentArray,
  };

  return jsonObject;
}

app.get("/", (req, res) => {
  res.send("This is an amazing app to extract information");
});

app.post("/pdf", upload.single("pdf"), async (req, res) => {
  const jsonArray = await extractPdfData(req.file.path);

  if (jsonArray.length > 0 && jsonArray) {
    console.log("Here Bro");
    deleteAllFilesOfUploadFolder();
  }

  // Once you have extracted the data, you can send the JSON array as a response
  res.json(jsonArray);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
