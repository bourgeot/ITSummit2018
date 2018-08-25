import Sprite from "./Sprite.js";

class TileSprite extends Sprite {
	constructor (texture, w, h, paddingX = 2, paddingY = 2) {
		super(texture);
		this.tileW = w;
		this.tileH = h;
		this.padding = {x: paddingX, y: paddingY}; 
		this.frame = {x: 0, y: 0};
	}
}

export default TileSprite;