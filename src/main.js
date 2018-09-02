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
*/	
for (var zz  = 0; zz < racer.whiskers.children.length; zz++) {
	console.log(racer.whiskerLocation(zz));
}

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
					r = 0;
					if (hit !== null) {
						location.text = "Whisker " + i + "hit.";
						bHit = true;
						r = Math.sqrt((hit.x - racerPos.x) * (hit.x - racerPos.x) +
							(hit.y - racerPos.y) * (hit.y - racerPos.y));
						racer.whiskers.children[i].setLength(r);
					}
				}
				if(!bHit) {
					racer.whiskers.children[i].setLength();
				}
			}
			bHit = false;
		}
	/*
	if (currentTile.frame.bType) {
		//console.log('hi');
		p = [
			{x:currentTile.position.x + currentTile.frame.boundary[0][0],
				y:currentTile.position.y + currentTile.frame.boundary[0][1]},
			{x:currentTile.position.x + currentTile.frame.boundary[1][0],
				y:currentTile.position.y + currentTile.frame.boundary[1][1]}
		];
		n = [ racer.position, position];

		q = entity.intersection(p, n);
		var zz = 0;
		if (q !== null) {
			//q is in world coordinates. Set the end in relative coordinates.
			zz = Math.sqrt((q.x - n[0].x) *(q.x - n[0].x) + (q.y - n[0].y)*(q.y - n[0].y));
			 //zz = JSON.stringify({x: q.x - n[0].x, y: q.y - n[0].y});
			//racer.whiskers.children[2].setEnd(q);
			racer.whiskers.children[2].setLength(zz);
			
		}
		else {
			racer.whiskers.children[2].setLength();
		}
	}
	*/
	//console.log(bounds.length);

	//location.text = "Whisker 2 Location: " +  JSON.stringify(position) + " " + JSON.stringify(q) ;
  //location.text = m;
  //tiles.text = "Current Tile: " + JSON.stringify(currentTile);
 // tiles.text = "Current Tile: " + currentTile.frame.id + 
	//"Boundary Location " + JSON.stringify(p[0]) + ", " + JSON.stringify(p[1]);

  //find out where the player is and add the tiles to the screen
  
  
  
  
});
