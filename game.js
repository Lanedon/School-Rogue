var tileSet = document.createElement("img");
tileSet.src = "sprites/tiles/blue.png";

var options = {
    layout: "tile",
    bg: "transparent",
    tileWidth: 30,
    tileHeight: 30,
    tileSet: tileSet,
    tileMap: {
        ".": [0, 0],
        "#": [0, 0],
        "a": [0, 0],
        "!": [0, 0]
    },
    width: 3,
    height: 3
}


var Game = {
    display: null,
    map: {},
    init: function() {
        this.display = new ROT.Display(options);
        document.body.appendChild(this.display.getContainer());

        this._generateMap();
        /*var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);
        scheduler.add(this.pedro, true);
        this.engine = new ROT.Engine(scheduler);
        this.engine.start();*/
    }
}

Game._generateMap = function() {
    var digger = new ROT.Map.Digger();
    var freeCells = [];
 
    var digCallback = function(x, y, value) {
        if (value) { return; } /* do not store walls */
 
        var key = x+","+y;
        freeCells.push(key);
        this.map[key] = ".";
    }
    digger.create(digCallback.bind(this));
 
    // this._generateBoxes(freeCells);
 
    this._drawWholeMap();
};

Game._drawWholeMap = function() {
    for (var key in this.map) {
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        this.display.draw(x, y, this.map[key]);
    }
}