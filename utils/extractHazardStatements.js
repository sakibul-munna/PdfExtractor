function extractHazardStatements(text) {
  const matchedText = text.match(
    /Hazard statements[\s\S]*?(?=Precautionary statements)/
  );

  const hazardStatementsRegex = /H\d+/g;
  const hazardStatementsMatch = Array.from(
    matchedText[0].matchAll(hazardStatementsRegex),
    (match) => match[0]
  );

  return hazardStatementsMatch;
}

module.exports = extractHazardStatements;
