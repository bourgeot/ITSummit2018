class CanvasRenderer {
	constructor (w, h) {
		const canvas = document.createElement("canvas");
		this.w = canvas.width = w;
		this.h = canvas.height = h;
		this.view = canvas;
		this.ctx = canvas.getContext("2d");
		this.ctx.textBaseline = "top";
		
	}
	//methods
	render (container, clear = true) {
		const { ctx } = this;
		function renderRec (container) {
			//render the container's children
			container.children.forEach(child => {
				if (child.visible == false) {
					return;
				}
				ctx.save();
				//draw the leaf node
				if (child.position) {
					ctx.translate(Math.round(child.position.x), Math.round(child.position.y));
				}
				if (child.anchor) {
					ctx.translate(child.anchor.x, child.anchor.y);
				}
				if (child.scale) {
					ctx.scale(child.scale.x, child.scale.y);
				}
				if (child.rotation) {
					const px = child.pivot ? child.pivot.x : 0;
					const py = child.pivot ? child.pivot.y : 0;
					ctx.translate(px, py);
					ctx.rotate(child.rotation);
					ctx.translate(-px, -py);
				}
				if (child.text) {
					const {font, fill, align} = child.style;
					if (font) ctx.font = font;
					if (fill) ctx.fillStyle = fill;
					if (align) ctx.textAlign = align;
					ctx.fillText(child.text, 0, 0);
				}
				else if (child.texture) {
					//see if it is a TileSprite and so is cropped
					if (child.tileW) {
						//console.log(child.texture.img);
						ctx.drawImage(
							child.texture.img,
							child.frame.x * (child.tileW + child.padding.x),
							child.frame.y * (child.tileH + child.padding.y),
							child.tileW,
							child.tileH,
							0, 0,
							child.tileW,
							child.tileH
						);
					}
					else {
						ctx.drawImage(child.texture.img, 0, 0);
					}
				}
				
				else if (child.style && child.w && child.h) {
					ctx.fillStyle = child.style.fill;
					ctx.fillRect(0, 0, child.w, child.h);
				}
				else if (child.style && child.points) {
					//path
					ctx.beginPath();
					ctx.moveTo(child.points[0][0], child.points[0][1]);
					for (let i = 1; i < child.points.length; i++) {
						ctx.lineTo(child.points[i][0], child.points[i][1]);	
					}
					//ctx.closePath();
					ctx.stroke();
					//ctx.fillStyle = child.style.fill;
					//ctx.fill();
				}
				
				//handle any children
				if (child.children) {
					renderRec(child);
				}
				ctx.restore();
			});
		}
		if (clear) {
			ctx.clearRect(0, 0, this.w, this.h);
		}
		renderRec(container);
	}
	
}

export default CanvasRenderer;