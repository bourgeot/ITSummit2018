import Texture from "./Texture.js";
import TileMap from "./TileMap.js";
import math from "./utils/math.js";

class Level extends TileMap {
	constructor (w, h) {
		//level is the array of tiles and mapW/mapH are the width and height of the map (counted in frames) to display level[].
		//parms
		//make the level responsible for where the players are.
		const texture = new Texture("./res/Images/Spritesheets/spritesheet_tiles.png");
		const tileW = 128;
		const tileH = 128;
		const mapW = Math.floor(w / tileW);
		const mapH = Math.floor(h / tileH);
		// Describe the tiles in metadata
		//walls are 20 px  wide.
		//arc syntax: context.arc(x,y,r,sAngle,eAngle,counterclockwise) 0 is at {1,0}

		const tileIndex = [
			{fn: 1, id: "nwall", x: 0, y: 0, bType: "path", boundary: [[0,20], [128,20]]},
			{fn: 2, id: "swall", x: 3, y: 9, bType: "path", boundary: [[0,108],[128,108]]},
			{fn: 3, id: "ewall", x: 4, y: 11, bType: "path", boundary: [[108,0], [108,128]]},
			{fn: 4, id: "wwall", x: 4, y: 13, bType: "path", boundary: [[20,0],[20,128]]},
			{fn: 5, id: "nwcurve90", x: 5, y: 13, bType: "path", 
				boundary:[[20,128],[20,96],[32,64],[64,32],[96,20],[128,20]]},
			{fn: 6, id: "necurve90", x: 5, y: 12, bType: "path",
				boundary:[[0,20],[32,20],[64,32],[96,64],[108,96],[108,128]]},
			{fn: 7, id: "securve90", x: 4, y: 9, bType: "path",
				boundary:[[0,108],[32,108],[64,96],[96,64],[108,20],[108,0]]},
			{fn: 8, id: "swcurve90", x: 4, y: 10, bType: "path", 
				boundary:[[20,0],[20,32],[32,64],[64,96],[96,108],[128,108]]},
			{fn: 9, id: "ewchannel", x: 0, y: 2},
			{fn: 10, id: "nschannel", x: 0, y: 3},
			{fn: 11, id: "opentriangle", x: 0, y: 4},
			{fn: 12, id: "openpit", x: 7, y: 1},
			{fn: 13, id: "openchecker", x: 0, y: 6},
			{fn: 14, id: "open", x: 4, y: 12},
			{fn: 15, id: "nnecurve30", x: 5, y: 9, bType: "path",
				boundary:[[0,20],[32,20],[96,32],[128,48]]},
			{fn: 16, id: "necurve30", x: 5, y: 8, bType: "path",
				boundary:[[0,48],[48,80],[80,128]]},
			{fn: 17, id: "enecurve30", x: 4, y: 5, bType: "path",
				boundary:[[80,0],[96,32],[102,64],[108,96],[108,128]]},
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
			{fn: 34, id: "grass", x: 7, y: 9, bType: "path", 
				boundary:[[0,0],[0,128],[128,128],[128,0],[0,0]]},
			{fn: 35, id: "dirttriangle", x: 7, y: 14}
			
		];
		const fnMap = [
			34,34,34,34,34,34,34,34,34,34,
			34, 5, 1, 1, 1, 1, 1, 1, 6,34,
			34, 8, 2, 2, 2, 2, 2,14, 3,34,
			34,34,34,34,34,34,34, 4, 3,34,
			34, 5, 6,34,34,34,34, 4, 3,34,
			34, 4, 3,34,34,34,34, 4, 3,34,
			34, 4, 3,34,34,34,34, 4, 3,34,
			34, 4,14, 1, 1, 1, 1,14, 3,34,
			34, 8, 2, 2, 2, 2, 2, 2, 7,34,
			34,34,34,34,34,34,34,34,34,34
		];	
			
		const tiles = [];
		var counter = 0;
		for (let i = 0; i < mapH; i++) {
		  for (let j = 0; j < mapW; j++) {
			const found = tileIndex.find(function(e) {
				return e.fn == fnMap[counter];
			});

			/*level.push({
			  x: found.x,
			  y: found.y
			});*/
			//add the path metadata
			//found.path = pathMap[counter];
			tiles.push(found);
			//console.log(found);
			//alert();
			counter ++;	
		  }
	
		}
		//console.log(counter);
		//console.log(tiles);
		//alert();
		super(tiles, mapW, mapH, tileW, tileH, texture);
		this.pathMap = [
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
			 0, 1, 2, 3, 4, 5, 6, 7, 7, 0, 
			 0, 1, 2, 3, 4, 5, 6, 8, 8, 0, 
			 0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 
			 0,23,23, 0, 0, 0, 0,10,10, 0, 
			 0,22,22, 0, 0, 0, 0,11,11, 0, 
			 0,21,21, 0, 0, 0, 0,12,12, 0, 
			 0,20,20,18,17,16,15,14,13, 0, 
			 0,19,19,18,17,16,15,14,13, 0, 
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
		];
		this.bounds = {
			left: tileW,
			right: w - tileW * 2,
			top: tileH,
			bottom: h - tileH * 2
			};
	}
	pathAtPixelPos(pos) {
		//look up the frame of the tile, and cross reference to the
		//path map.
		let z = super.pixelToMapPos(pos);
		let index = z.y * this.mapW + z.x;
		return this.pathMap[index];
		//return super.tileAtPixelPos(pos).path;
	}	
}

export default Level;