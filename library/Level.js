import Texture from "./Texture.js";
import TileMap from "./TileMap.js";
import math from "./utils/math.js";

class Level extends TileMap {
	constructor (w, h) {
		//level is the array of tiles and mapW/mapH are the width and height of the map (counted in frames) to display level[].
		//parms
		const texture = new Texture("./res/Images/Spritesheets/spritesheet_tiles.png");
		const tileW = 128;
		const tileH = 128;
		const mapW = Math.floor(w / tileW);
		const mapH = Math.floor(h / tileH);
		// Describe the tiles in metadata
		const tileIndex = [
			{fn: 1, id: "nwall", x: 0, y: 0},
			{fn: 2, id: "swall", x: 9, y: 3},
			{fn: 3, id: "ewall", x: 4, y: 11},
			{fn: 4, id: "wwall", x: 4, y: 13},
			{fn: 5, id: "nwcurve90", x: 5, y: 13},
			{fn: 6, id: "necurve90", x: 5, y: 12},
			{fn: 7, id: "securve90", x: 4, y: 9},
			{fn: 8, id: "swcurve90", x: 4, y: 10},
			{fn: 9, id: "ewchannel", x: 0, y: 2},
			{fn: 10, id: "nschannel", x: 0, y: 3},
			{fn: 11, id: "opentriangle", x: 0, y: 4},
			{fn: 12, id: "openpit", x: 7, y: 1},
			{fn: 13, id: "openchecker", x: 0, y: 6},
			{fn: 14, id: "open", x: 12, y: 4},
			{fn: 15, id: "nnecurve30", x: 5, y: 9},
			{fn: 16, id: "necurve30", x: 5, y: 8},
			{fn: 17, id: "enecurve30", x: 4, y: 5},
			{fn: 18, id: "esecurve30", x: 2, y: 3},
			{fn: 19, id: "securve30", x: 1, y: 14},
			{fn: 20, id: "ssecurve30", x: 2, y: 0},
			{fn: 21, id: "sswcurve30", x: 2, y: 1},
			{fn: 22, id: "swcurve30", x: 2, y: 2},
			{fn: 23, id: "wswcurve30", x: 3, y: 5},
			{fn: 24, id: "wnwcurve30", x: 5, y: 8},
			{fn: 25, id: "nwcurve30", x: 5, y: 11},
			{fn: 26, id: "nnwcurve30", x: 5, y: 10},
			{fn: 27, id: "newall30", x: 3, y: 4},
			{fn: 28, id: "sewall30", x: 4, y: 7},
			{fn: 29, id: "swwall30", x: 1, y: 4},
			{fn: 30, id: "nwwall30", x: 3, y: 3},				
			{fn: 31, id: "swallchecker", x: 0, y: 5},
			{fn: 32, id: "openchecker", x: 0, y: 6},
			{fn: 33, id: "nwallchecker", x: 0, y: 7},
			{fn: 34, id: "grass", x: 7, y: 9},
			{fn: 35, id: "dirttriangle", x: 7, y: 14}
			
		];
		const fnMap = [
			34,34,34,34,34,34,34,34,34,34,
			34, 1, 1, 1, 1, 1,15,34,34,34,
			34, 4,14,14,14,14,14,16,34,34,
			34, 2, 2, 2, 2, 2,29,17,34,34
		];		
		
		const level = [];
		var counter = 0;
		console.log(mapH, mapW);
		for (let y = 0; y < mapH; y++) {
		  for (let x = 0; x < mapW; x++) {

			const found = tileIndex.find(function(e) {
				return e.fn == fnMap[counter];
			});
			//console.log(found);
			level.push({
			  //x: math.rand(0,5),
			  //y: math.rand(0,14)
			  x: found.x,
			  y: found.y
			});
			counter ++;	
		  }
	
		}
		
		super(level, mapW, mapH, tileW, tileH, texture);
		this.bounds = {
			left: tileW,
			right: w - tileW * 2,
			top: tileH,
			bottom: h - tileH * 2
			};
	}
}

export default Level;