function center (entity) {
  const { pos, w, h } = entity;
  return {
    x: pos.x + w / 2,
    y: pos.y + h / 2
  };
}

function bounds(entity) {
  const { w, h, pos, hitBox } = entity;
  const hit = hitBox || { x: 0, y: 0, w, h };
  return {
    x: hit.x + pos.x,
    y: hit.y + pos.y,
    w: hit.w - 1,
    h: hit.h - 1
  };
}

function hits (entity, container, hitCallback) {
	const a = bounds(entity);
}
function intersection(pathA, pathB) {
	//check and see if two paths intersect
	//assume the paths are defined by two lines
	//console.log(pathA);
	//console.log(pathB);
	const denom = ((pathB[1].y - pathB[0].y) * (pathA[1].x - pathA[0].x)) -
		((pathB[1].x - pathB[0].x) * (pathA[1].y - pathA[0].y));
		//console.log(denom);
	if (denom == 0) return null;

	else {
		//t = (a0x - b0x)*(b0y-b1y) - (a0y - b0y) * (b0x - b1x) 
		const t = (((pathA[0].x - pathB[0].x) * (pathB[0].y - pathB[1].y)) -
			((pathA[0].y - pathB[0].y) * (pathB[0].x - pathB[1].x)))/denom;
		//define t and u as parameters (per wikipedia Line-line intersection)
		const u = (((pathA[1].x - pathA[0].x) * (pathA[0].y - pathB[0].y)) -
			((pathA[1].y - pathA[0].y) * (pathA[0].x - pathB[0].x)))/denom;
		//boundary tests
		if (t < 0 || t > 1 || u < 0 || u > 1) return null;
		else return {x: Math.round(pathA[0].x + t * (pathA[1].x - pathA[0].x)),
			y: Math.round(pathA[0].y + t * (pathA[1].y - pathA[0].y))};
	}
}
export default {
  center,
  bounds,
  hits,
  intersection
};