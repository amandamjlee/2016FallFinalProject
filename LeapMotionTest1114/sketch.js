
var indexfingerPos, indexfingerX, indexfingerY, lastindexfingerX, lastindexfingerY, thumbPos;
var colR = 200;
var pinch, grab, twist, d1, d2;

function setup(){

	createCanvas(innerWidth, innerHeight);
	background(250);

	if(indexfingerPos == undefined){
		console.log('Are you sure the leap motion is connected?');
	}
}

function draw(){

	if(indexfingerPos != undefined && thumbPos != undefined && d1 != undefined && d2 != undefined){

	 	indexfingerX = indexfingerPos[0];
	 	indexfingerY = indexfingerPos[1];
	 	indexfingerZ = indexfingerPos[2];

	 	lastindexfingerX = indexfingerX;
	 	lastindexfingerY = indexfingerY;
	 	lastindexfingerZ = indexfingerZ;

	 	var lerpX = lerp(indexfingerX,lastindexfingerX,0.6);
	 	var lerpY = lerp(indexfingerY,lastindexfingerY,0.6);
	 	var lerpZ = lerp(indexfingerZ,lastindexfingerZ,0.6);

		var mapX = map(lerpX, -220, 345, 0, width);
		var mapY = map(lerpY, 0, 600, height, 0);
		var mapZ = map(lerpZ, -250, 250, 100, 5);
		var colZ = map(lerpZ, -250, 250, 100, 0);

		noFill();
		strokeWeight(2);
		stroke(colR-colZ, random(230,255)-colZ, random(220,255)-colZ);
		ellipse(mapX, mapY, mapZ, mapZ);

		//* if pinch, turn pink.
		if(pinch>0.7){
			colR = colR + 2;
		} else {
			colR = 200;
		}

		//* if grab, erase all.
		// if(grab>0.9){
		// 	background(255);
		// } else {
		// 	background(255,0);
		// }

		//* if grab, draw black circles.
		if(grab>0.9){
			noStroke();
			fill(10,20,30,30);
			ellipse(mapX+random(-50,50),mapY+random(-50,50),random(100,200));
		} else {
			background(255,0);
		}

		//* if twist, erase all.
		if(twist< -1){
			background(255);
		} else {
			background(255,0);
		}

		console.log(twist);

		// console.log(indexfingerPos, thumbPos);
	}
}



//Analyses the leap motion and stores values in a variable
Leap.loop(function(frame) {

	frame.hands.forEach(function(hand, index, fingers) {
    
 		indexfingerPos = fingers[0].indexFinger.tipPosition;
 		thumbPos = fingers[0].thumb.tipPosition;

 		// console.log(indexfingerPos);

 		//pinch
		pinch = hand.pinchStrength.toPrecision(2);
		//grab
		grab = hand.grabStrength.toPrecision(2);
		
		
		d1 = fingers[0].indexFinger.direction;
	    d2 = fingers[0].middleFinger.direction;

	    var angle = Math.acos(Leap.vec3.dot(d1, d2));

	    var cross = Leap.vec3.create();
	    Leap.vec3.cross(cross, d1, d2);

	    var dir = Leap.vec3.dot(hand.palmNormal, cross);

        if (dir < 0) {
        angle *= -1;
	      }

	    twist = (angle ).toPrecision(2);
	    });
  
  	});

   

