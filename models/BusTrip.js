const { Sequelize, DataTypes, Model } = require("sequelize");

class BusTrip extends Model {}

BusTrip.modelInit = (sequelize) => {
  BusTrip.init(
    {
      route_id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      service_id: {
        type: DataTypes.NUMBER,
      },
      trip_id: {
        type: DataTypes.NUMBER,
      },
      trip_headsign: {
        type: DataTypes.STRING,
      },
      trip_short_name: {
        type: DataTypes.STRING,
      },
      direction_id: {
        type: DataTypes.NUMBER,
      },
      block_id: {
        type: DataTypes.NUMBER,
      },
      shape_id: {
        type: DataTypes.NUMBER,
      },
      wheelchair_accessible: {
        type: DataTypes.NUMBER,
      },
      bikes_allowed: {
        type: DataTypes.NUMBER,
      },
    },
    {
      sequelize,
      modelName: "BusTrip",
    }
  );
};
