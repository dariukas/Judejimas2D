/*
	Moving particles inside the closed space - vessel
	Author: Darius Miliauskas
	Date: 2015-07-24 (paper.js 0.9.23)
*/

var vessel, particle, parameters, gui;
var particles = [];
var x0, y0 =0;
var radius = 10;

parameters = {
number : 5,
speed : 10,
force : 0
};

init();
gui();

function init(){
//Creating the vessel
vessel = new Path.Circle(new Point(200, 200), 100);
vessel.strokeColor = 'green';
//Creating the particles
for(var i=0; i<5; i++){
particle = new Path.Circle(new Point(200, 200), radius);
particle.strokeColor = 'brown';
particles.push(particle);
}
}

//GUI
function gui (){
gui = new dat.GUI();
gui.add(parameters, 'number', 0, 100).onFinishChange(function (value){number = value; project.activeLayer.removeChildren(); init();});
gui.add(parameters, 'speed', 0, 2*radius).step(1).onFinishChange(function (value){speed = value;});//speed no more than double radius
gui.add(parameters, 'force', -max, max).onFinishChange(function (value){pushing(value);});
}

function pushing(force){
y0 = particles[i].position.y;
particles[i].position.y=y0+force;

if(particles[i].getIntersections(vessel).length>0){
console.log("intersect!");
particles[i].position.y+=-2*(particles[i].position.y-y0);
}
}	
}

//Moving the particles
function onFrame(event) {
for(var i in particles){
x0 = particles[i].position.x;
y0 = particles[i].position.y;

particles[i].position.x=x0+parameters.speed*(Math.random()-0.5);
particles[i].position.y=y0+parameters.speed*(Math.random()-0.5);
if(particles[i].getIntersections(vessel).length>0){
particles[i].position.x+=-2*(particles[i].position.x-x0);
particles[i].position.y+=-2*(particles[i].position.y-y0);
}
}
}
