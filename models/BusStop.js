const { Sequelize, DataTypes, Model } = require("sequelize");

class BusStop extends Model {}

BusStop.modelInit = (sequelize) =>
  BusStop.init(
    {
      stop_id: {
        type: DataTypes.NUMBER,
      },
      stop_code: {
        type: DataTypes.NUMBER,
      },
      stop_name: {
        type: DataTypes.STRING,
      },
      stop_desc: {
        type: DataTypes.STRING,
      },
      stop_lat: {
        type: DataTypes.NUMBER,
      },
      stop_lon: {
        type: DataTypes.NUMBER,
      },
      zone_id: {
        type: DataTypes.NUMBER,
      },
      stop_url: {
        type: DataTypes.STRING,
      },
      location_type: {
        type: DataTypes.NUMBER,
      },
      parent_station: {
        type: DataTypes.STRING,
      },
      stop_timezone: {
        type: DataTypes.STRING,
      },
      wheelchair_boarding: {
        type: DataTypes.STRING,
      },
    },
    { sequelize,}
  );

  module.exports={BusStop}