function extractManufacturerInformation(text) {
  const match = text.match(/Manufacturer or supplier's details[\s\S]*/);
  const jsonObject = {};

  if (match) {
    const extractedText = match[0];
    const lines = extractedText.split("\n");
    let currentKey = "";
    let currentValue = "";
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        if (line.includes(":")) {
          if (currentKey) {
            jsonObject[currentKey] = currentValue.trim();
          }
          [currentKey, currentValue] = line.split(":").map((s) => s.trim());
        } else {
          currentValue += " " + line;
        }
      }
    }
    if (currentKey) {
      jsonObject[currentKey] = currentValue.trim();
    }
  }

  return jsonObject;
}

module.exports = extractManufacturerInformation;
