
// export class Game {
//     constructor() {
//         this.gameId = null
//         this.players = []
//         this.onSession = false
//     }
// }

export class Player {
    constructor() {
        // this.gameSessionId = null
        this.playerId = null
        this.location = null
        this.team = null
        // this.tagged = false
        this.hasFlag = false
    }

    setPosition = function(inLatitude, inLongitude) {
        this.location = {latitude: inLatitude, longitude: inLongitude}
    }
    
    capturedFlag = function() {
        this.hasFlag = true;
    }
    
    lostFlag = function() {
        this.hasFlag = false;
        this.tagged = true;
    }

    untagPlayer = function() {
        this.tagged = false;
    }
}

// export class Team {
//     constructor() {
//         this.gameSessionId = null
//         this.teamId = null
//         this.teamName = null
//         this.teamColor = null
//     }
// }

export class Flag {
    constructor() {
        // this.gameSessionId = null
        this.flagId = null
        this.startLocation = null
        this.currentLocation = null
        this.team = null
        this.isTaken = false
        this.holder = null
    }

    setHomeLocation = function(inLatitude, inLongitude) {
        this.startLocation = {latitude: inLatitude, longitude: inLongitude}
    }
    
    flagTaken = function(player) {
        this.isTaken = true;
        this.holder = player.playerId;
        this.currentLocation = player.position;
    }
}