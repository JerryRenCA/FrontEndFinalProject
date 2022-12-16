const { getShapeIDFromTripID } = require("./dataOperate");
const { Op } = require("sequelize");
const {
  sequelize,
  BusRoute,
  BusStopTime,
  BusTransitShape,
  BusStop,
  BusTrip,
} = require("./initModels");

const getShapesFromTripId = async (req, res) => {
  const tripId = req.query.tripId;
  const shapeId = await getShapeIDFromTripID(tripId);
  console.log(shapeId)
  const shapes = await BusTransitShape.findAll({
    attributes: [
      "shape_pt_lat",
      "shape_pt_lon",
      "shape_pt_sequence",
      "shape_dist_traveled"
    ],
    where: { shape_id: { [Op.eq]: shapeId } },
  });
  res.json(shapes);
};

module.exports = { getShapesFromTripId };
