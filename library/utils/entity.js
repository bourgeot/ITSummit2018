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
function senseBoundary(whisker, tile) {
	//check and see if a whisker contacts a tile boundary.
	var segments[];
	if(tile.boundary) {
		//boundary is a set of points. Each segment must be checked against each whisker
		for(let i = 0; i < tile.boundary.length - 1; i++) {
			segments.push([tile.boundary[i],tile.boundary[i+1]]);
		}
		console.log(segments);
	}
Input
	LineA1	Point	First point on line A
	LineA2	Point	Second point on line A
	LineB1	Point	First point on line B
	LineB2	Point	Second point on line B
Output
	The point of the collision, or null if no collision exists.
Method
	denom = ((LineB2.Y – LineB1.Y) * (LineA2.X – LineA1.X)) –
		((LineB2.X – LineB1.X) * (LineA2.Y - LineA1.Y))
	if (denom == 0)
		return null
	else
		ua = (((LineB2.X – LineB1.X) * (LineA1.Y – LineB1.Y)) –
			((LineB2.Y – LineB1.Y) * (LineA1.X – LineB1.X))) / denom
		/* The following 3 lines are only necessary if we are checking line
			segments instead of infinite-length lines */
		ub = (((LineA2.X – LineA1.X) * (LineA1.Y – LineB1.Y)) –
			((LineA2.Y – LineA1.Y) * (LineA1.X – LineB1.X))) / denom
		if (ua < 0) || (ua > 1) || (ub < 0) || (ub > 1)
			return null

		return LineA1 + ua * (LineA2 – LineA1)
}
export default {
  center,
  bounds,
  hits
};