const { Sequelize, DataTypes, Model } = require("sequelize");

class BusRoute extends Model {}

BusRoute.model_init = (sequelize) =>
  BusRoute.init(
    {
      route_id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      agency_id: {
        type: DataTypes.NUMBER,
      },
      route_short_name: {
        type: DataTypes.STRING,
      },
      route_long_name: {
        type: DataTypes.STRING,
      },
      route_desc: {
        type: DataTypes.STRING,
      },
      route_type: {
        type: DataTypes.STRING,
      },
      route_url: {
        type: DataTypes.STRING,
      },
      route_color: {
        type: DataTypes.STRING,
      },
      route_text_color: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "BusRoute",
    }
  );

module.exports = { BusRoute };
