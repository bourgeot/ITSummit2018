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
	const denom = ((pathB[1][1] - pathB[0][1]) * (pathA[1][0] - pathA[0][0])) -
		((pathB[1][0] - pathB[0][0]) * (pathA[1][1] - pathA[0][1]));
	if (denom == 0) return null;

	else {
		//define t and u as parameters (per wikipedia Line-line intersection)
		const t = (((pathB[1][0] - pathB[0][0]) * (pathA[0][1] - pathB[1][1])) -
			((pathB[1][1] - pathB[0][1]) * (pathA[0][0] - pathB[0][0])))/denom;
		const u = (((pathA[1][0] - pathA[0][0]) * (pathA[0][1] - pathB[0][1])) -
			((pathA[1][1] - pathA[0][1]) * (pathA[0][0] - pathB[0][0])))/denom;
		//boundary tests
		if (t < 0 || t > 1 || u < 0 || u > 1) return null;
		else return [pathA[0][0] + t * (pathA[1][0] - pathA[0][0]),
			pathA[0][1] + t * (pathA[1][1] - pathA[0][1])];
	}
}
export default {
  center,
  bounds,
  hits,
  intersection
};