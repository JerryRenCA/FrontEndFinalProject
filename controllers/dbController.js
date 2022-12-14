const { getFileData } = require("./fileController");
const {
  sequelize,
  BusRoute,
  BusStopTime,
  BusTransitShape,
  BusStop,
  BusTrip,
} = require("./initModels");

// just for initial the database
// get data from csv files, and put them into database

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const loadDataFromFileToDB = async () => {
  //Warning: this method only for initial database.
  console.log(
    "Danger operation! Initialing database. This operation will be terminated before revise code."
  );
  return "Error!";// Danger Zone: comment it will initial database!!!!
  return "Again"

  //Danger Zone: run command below will initial database.// Disable it once put csv files to database!
  await sequelize.sync({ force: true });

  await getFileData(0).forEach(async (d) => {
    const aBusRoute = new BusRoute();
    Object.assign(aBusRoute, d);
    await aBusRoute.save();
  });

  let loopTables = async (fileID, BusModel) => {
    let data = await getFileData(fileID);
    while (data.length > 0) {
      await delay(10000); //delay 10 sec is for letting sqlite finish those inserting commands, otherwise sqlite will crash.
      console.log(data.length);
      const partData = data.splice(0, 10000); //10000 rows insert at one batch, same reason as above.
      partData.forEach(async (d) => {
        const aBusStopTime = new BusModel();
        Object.assign(aBusStopTime, d);
        try {
          await aBusStopTime.save();
        } catch (err) {
          // console.error(err);
        }
      });
    }
  };
  // const fileNames = ["routes.txt","shapes.txt","stop_times.txt","stops.txt","trips.txt",];
  await loopTables(1, BusTransitShape);
  await loopTables(2, BusStopTime);
  await loopTables(3, BusStop);
  await loopTables(4, BusTrip);
};



module.exports = { loadDataFromFileToDB };
