
var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");

var x=canvas.width/2;
var y=canvas.height-80;
var paddleHeight=5;
var paddleWidth=80;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed=false;  
var leftPressed=false;  
var ballRadius=7;
var brickRowCount=4;
var brickColumnCount=12;

var count=brickColumnCount*brickRowCount;

var score = 0;
var lives = 3;  

var brickWidth=60;
var brickHeight=50;
var brickPadding=5;
var brickOffsetTop=30;
var brickOffsetLeft=40;
var stanje;

function stanjeRand () {
	stanje=Math.floor((Math.random() * 4));
	if (stanje <= 1)
		stanje=1;
	else if (stanje > 1 && stanje <= 2)
		stanje=2;		
	else
		stanje=3;	
}

var bricks=[];
for(c=0;c<brickColumnCount;++c){
	bricks[c]=[];
		for(r=0;r<brickRowCount;++r){
			stanjeRand();
			bricks[c][r]={x:0,y:0,status:stanje};	
		}
}

var dx=3.5;
var dy=-3.5;

function drawBall(){
	var ball = new Image;
	ball.src = 'imgs/grapes.png';

	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle="#7A007F";
	ctx.fillStroke="#black";
	ctx.stroke="10";
	ctx.fill();
	ctx.closePath();

}

function drawPaddle(){

	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle="#black";
	ctx.fill();
	ctx.closePath();

}

function drawBricks(){
	
	var brick_img1 = new Image;
	brick_img1.src = 'imgs/wine2.png';
	
	var brick_img2 = new Image;
	brick_img2.src = 'imgs/bottle1.png';
	
	var brick_img3 = new Image;
	brick_img3.src = 'imgs/grape.png';
	
	
	
	for(c=0;c<brickColumnCount;++c){
		for(r=0;r<brickRowCount;++r){
			if(bricks[c][r].status==1){
				var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x=brickX;
				bricks[c][r].y=brickY;
				ctx.beginPath();
				ctx.drawImage(brick_img1,brickX-15,brickY,brickWidth,brickHeight);
				ctx.closePath();
			}
			
			if(bricks[c][r].status==2){
				var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x=brickX;
				bricks[c][r].y=brickY;
				ctx.beginPath();
				ctx.drawImage(brick_img2,brickX-15,brickY,brickWidth,brickHeight);
				ctx.closePath();
			}
			
				if(bricks[c][r].status==3){
				var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft;
				var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop;
				bricks[c][r].x=brickX;
				bricks[c][r].y=brickY;
				ctx.beginPath();
				ctx.drawImage(brick_img3,brickX-15,brickY,brickWidth,brickHeight);
				ctx.closePath();
			}
			
			
		}
	}

}

function collisionDetection(){

	for(c=0;c<brickColumnCount;++c){

		for(r=0;r<brickRowCount;++r){

		var b=bricks[c][r];

			if(b.status==1){
				if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
					dy=-dy;
					b.status=0;
					score++;
					
				}
			}
			
			if(b.status==2){
				if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
					dy=-dy;
					b.status=1;
					
				}
			}
			
			if(b.status==3){
				if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
					dy=-dy;
					b.status=2;
					
					
				}
			}
			
		}

	}

}

function drawScore(){
	ctx.font="18px Arial";
	ctx.fillStyle="#000";
	ctx.fillText("score: "+score,40,20);
}

function drawLives() {
	ctx.font = "18px Arial";
	ctx.fillStyle = "#000";
	ctx.fillText("lives: "+lives, canvas.width-110, 20);
}

function draw(){

	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();


	collisionDetection();

	if(y+dy<ballRadius)
	dy=-dy;
	else if(y+dy>canvas.height-ballRadius){

	if(x>=paddleX && x<=paddleX+paddleWidth){
	dy=-dy;

	}
	else{
	lives--;
	if(lives == -1) {
		swal({title: "GAME OVER", text: "YOU LOSSER BIG L"}).then(function(){
			location.reload();
			});
        clearInterval(draw);
        tocke = 0;
		lives = 3;
	}
	else{
	x=canvas.width/2;
	y = canvas.height-30;
	paddleWidth=80;
	paddleX=(canvas.width-paddleWidth)/2;
	}
	}


	}
	else
	y+=dy;

	if(x+dx<ballRadius || x+dx>canvas.width-ballRadius)
	dx=-dx;
	else
	x+=dx;

	if(rightPressed && paddleX<canvas.width-paddleWidth)
	paddleX+=7;
	else if(leftPressed && paddleX>0)
	paddleX-=7;


		if(score==48){
      
			swal({title: "YOU WON!", text: "You scored "+ tocke+" points", type: "sucess"}).then(function(){
			location.reload();
			});
        clearInterval(draw);
        tocke = 0;
		lives = 3;
		}


}

function keyDownHandler(e){
	
	if(e.keyCode==39)
	rightPressed=true;
	else if(e.keyCode==37)
	leftPressed=true;

}

function keyUpHandler(e){

	if(e.keyCode==39)
	rightPressed=false;
	if(e.keyCode==37)
	leftPressed=false;

}


document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

setInterval(draw, 20);
