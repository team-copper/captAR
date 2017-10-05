
export class Player {
    constructor() {
        this.gameSessionId = null
        this.playerId = null
        this.position = null
        this.teamColor = null
        this.tagged = false
        this.hasFlag = false
    }

    setPosition = function(inLatitude, inLongitude) {
        this.position = {latitude: inLatitude, longitude: inLongitude}
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

export class Team {
    constructor() {
        this.gameSessionId = null
        this.teamId = null
        this.teamName = null
        this.teamColor = null
    }
}

export class Flag {
    constructor() {
        this.gameSessionId = null
        this.homeLocation = null
        this.currentLocation = null
        this.teamId = null
        this.taken = false
        this.holderId = null
    }

    setHomeLocation = function(inLatitude, inLongitude) {
        this.homeLocation = {latitude: inLatitude, longitude: inLongitude}
    }
    
    flagTaken = function(player) {
        this.taken = true;
        this.holderId = player.playerId;
        this.currentLocation = player.position;
    }
}