import { exportImages } from "pdf-export-images";

exportImages("sample.pdf", "images")
  .then((images) => console.log("Exported", images.length, "images"))
  .catch(console.error);
