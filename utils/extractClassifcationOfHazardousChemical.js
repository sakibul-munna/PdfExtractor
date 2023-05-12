function extractClassifcationOfHazardousChemical(text) {
  const match = text.match(
    /Classification of the hazardous chemical[\s\S]*?(?=Label elements)/
  );
  const jsonObject = {};

  if (match) {
    const extractedText = match[0];
    const result = extractedText.replace(/^\s*\n/gm, "");
    const lines = result.split("\n");

    let currentValue = "";
    let currentKey = "";
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.includes(":") && line.includes("Category")) {
        currentValue += line;
        currentValue = currentValue
          .replace(/[\s:;]+Category/, "Category")
          .trim();
        jsonObject[currentKey] = currentValue;
        currentKey = "";
        currentValue = "";
        continue;
      } else {
        currentKey += line;
      }
    }
  }

  return jsonObject;
}

module.exports = extractClassifcationOfHazardousChemical;
