"user strict";

// points on map:
// [1,2]
// [4,3]

export default class gameLogic {
  static checkInside(polygon, point) {
    // first point's lat
    const startPolyLat = polygon[0].latitude;
    // third point's lat
    const endPolyLat = polygon[2].latitude;
    // first point's long
    const startPolyLong = polygon[0].longitude;
    // third point's long
    const endPolyLong = polygon[2].longitude;

    return (
      point.latitude < startPolyLat &&
      point.latitude > endPolyLat &&
      point.longitude > startPolyLong &&
      point.longitude < endPolyLong
    );
  }
}
