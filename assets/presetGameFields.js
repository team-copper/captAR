// For random flag placement
// getRandomBtwn = (min, max) => Math.random()*(max-min)+min

const elevatedAcre = {
    // points on map:
    // [1,2]
    // [5,4,3]
    // [ 40.703542, -74.008528 ; 40.703319, -74.008273 ]
    // [ 40.703412, -74.008722 ; 40.703310, -74.008606 ; 40.703217, -74.008428 ]

    // Center of gameField
    // latitude: 40.703374,
    // longitude: -74.008504,

    polyCoordinates: [
      {
        latitude: 40.703542,
        longitude: -74.008528
      },
      {
        latitude: 40.703319,
        longitude: -74.008273
      },
      {
        latitude: 40.703217,
        longitude: -74.008428
      },
      {
        latitude: 40.703310,
        longitude: -74.008606
      },
      {
        latitude: 40.703412,
        longitude: -74.008722
      }
    ],

    redCoordinates: [
      {
        latitude: 40.703542,
        longitude: -74.008528
      },
      {
        latitude: 40.703439,
        longitude: -74.008411
      },
      {
        latitude: 40.703309,
        longitude: -74.008602
      },
      {
        latitude: 40.703412,
        longitude: -74.008722
      }
    ],

    blueCoordinates: [
      {
        latitude: 40.703439,
        longitude: -74.008411
      },
      {
        latitude: 40.703319,
        longitude: -74.008273
      },
      {
        latitude: 40.703217,
        longitude: -74.008428
      },
      {
        latitude: 40.703309,
        longitude: -74.008602
      }
    ],
    redFlag: {
    //   latitude: 
    //   longitude: Math.random()*(max-min)+min
    },
    blueFlag: {
    //   latitude: position.coords.latitude - 0.00075,
    //   longitude: position.coords.longitude - 0.00175
    }
}