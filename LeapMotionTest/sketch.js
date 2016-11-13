
var indexfingerPos, indexfingerX, indexfingerY, lastindexfingerX, lastindexfingerY;

function setup(){

	createCanvas(innerWidth, innerHeight);

	if(indexfingerPos == undefined){
		console.log('Are you sure the leap motion is connected?');
	}
}

function draw(){

	background(250);

	if(indexfingerPos != undefined){

	 	indexfingerX = indexfingerPos[0];
	 	indexfingerY = indexfingerPos[1];

		var mappedfingerX = map(indexfingerX, 0, 200, 0, width);
		var mappedfingerY = map(indexfingerY, 0, 200, height, 0);

		fill(0);
		rect(mappedfingerX, mappedfingerY, 50, 50);

		console.log(indexfingerPos);

	}

}


//Analyses the leap motion and stores values in a variable
Leap.loop(function(frame) {

	frame.hands.forEach(function(hand, index, fingers) {
    
 		indexfingerPos = fingers[0].indexFinger.positions[0];


 		// fingers[0].indexFinger.positions[0].forEach(function(position){
 			 	
 		// });
   


  });

});