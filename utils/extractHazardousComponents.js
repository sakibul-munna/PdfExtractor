function extractHazardousComponent(text) {
  let extractedText = text.match(/Hazardous components[\s\S]*/);
  let extractedInfo = extractedText ? extractedText[0] : "";
  const rows = extractedInfo.split("\n");

  const result = [];

  for (let i = 2; i < rows.length; i++) {
    const row = rows[i];
    const rowObject = {};

    if (row.trim() === "") {
      continue;
    }

    const chemicalNameRegex = /^([a-zA-Z]+)/;
    const chemicalNameMatch = row.match(chemicalNameRegex);

    const casNoRegex = /\b(\d+-\d+-\d+)\b/;
    const casNoMatch = row.match(casNoRegex);

    const concentrationRegex = /(>=.*)/;
    const concentrationMatch = row.match(concentrationRegex);

    let chemicalName = chemicalNameMatch[0].trim();
    let casNo = casNoMatch[0].trim();
    let concentration = concentrationMatch[0].trim();

    rowObject["chemicalName"] = chemicalName;
    rowObject["casNo"] = casNo;
    rowObject["concentration(%)"] = concentration;

    result.push(rowObject);
  }

  return result;
}

module.exports = extractHazardousComponent;
