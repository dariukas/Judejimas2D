/*
	Moving particles inside the vessel
	Author: Darius Miliauskas
	Date: 2015-07-24 (paper.js 0.9.23)
*/

var vessel, particle;
var particles = [];
var x0, y0 =0;

init();

function init(){
//Creating the vessel
vessel = new Path.Circle(new Point(200, 200), 100);
vessel.strokeColor = 'green';
//Creating the particles
for(var i=0; i<5; i++){
particle = new Path.Circle(new Point(200, 200), 10);
particle.strokeColor = 'brown';
particles.push(particle);
}
}

//Moving the particles
function onFrame(event) {
for(var i in particles){
x0 = particles[i].position.x;
y0 = particles[i].position.y;

particles[i].position.x=x0+15*(Math.random()-0.5);//speed no more than 20
particles[i].position.y=y0+15*(Math.random()-0.5);
if(particles[i].getIntersections(vessel).length>0){
particles[i].position.x+=-2*(particles[i].position.x-x0);
particles[i].position.y+=-2*(particles[i].position.y-y0);
}
}
}
