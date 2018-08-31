
function integrate(e, dt) {
	const {position, velocity, acceleration} = e;
	const vx = velocity.x + acceleration.x * dt;
	const vy = velocity.y + acceleration.y * dt;
	const x = (velocity.x + vx) / 2 * dt;
	const y = (velocity.y + vy) / 2 * dt;
	
	position.add({x, y});
	velocity.set(vx, vy); 
	acceleration.set(0,0);
}
function applyForce (e, force) {
	const { acceleration, mass = 1} = e;
	acceleration.x += force.x / mass;
	acceleration.y += force.y / mass;
}

const applyImpulse = (e, force, dt) => {
	applyForce (e, {x: force.x/dt, y: force.y/dt});
};

export default {
	integrate, 
	applyForce,
	applyImpulse
};