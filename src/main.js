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
const racer = new Racer({x:333, y:285});

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
let wPos = [];
	var currentTile;
	var wh = racer.whiskers.children[2].path;
	position.x = Math.floor(racer.position.x + racer.whiskerLocation(2).x);
	position.y = Math.floor(racer.position.y+ racer.whiskerLocation(2).y);
	currentTile = level.tileAtPixelPos(position);
	var p = new Path([currentTile.frame.boundary[0], currentTile.frame.boundary[1]], {fill: "red"});
	var q = entity.intersection(p.points, wh.points);
//	console.log(q);
game.run(() => {
  // collision detection

		var bounds = [];
		var hit = null;
		position.x = Math.floor(racer.position.x + racer.whiskerLocation(2).x);
	position.y = Math.floor(racer.position.y+ racer.whiskerLocation(2).y);
	currentTile = level.tileAtPixelPos(position);
	//const {boundary} =  currentTile.frame;
	if (currentTile.frame.bType) {
		//console.log('hi');
		for (var i = 0; i < currentTile.frame.boundary.length - 1; i++) {
			bounds.push(new Path([currentTile.frame.boundary[i], currentTile.frame.boundary[i+1]], {fill: "red"}));
		}
	}
	//console.log(bounds.length);
	for (var i = 0; i < bounds.length; i++) {
		//console.log(bounds[i]);
		//console.log(racer.whiskers.children[2].path);
		q = entity.intersection(bounds[i].points, racer.whiskers.children[2].path.points);
		//console.log(q);
		if(q !== null) {
			console.log('hit');
		}
	}
	location.text = "Location: " + JSON.stringify(racer.position) + " " + JSON.stringify(position);
  //location.text = m;
  //tiles.text = "Current Tile: " + JSON.stringify(currentTile);
  tiles.text = "Current Tile: " + currentTile.frame.id + 
	" " + JSON.stringify({x:Math.floor(racer.whiskerLocation(2).x), y: Math.floor(racer.whiskerLocation(2).y)});

  //find out where the player is and add the tiles to the screen
  
  
  
  
});
