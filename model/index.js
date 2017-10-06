
export class Player {
    constructor() {
        this.gameSessionId = null
        this.playerId = null
        this.position = null
        this.teamColor = null
        this.tagged = false
        this.hasFlag = false
    }

    setPosition (inLatitude, inLongitude) {
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

export function Flag(color) {
    this.gameSessionId = null
    this.homeLocation = null
    this.location = this.homeLocation
    this.teamColor = color
    this.taken = false
    this.holderId = null
}

Flag.prototype.setHomeLocation = function(inLatitude, inLongitude) {
        this.homeLocation = {latitude: inLatitude, longitude: inLongitude}
    }
    
Flag.prototype.flagTaken = function(player) {
    this.taken = true;
    this.holderId = player.playerId;
    this.location = player.position;
}

Flag.prototype.flagDropped = function() {
        this.taken = false;
        this.holderId = null;
        this.location = this.homeLocation;
}

export function GameArea() {
    this.gameSessionId = null;
    this.redFlag = null;
    this.blueFlag = null;
}