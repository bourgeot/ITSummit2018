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
const level = new Level(128 * 10, 128 * 10 );
const racer = new Racer({x:130, y:200});

const camera = new Camera(
	 racer,
	 { w, h },
	 { w: level.w, h: level.h }
);
scene.add(camera);
camera.add(level);
camera.add(racer);;


game.run((dt, t) => {
 // ship.position.x += dt * 60;
 /// if (ship.position.x > w) {
 //   ship.position.x = -32;
});
