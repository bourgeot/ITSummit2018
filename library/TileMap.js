import Container from "./Container.js";
import TileSprite from "./TileSprite.js";
//import Vector from "./utils/Vector.js";
//tiles is the array of tiles and mapW/mapH are the width and height of the map (counted in frames) to display tiles[].
class TileMap extends Container {
	constructor (tiles, mapW, mapH, tileW, tileH, texture) {
		super();
		this.mapW = mapW;
		this.mapH = mapH;
		this.tileW = tileW;
		this.tileH = tileH;
		this.w = mapW * tileW;
		this.h = mapH * tileH;
		//add the sprite children
		this.children = tiles.map((frame, i) => {
			const s = new TileSprite(texture, tileW, tileH);
			s.frame = frame;
			s.position.x = i  % mapW * tileW;
			s.position.y = Math.floor(i/mapH) * tileH;
			return s;
		});
	}
	pixelToMapPos(pos) {
		const { tileW, tileH } = this;
		return new Vector (	Math.floor(pos.x / tileW), Math.floor(pos.y / tileH));
	}
	mapToPixelPos(mapPos) {
		const { tileW, tileH } = this;
		return new Vector (mapPos.x * tileW, mapPos.y * tileH);
	}
	tileAtMapPos(mapPos) {
		return this.children[mapPos.y * this.mapW + mapPos.x];
	}

	tileAtPixelPos(pos) {
		return this.tileAtMapPos(this.pixelToMapPos(pos));
	}
	setFrameAtMapPos(mapPos, frame) {
		const tile = this.tileAtMapPos(mapPos);
		tile.frame = frame;
		return tile;
	}
	setFrameAtPixelPos(pos, frame) {
		return this.setFrameAtMapPos(this.pixelToMapPos(pos), frame);
	}
	
}

export default TileMap;