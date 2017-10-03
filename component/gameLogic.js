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

  // uses Haversine Formula to calculate the shortest distance
  // http://www.movable-type.co.uk/scripts/latlong.html
  static calculateDistance(current, target) {

    const lat1 = current.latitude
    const lon1 = current.longitude

    const lat2 = target.latitude;
    const lon2 = target.longitude;

    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
              ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance; // in meters
  }
}

// const current = {longitude: -74.0057680395924, latitude: 40.70858177153995}
// const target = {longitude: -74.0040180395924, latitude: 40.709331771539944}

// console.log(gameLogic.calculateDistance(current, target));
