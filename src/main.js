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
const { Container, Text, CanvasRenderer, KeyControls, TileSprite, Sprite, Texture, Game, Level, Camera, math } = library;

const game = new Game(640, 480, '#board');
const { scene, w, h } = game;
const level = new Level(128 * 10, 128 * 10 );
const racer = new Racer({x:128, y:128});

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
console.log(racer.whiskerLocation(2));

game.run(() => {
  // collision detection
	var currentTile;
//  position.x = racer.position.x + racer.whiskers.children[2].end.x;
 // position.y = racer.position.y + racer.whiskers.children[2].end.y;
  currentTile = level.tileAtPixelPos(position);
  position.x = Math.floor(racer.position.x + racer.whiskerLocation(1).x);
  position.y = Math.floor(racer.position.y+ racer.whiskerLocation(1).y);
  const v = {x: position.x + racer.whiskerLocation(2).x, y: position.y + racer.whiskerLocation(2).y};
  const w = level.pixelToMapPos(v);
  wPos = [];
  let j = 0;
  //for (j = 0; j < racer.whiskers.children.length - 1; j++); {
	  const m = level.pixelToMapPos(position);
	  
	  //wPos.push([Math.floor(racer.whiskers.children[j].position.x), Math.floor(racer.whiskers.children[j].position.y)]);
  //}
  location.text = "Location: " + JSON.stringify(m) + " " + JSON.stringify(position);
  //location.text = m;
  //tiles.text = "Current Tile: " + JSON.stringify(currentTile);
  tiles.text = "Current Tile: " + currentTile.frame.id + " " + JSON.stringify(racer.whiskerLocation(2));

  //find out where the player is and add the tiles to the screen
  
  
  
  
});
