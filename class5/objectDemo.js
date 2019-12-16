/* Alec Barker */

var gCanvas;
var gContext;

var gCarSally, gCarBob, gCarAlex;

function init()
{
	//put any special initialization code here
	gCanvas = document.getElementById('canvas');
	gContext = gCanvas.getContext('2d');
	
	
	//instantiate object using the constructor function
	gCarSally = new Car('Sally', "#afa", 100, 200);
	gCarBob = new Car('Bob', "#faf", 200, 400);
	gCarAlex = new Car('Alex', "#ffa", 350, 100);
	
	//alert("Jim's demo: "+gCarSally.getInfo()); 

	drawEverything();
	
	
	//hmmmm . . .   Now we need to handle the other cars
}



function drawBackground() 
{
	
	//draw a large gray background for the canvas
	//Notice that the canvas is actually smaller than 1200 x 1200.
	gContext.fillStyle = "rgb(200,200,200)";
	gContext.fillRect (0, 0, 1200, 1200);

}

function drawEverything()
{
	drawBackground();
	
	gCarSally.drawMe();
	gCarBob.drawMe();
	gCarAlex.drawMe();
}

function moveRight(theCarName)
{
	//alert('theCarName     '+theCarName);
	
	if (theCarName == 'Bob')
	{
		gCarBob.moveRight(10);
	}
	else if(theCarName == 'Sally'){
		gCarSally.moveRight(40);
	}
	else if(theCarName == 'Alex'){
		gCarAlex.moveRight(1);
	}
	else if(theCarName == 'Move All Cars'){
		gCarBob.moveRight(10);
		gCarSally.moveRight(40);
		gCarAlex.moveRight(1);
	}
	
	drawEverything();
	
}

/* the original car object demo was from:
 
  https://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html

   this Car has added 'draw' methods added by Jim Klayder
*/

function Car (name, color, over, down) {
    this.name = name;
    this.color = color;
    this.over = over;
    this.down = down;
    
    this.getInfo = function getInfo() {
        return 'name ' + this.name 
        	+ '   color ' + this.color 
        	+ '   over ' + this.over 
        	+ '   down ' + this.down; 
    };
    
    this.moveRight = function moveRight(howFar) {
    	this.over += howFar;
    }
	
	this.drawMe = function drawMe() {
        
		
		//for 'over' and 'down' we will use the Car data members
		//     this.over   and    this.down
		
		var width = 80;
		var height = 25;
	
		//make a large box of the appropriate colot for the basic car
		gContext.fillStyle = this.color;
		gContext.fillRect (this.over, this.down, width, height);
		
		this.drawRoof(this.over, this.down, width, height);
		this.drawFrontEnd(this.over, this.down, width, height);
		
		//draw 2 tires using parameters for over and down locations
		this.drawTire(this.over + width * 0.25, this.down + height);
		this.drawTire(this.over + width * 0.90, this.down + height);
		
		//finally, let's label the car with it's name
		gContext.fillStyle = "#d33";
		gContext.font = "bold 20px sans-serif";
		gContext.fillText(this.name, this.over + width * 0.33, this.down + height * 2.20);
		
		
    };
    
    this.drawTire = function drawTire(over, down) {
    	
    	//draw a circle for a tire
		// http://www.html5canvastutorials.com/tutorials/html5-canvas-circles/
	
		var centerX = over;
		var centerY = down;
		var radius = 10;

		gContext.beginPath();
		gContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		gContext.fillStyle = 'red';
		gContext.fill();
		gContext.lineWidth = 5;
		gContext.strokeStyle = '#003300';
		gContext.stroke();
		  
    }
    
    this.drawRoof = function drawRoof(over, down, width, height) {
    	
    	//gContext.fillStyle = "#555";  //for testing
    	gContext.fillStyle = this.color;
    	
		gContext.beginPath();
		gContext.moveTo(over, down);
		gContext.lineTo(over + width * 0.10, down - height * 0.50);
		gContext.lineTo(over + width * 0.70, down - height * 0.50);
		gContext.lineTo(over + width * 1.00, down - height * 0.00);
		gContext.fill();
		  
    }
    
    this.drawFrontEnd = function drawFrontEnd(over, down, width, height) {
    	
    	//gContext.fillStyle = "#555";  //for testing
    	gContext.fillStyle = this.color;
    	
		gContext.beginPath();
		gContext.moveTo(over + width * 1.00, down + height * 0.00);
		gContext.lineTo(over + width * 1.20, down + height * 0.30);
		gContext.lineTo(over + width * 1.20, down + height * 1.00);
		gContext.lineTo(over + width * 1.00, down + height * 1.00);
		gContext.fill();
		  
    }
}//end function Car 