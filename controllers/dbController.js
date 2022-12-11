
const path = require("path");
let csvToJson = require("convert-csv-to-json");



const getFileData = (fileID) => {
  const fileDir = path.join(__dirname, "..", "StaticData", "");
  const fileNames = [
    "routes.txt",
    "shapes.txt",
    "stop_times.txt",
    "stops.txt",
    "trips.txt",
  ];
  try {
    let fileInputName = path.join(fileDir, fileNames[fileID]);
    let json = csvToJson.getJsonFromCsv(fileInputName);
    return json;
  } catch (err) {
    return { message: err };
  }
};



module.exports={getFileData}