const {DataTypes, Model } = require("sequelize");

class BusTransitShape extends Model {}

BusTransitShape.modelInit = (sequelize) =>{
  //;;;;
  BusTransitShape.init(
    {
      shape_id: {
        type: DataTypes.NUMBER,
      },
      shape_pt_lat: {
        type: DataTypes.NUMBER,
      },
      shape_pt_lon: {
        type: DataTypes.NUMBER,
      },
      shape_pt_sequence: {
        type: DataTypes.NUMBER,
      },
      shape_dist_traveled: {
        type: DataTypes.NUMBER,
      },
      route_type: {
        type: DataTypes.STRING,
      },
      route_url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
    }
  )};

module.exports = { BusTransitShape };
