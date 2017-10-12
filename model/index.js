//Anuj notes: commented out functions as it cannot be stored in Firebase


export class Game {
    constructor() {
        this.gameFirebaseKey = null
        this.gameId = null
        this.players = []
        this.flags = []
        // this.onSession = true
    }
}

export class Player {
    constructor() {
        this.playerId = null
        this.playerKey = null
        this.location = null
        this.team = null
        this.hasFlag = false
    }

    // setPosition = function(inLatitude, inLongitude) {
    //     this.location = {latitude: inLatitude, longitude: inLongitude}
    // }
    
    // capturedFlag = function() {
    //     this.hasFlag = true;
    // }
    
    // lostFlag = function() {
    //     this.hasFlag = false;
    //     this.tagged = true;
    // }

    // untagPlayer = function() {
    //     this.tagged = false;
    // }
}

export class Flag {
    constructor(color, num) {
        this.flagId = num
        this.startLocation = null
        this.currentLocation = false
        this.team = color
        this.isTaken = false
        this.holder = null
    }   
    // flagTaken = function(player) {
    //     this.isTaken = true;
    //     this.holder = player.playerId;
    //     this.currentLocation = player.position;
    // }
}