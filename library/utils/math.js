function rand(min, max) {
  // return random integer
  return Math.floor(randf(min, max));
}
function randf(min, max) {
  // return random float
  if (max == null) {
	max = min || 1;
	min = 0;
  }
  return Math.random() * (max - min) + min;
}
function randOneIn(max = 2) {
	return rand(0, max) === 0;
}
function randOneFrom(array) {
	return array[rand(array.length)];
}

//boundary functions
function clamp(x, min, max) {
  return Math.max(min, Math.min(x, max));
}

export default {
  rand,
  randf,
  randOneIn,
  randOneFrom,
  clamp
};