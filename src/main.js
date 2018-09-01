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
const { Container, Text, CanvasRenderer, Rectangle, KeyControls, TileSprite, Sprite, Texture, Game, Level, Camera, math, entity, Path } = library;

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
	
	
	

game.run(() => {
  // collision detection
		var n, q;
		var bounds = [];
		var hit = null;
		position.x = Math.round(racer.position.x + racer.whiskerLocation(2).x);
		position.y = Math.round(racer.position.y + racer.whiskerLocation(2).y);
	currentTile = level.tileAtPixelPos(position);


			//const {boundary} =  currentTile.frame;
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
		
	}
	//console.log(bounds.length);
	for (var i = 0; i < bounds.length; i++) {
		//console.log(bounds[i]);
		//console.log(racer.whiskers.children[2].path);
		//q = entity.intersection(bounds[i].points, racer.whiskers.children[2].path.points);
		//console.log(q);
		//if(q !== null) {
			//console.log('hit');
		//}
	}
	location.text = "Whisker 2 Location: " +  JSON.stringify(position) + " " + JSON.stringify(q);
  //location.text = m;
  //tiles.text = "Current Tile: " + JSON.stringify(currentTile);
  tiles.text = "Current Tile: " + currentTile.frame.id + 
	"Boundary Location " + JSON.stringify(p[0]) + ", " + JSON.stringify(p[1]);

  //find out where the player is and add the tiles to the screen
  
  
  
  
});
