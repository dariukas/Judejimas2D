/*
	Moving particles inside the closed space - vessel
	Author: Darius Miliauskas
	Date: 2015-07-24 (paper.js 0.9.23)
*/

var vessel, particles, particle, parameters, gui;
var vessel0;
var x0, y0 =0;
var radius = 10;

parameters = {
number : 5,
speed : 10,
force : 0,
open : false
};

init();
initParticles();
gui();

//creating the vessel
function init(){
vessel0 = new Path.Circle(new Point(200, 200), 100);
vessel0.strokeColor = 'green';
if(parameters.open==true){
vessel0.split(0, 0.5);
vessel = vessel0.split(0, 1);
vessel.remove();
}else{
vessel = vessel0;
}
}

//creating the particles
function initParticles(){
particles=[];//to clear the array
for(var i=0; i<parameters.number; i++){
particle = new Path.Circle(new Point(200, 200), radius);
particle.strokeColor = 'brown';
particles.push(particle);
}
}

//GUI
function gui (){
gui = new dat.GUI();
gui.add(parameters, 'number', 0, 100).onFinishChange(function (value){ number = value; project.activeLayer.removeChildren(); init(); initParticles() });
gui.add(parameters, 'speed', 0, 2*radius).step(1).onFinishChange(function (value){ speed = value; });//speed no more than double radius
gui.add(parameters, 'force', -2*radius, 2*radius).onFinishChange(function (value){ pushing(value); });
gui.add(parameters, 'open').onFinishChange(function (value){ path.remove(); init(); });
}

//moving the particles
function movingX(particle, move){
x0 = particle.position.x;
y0 = particle.position.y;
particle.position.x=x0+move;

if(particle.getIntersections(vessel).length>0){
particle.position.x+=-2*(particle.position.x-x0);
particle.position.y+=-2*(particle.position.y-y0);
}
}

//moving the particles
function movingY(particle, move){
x0 = particle.position.x;
y0 = particle.position.y;
particle.position.y=y0+move;

if(particle.getIntersections(vessel).length>0){
particle.position.x+=-2*(particle.position.x-x0);
particle.position.y+=-2*(particle.position.y-y0);
}
}

//force caused moving
function pushing(value){
for(var i in particles){
movingY(particles[i], value);
}
}

function onFrame(event) {
for(var i in particles){
movingX(particles[i], parameters.speed*(Math.random()-0.5));
movingY(particles[i], parameters.speed*(Math.random()-0.5));
}
}
