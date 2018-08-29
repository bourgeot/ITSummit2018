import Container from "./Container.js";
import TileSprite from "./TileSprite.js";
//import Vector from "./utils/Vector.js";
import Rectangle from "./Rectangle.js";
import Path from "./Path.js";
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
			s.position.y = Math.floor(i/mapW) * tileH;
			//debug section
			s.children = new Array;
			if (s.frame.bType) {
				if (s.frame.bType == "rect") {
					const r = new Rectangle (
						s.frame.boundary[1][0] - s.frame.boundary[0][0],
						s.frame.boundary[1][1] - s.frame.boundary[0][1]
					);
					r.position = {x:s.frame.boundary[0][0], y:s.frame.boundary[0][1]};
					s.children.push(r);
				}
				
				if (s.frame.bType == "path") {
					const r = new Path (s.frame.boundary);
					//r.position = {x: s.frame.boundary[0][0], y: s.frame.boundary[0][1]};
					s.children.push(r);
				}
			}
			//console.log(s);
			return s;
		});
	}
	pixelToMapPos(pos) {
		const { tileW, tileH } = this;
		return {x:Math.floor(pos.x / tileW), y:Math.floor(pos.y / tileH)};
	}
	mapToPixelPos(mapPos) {
		const { tileW, tileH } = this;
		return {x:mapPos.x * tileW, y:mapPos.y * tileH};
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