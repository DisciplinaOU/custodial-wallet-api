"use strict";
exports.__esModule = true;
exports.getBearing = exports.coordMetersAway = exports.calculateDistance = void 0;
var EARTH_RADIUS = 6371e3; // meters
/**
 * @param {Array} start Expected [lon, lat]
 * @param {Array} end Expected [lon, lat]
 * @return {number} Distance in meters.
 */
var calculateDistance = function (start, end) {
    var lat1 = start[1];
    var lon1 = start[0];
    var lat2 = end[1];
    var lon2 = end[0];
    return sphericalCosinus(lat1, lon1, lat2, lon2);
};
exports.calculateDistance = calculateDistance;
/**
 * @param {number} lat1 Start Latitude
 * @param {number} lon1 Start Longitude
 * @param {number} lat2 End Latitude
 * @param {number} lon2 End Longitude
 * @return {number} Distance in meters.
 */
var sphericalCosinus = function (lat1, lon1, lat2, lon2) {
    var dLon = toRad(lon2 - lon1);
    var distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)) * EARTH_RADIUS;
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);
    return distance;
};
/**
 * @param {Array} coord Expected [lon, lat]
 * @param {number} bearing Bearing in degrees.
 * 0° - North
 * 90° - East
 * 180° - South
 * 270° - West
 * @param {number} distance Distance in meters
 * @return {Array} Lon-lat coordinates.
 */
var coordMetersAway = function (coord, bearing, distance) {
    /**
     * φ is latitude, λ is longitude,
     * θ is the bearing (clockwise from north),
     * δ is the angular distance d/R;
     * d being the distance travelled, R the earth’s radius*
     **/
    var δ = Number(distance) / EARTH_RADIUS; // angular distance in radians
    var θ = toRad(Number(bearing));
    var φ1 = toRad(coord[1]);
    var λ1 = toRad(coord[0]);
    var φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
    var λ2 = λ1 +
        Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
    // normalise to -180..+180°
    λ2 = ((λ2 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
    return [toDeg(λ2), toDeg(φ2)];
};
exports.coordMetersAway = coordMetersAway;
/**
 * @param {Array} start Expected [lon, lat]
 * @param {Array} end Expected [lon, lat]
 * @return {number} Bearing in degrees.
 */
var getBearing = function (start, end) {
    var startLat = toRad(start[1]);
    var startLong = toRad(start[0]);
    var endLat = toRad(end[1]);
    var endLong = toRad(end[0]);
    var dLong = endLong - startLong;
    var dPhi = Math.log(Math.tan(endLat / 2.0 + Math.PI / 4.0) /
        Math.tan(startLat / 2.0 + Math.PI / 4.0));
    if (Math.abs(dLong) > Math.PI) {
        dLong = dLong > 0.0 ? -(2.0 * Math.PI - dLong) : 2.0 * Math.PI + dLong;
    }
    return (toDeg(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
};
exports.getBearing = getBearing;
var toDeg = function (n) { return (n * 180) / Math.PI; };
var toRad = function (n) { return (n * Math.PI) / 180; };
