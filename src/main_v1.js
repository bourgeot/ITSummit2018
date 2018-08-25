// Round 2

/*
  Respond to player input
  Move everything a tiny bit
  Check for collisions
  Draw everything
*/
import library from "../library/index.js";

const { Container, Text, CanvasRenderer, KeyControls, TileSprite, Sprite, Texture, Game, math } = library;

const game = new Game(640, 480, '#board');
const blueCar = new Texture("./res/Images/PNG/Cars/car_blue_small_1.png");

const message = new Text("Hello", {
	font: "40pt monospace",
	fill: "blue",
	align: "center"
});
message.position.x = game.w/2;
message.position.y = game.h/2;
message.update = function (dt) {
  this.position.x -= 100 * dt;
  if (this.position.x < -420) {
    this.position.x = game.w;
  }
};
game.scene.add(message);

for (let i = 0; i < 20; i++) {
  const speed = {x: Math.random() * 150 + 50, y: Math.random() * 150 + 50 };
  const ship = new Sprite(blueCar);
  ship.position.x = Math.random() * game.w;
  ship.position.y = Math.random() * game.h;
  ship.speed = speed;
  ship.update = function (dt,t) {
	  this.position.x += this.speed.x * dt;
	  this.position.y += this.speed.y * dt;
	  if (this.position.x > game.w || this.position.x < 0) this.speed.x = -this.speed.x;
	  if (this.position.y > game.h || this.position.y < 0) this.speed.y = -this.speed.y;
  };
  game.scene.add(ship);
}
//render the main container
//renderer.render(scene);


let deltaT = 0;
let lastT = 0;

function gameLoop(ms) {
  requestAnimationFrame(gameLoop);
  const t = ms / 1000;
  deltaT = t - lastT;
  lastT = t;
  
  game.scene.update(deltaT, t);
  game.renderer.render(game.scene);
}
requestAnimationFrame(gameLoop);
