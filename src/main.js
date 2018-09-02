// Round 2

/*
  Respond to player input
  Move everything a tiny bit
  Check for collisions
  Draw everything
*/
import GameScreen from "../screens/GameScreen.js";
import library from "../library/index.js";
import Racer from "./entities/Racer.js";
const { Container, Text, CanvasRenderer, Rectangle, KeyControls, TileSprite, Sprite, Texture, Game, Level, Camera, math, entity, Vector, Path } = library;

const game = new Game(640, 480, '#board');
const { scene, w, h } = game;
const level = new Level(128 * 10, 128 * 10 );
const racer = new Racer({x:333, y:302});

const camera = new Camera(
	 racer,
	 { w, h },
	 { w: level.w, h: level.h }
);
//scoreboard info
const location = new Text("Location: ", {
  font: "20px sans-serif",
  fill: "#8B8994",
  align: "center"
});
location.position.x = w / 2;
location.position.y = 30;
const tiles = new Text("Tiles: ", {
  font: "20px sans-serif",
  fill: "#8B8994",
  align: "center"
});
tiles.position.x = w / 2;
tiles.position.y = 60;
	
	
scene.add(camera);
camera.add(level);
camera.add(racer);;
scene.add(location);
scene.add(tiles);

var position = {x:0, y:0};
/*	
	var currentTile;
	var wh = racer.whiskerLocation(2);
	position.x = Math.round(racer.position.x + racer.whiskerLocation(2).x);
	position.y = Math.round(racer.position.y+ racer.whiskerLocation(2).y);
	currentTile = level.tileAtPixelPos(position);

	var p = [
			{x:currentTile.position.x + currentTile.frame.boundary[0][0],
				y:currentTile.position.y + currentTile.frame.boundary[0][1]},
			{x:currentTile.position.x + currentTile.frame.boundary[1][0],
				y:currentTile.position.y + currentTile.frame.boundary[1][1]}
			];
	
	//var q = entity.intersection(p.points, wh.points);
	//console.log(p);
	//console.log(position);
	
for (var zz  = 0; zz < racer.whiskers.children.length; zz++) {
	console.log(racer.whiskerLocation(zz));
}
*/
game.run(() => {
  // collision detection
		var n,p, q = null;
		var currentTile = 0,  position = {};
		var r = 0;
		var i, j, k, a, b, c;
		var bounds = [];
		var hit = null, bHit = false;
		var currentTiles = [];
		var positions = [];
		const racerPos = racer.position;
		//console.log(racer.whiskerLocation(0));
		for (i=0; i < racer.whiskers.children.length; i++) {
			position = {x: Math.round(racerPos.x + racer.whiskerLocation(i).x),
				y:Math.round(racerPos.y + racer.whiskerLocation(i).y)};
			currentTile = level.tileAtPixelPos(position);
			//get the current length;
			r = racer.whiskers.children[i].length;
			//console.log(r);
			for (j = 0; j < 2; j++) {
				if (j > 0) {
					//I may want to add 'front of car' in addition to the middle of the car
					currentTile = level.tileAtPixelPos(racerPos);
				}
				if (currentTile.frame.bType) {
					location.text = currentTile.id;
					for (a = 0; a < currentTile.frame.boundary.length -1; a++ ) {
						bounds.push(
							[
								{x:currentTile.position.x + currentTile.frame.boundary[a][0],
									y:currentTile.position.y + currentTile.frame.boundary[a][1]},
								{x:currentTile.position.x + currentTile.frame.boundary[a+1][0],
									y:currentTile.position.y + currentTile.frame.boundary[a+1][1]}
							]);
					}
					for ( b = 0; b < bounds.length; b++) {
						hit = entity.intersection([racerPos, position], bounds[b]);
						if (hit !== null) {
							location.text = "Whisker " + i + "hit.";
							bHit = true;
							r = Math.sqrt((hit.x - racerPos.x) * (hit.x - racerPos.x) +
								(hit.y - racerPos.y) * (hit.y - racerPos.y));
							racer.whiskers.children[i].setLength(r);
						}
					}
					if(!bHit) {
						//return to previous value
						//console.log(r);
						racer.whiskers.children[i].setLength();
					}
				}
			}
			bHit = false;
		}

  //find out where the player is and add the tiles to the screen
  
  
  
  
});
