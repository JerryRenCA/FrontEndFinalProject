const { Sequelize, DataTypes, Model } = require("sequelize");

class BusStopTime extends Model {}

BusStopTime.modelInit = (sequelize) => {
  BusStopTime.init(
    {
      trip_id: {
        type: DataTypes.NUMBER,
        // primaryKey: true,
      },
      arrival_time: {
        type: DataTypes.STRING,
      },
      departure_time: {
        type: DataTypes.STRING,
      },
      stop_id: {
        type: DataTypes.NUMBER,
      },
      stop_sequence: {
        type: DataTypes.NUMBER,
      },
      stop_headsign: {
        type: DataTypes.STRING,
      },
      pickup_type: {
        type: DataTypes.NUMBER,
      },
      drop_off_type: {
        type: DataTypes.NUMBER,
      },
      shape_dist_traveled: {
        type: DataTypes.NUMBER,
      },
    },
    { sequelize }
  );
};

module.exports={BusStopTime}