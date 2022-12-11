const {getFileData}=require('./fileController')

const handleLoadCSVFile = (req, res) => {
  const fileID = req.params.fileId;
  //   return res.send(fileID)

  const data = getFileData(fileID);
  res.json(data);
};

const handlePutAllDataToDB = (req, res) => {};

module.exports = { handleLoadCSVFile };
