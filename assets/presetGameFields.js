'user strict';

const elevatedAcre = {
  gameAreaCoordinates: [
    { latitude: 40.703542, longitude: -74.008528 },
    { latitude: 40.703319, longitude: -74.008273 },
    { latitude: 40.703217, longitude: -74.008428 },
    { latitude: 40.70331, longitude: -74.008606 },
    { latitude: 40.703412, longitude: -74.008722 }
  ],

  redCoordinates: [
    { latitude: 40.703542, longitude: -74.008528 },
    { latitude: 40.703439, longitude: -74.008411 },
    { latitude: 40.703309, longitude: -74.008602 },
    { latitude: 40.703412, longitude: -74.008722 }
  ],

  blueCoordinates: [
    { latitude: 40.703439, longitude: -74.008411 },
    { latitude: 40.703319, longitude: -74.008273 },
    { latitude: 40.703217, longitude: -74.008428 },
    { latitude: 40.703309, longitude: -74.008602 }
  ],

  redFlagSpawn: [
    { latitude: 40.703295, longitude: -74.00845 },
    { latitude: 40.703339, longitude: -74.008386 },
    { latitude: 40.70324, longitude: -74.008433 },
    { latitude: 40.703281, longitude: -74.008388 },
    { latitude: 40.70332, longitude: -74.00833 }
  ],

  blueFlagSpawn: [
    { latitude: 40.703414, longitude: -74.008663 },
    { latitude: 40.703439, longitude: -74.008587 },
    { latitude: 40.70349, longitude: -74.008544 },
    { latitude: 40.703443, longitude: -74.008539 },
    { latitude: 40.703405, longitude: -74.008602 }
  ]
};

const bowlingGreen = {
  gameAreaCoordinates: [
    { latitude: 40.705635, longitude: -74.013392 },
    { latitude: 40.704584, longitude: -74.013357 },
    { latitude: 40.704624, longitude: -74.014051 },
    { latitude: 40.704961, longitude: -74.013933 }
  ],

  redCoordinates: [
    { latitude: 40.705635, longitude: -74.013392 },
    { latitude: 40.704605, longitude: -74.01374 },
    { latitude: 40.704624, longitude: -74.014051 },
    { latitude: 40.704961, longitude: -74.013933 }
  ],

  blueCoordinates: [
    { latitude: 40.705635, longitude: -74.013392 },
    { latitude: 40.704584, longitude: -74.013357 },
    { latitude: 40.704605, longitude: -74.01374 }
  ],

  redFlagSpawn: [
    { latitude: 40.705058, longitude: -74.013471 },
    { latitude: 40.704682, longitude: -74.013452 },
    { latitude: 40.70545, longitude: -74.013431 }
  ],

  blueFlagSpawn: [
    { latitude: 40.704672, longitude: -74.013952 },
    { latitude: 40.705037, longitude: -74.013762 },
    { latitude: 40.705367, longitude: -74.013558 }
  ]
};

const batteryPark = {
  gameAreaCoordinates: [
		{latitude: 40.704380, longitude: -74.015726},
		{latitude: 40.703961, longitude: -74.016316},
		{latitude: 40.703534, longitude: -74.016070},
		{latitude: 40.703132, longitude: -74.016327},
		{latitude: 40.702981, longitude: -74.016772},
		{latitude: 40.702770, longitude: -74.016901},
		{latitude: 40.702245, longitude: -74.016408},
		{latitude: 40.702322, longitude: -74.016134},
		{latitude: 40.702497, longitude: -74.015930},
		{latitude: 40.702221, longitude: -74.015533},
		{latitude: 40.701749, longitude: -74.015603},
		{latitude: 40.701460, longitude: -74.015313},
		{latitude: 40.702278, longitude: -74.014326},
		{latitude: 40.702664, longitude: -74.014771},
		{latitude: 40.703095, longitude: -74.015072},
		{latitude: 40.703697, longitude: -74.015179},
		{latitude: 40.704026, longitude: -74.014712},
		{latitude: 40.704295, longitude: -74.014723},
		{latitude: 40.704514, longitude: -74.015072},
  ],

  redCoordinates: [
		//1
		{latitude: 40.704380, longitude: -74.015726},
		{latitude: 40.703961, longitude: -74.016316},
		{latitude: 40.703534, longitude: -74.016070},
		{latitude: 40.703132, longitude: -74.016327},
		//5
		{latitude: 40.702981, longitude: -74.016772},
		{latitude: 40.702770, longitude: -74.016901},
		//15
		{latitude: 40.703095, longitude: -74.015072},
		{latitude: 40.703697, longitude: -74.015179},
		{latitude: 40.704026, longitude: -74.014712},
		{latitude: 40.704295, longitude: -74.014723},
		{latitude: 40.704514, longitude: -74.015072},
  ],

  blueCoordinates: [
		//6
		{latitude: 40.702770, longitude: -74.016901},
		{latitude: 40.702245, longitude: -74.016408},
		{latitude: 40.702322, longitude: -74.016134},
		{latitude: 40.702497, longitude: -74.015930},
		//10
		{latitude: 40.702221, longitude: -74.015533},
		{latitude: 40.701749, longitude: -74.015603},
		{latitude: 40.701460, longitude: -74.015313},
		{latitude: 40.702278, longitude: -74.014326},
		{latitude: 40.702664, longitude: -74.014771},
		//15
		{latitude: 40.703095, longitude: -74.015072},
  ],

  redFlagSpawn: [
		{latitude: 40.702347, longitude: -74.016386},
		{latitude: 40.701680, longitude: -74.015286},
		{latitude: 40.702306, longitude: -74.014519},
		{latitude: 40.702152, longitude: -74.014846},
		{latitude: 40.702453, longitude: -74.015425},
  ],

  blueFlagSpawn: [
		{latitude: 40.704368, longitude: -74.015125},
		{latitude: 40.703957, longitude: -74.016128},
		{latitude: 40.703892, longitude: -74.015484},
		{latitude: 40.704002, longitude: -74.014835},
		{latitude: 40.703640, longitude: -74.015715},
  ]
};

export { elevatedAcre, bowlingGreen, batteryPark };
