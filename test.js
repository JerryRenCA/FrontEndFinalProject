const distMarkerAndShapePoint = (pt1, pt2) => {
  return (
    (pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) +
    (pt1[1] - pt2[1]) * (pt1[1] - pt2[1])
  );
};
const find2ClosestPointFromShape = (lat, lon) => {
  const firstK = 2;
  const pointArrT = new Array(firstK); //far to close
  const distArr = new Array(firstK);
  let currLength=0
  const markerPt = [lat, lon];
  for (const aPt of shapePoints) {
    let ltLoc = -1;
    const aDist = distMarkerAndShapePoint(aPt, markerPt);

    for (let i = 0; i < currLength; i++) {
      if (aDist < distArr[i]) {
        ltLoc = i;
      } else {
        break;
      }
    }
    // console.log("bf",aDist,pointArrT,distArr)
    if (currLength == firstK) {
      for (let j = 0; j < ltLoc; j++) {
        pointArrT[j] = pointArrT[j + 1];
        distArr[j] = distArr[j + 1];
      }
      if (ltLoc != -1) {
        pointArrT[ltLoc] = aPt;
        distArr[ltLoc] = aDist;
      }
    } else {
      for (let j = currLength - 1; j > ltLoc; j++) {
        pointArrT[j + 1] = pointArrT[j];
        distArr[j + 1] = distArr[j];
      }
      pointArrT[ltLoc + 1] = aPt;
      distArr[ltLoc + 1] = aDist;
      currLength++
    }
    console.log("bh", aDist, pointArrT, distArr);
  }
  return pointArrT;
};

const shapePoints = [
  [1, 3],
  [1, 4.1],
  [2.6, 6],
  [8, 7.5],
  [4, 4],
  [5, 10],
  [1, 3],
  [4, -1],
  [4, 3],
];

const rzlt = find2ClosestPointFromShape(4, 4);

console.log(rzlt);
