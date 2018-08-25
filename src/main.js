// Round 2

/*
  Respond to player input
  Move everything a tiny bit
  Check for collisions
  Draw everything
*/
import library from "../library/index.js";
import Racer from "./entities/Racer.js";
const { Container, Text, CanvasRenderer, KeyControls, TileSprite, Sprite, Texture, Game, Level, Camera, math } = library;

const game = new Game(640, 480, '#board');
const { scene, w, h } = game;
const level = new Level(130 * 10, 130 * 4 );
const racer = new Racer({x:0, y:80}, 0, {x:1, y:0});

const camera = new Camera(
	 racer,
	 { w, h },
	 { w: level.w, h: level.h }
);
scene.add(camera);
camera.add(level);
camera.add(racer);;
///scene.add(level);
//scene.add(racer);
//scene.add(level);
/*
const tileSheet = new Texture("./res/Images/Spritesheets/spritesheet_tiles.png");
const roadTile = new TileSprite(tileSheet, 128, 128);
roadTile.frame = {x:1, y: 2};
roadTile.position.x = 0;
roadTile.position.y = 0;
scene.add(roadTile);
const road2 = new TileSprite(tileSheet, 128, 128);
road2.frame = {x:3, y:6};
road2.position = {x:128, y:0};
scene.add(road2);

const ship = new Sprite(new Texture("./res/Images/PNG/Cars/car_blue_small_1.png"));
ship.pivot.x = 20;
ship.pivot.y = 35;
ship.position.y = 30;
ship.rotation = Math.PI/2;
scene.add(ship);*/
// Our old loop!
game.run((dt, t) => {
 // ship.position.x += dt * 60;
 /// if (ship.position.x > w) {
 //   ship.position.x = -32;
});
