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
const racer = new Racer({x:130, y:200});

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

let position = {x:0, y:0};
let currentTile = 0;
let wPos = [];

game.run(() => {
  // collision detection
  position = {x:Math.floor(racer.position.x), y:Math.floor(racer.position.y)};
  currentTile = level.tileAtPixelPos(position);
  wPos = [];
  let j = 0;
  //for (j = 0; j < racer.whiskers.children.length - 1; j++); {
	  const m = level.pixelToMapPos(racer.whiskers.children[2].position);
	  
	  //wPos.push([Math.floor(racer.whiskers.children[j].position.x), Math.floor(racer.whiskers.children[j].position.y)]);
  //}
  location.text = "Location: " + JSON.stringify(m) + JSON.stringify(racer.whiskers.children[2].position);
  //location.text = m;
  //tiles.text = "Current Tile: " + JSON.stringify(currentTile);
  tiles.text = "Current Tile: " + currentTile.frame.id;

  //find out where the player is and add the tiles to the screen
  
  
  
  
});
