const g_myCanvas  = document.getElementById('myCanvas')
g_myCanvas.width  = window.innerWidth;
g_myCanvas.height = window.innerHeight;
var g_context   = g_myCanvas.getContext('2d');
const g_FPS       = 60;
const g_timeInterval = 1000/g_FPS;
var g_upFlag      = [false, false];
var g_downFlag    = [false, false];
var g_rightFlag   = [false, false];
var g_leftFlag    = [false, false];
var g_mouseX    = undefined;  
var g_mouseY  = undefined;
var g_clicked = false;
var g_gameStarted = true;
var g_seconds = 0;
var g_frameCount = 0;
var g_currentScreen = 0; // 0 = home || 1 = game || 2 = settings || 3 = pause
var g_soundStatus = JSON.parse(localStorage.getItem('snake_soundStatus'));
var g_score = [0,0];
var g_girdSize = 30
var g_snakeRadius = g_girdSize/2 -2;
var g_powerUpRadius = g_girdSize/2 - 5
var g_powerUp = undefined;
var g_snake = undefined;
var g_powerupSec = 0;
var g_powerupLife = 5;
var g_powerupPercent = 0;
var g_percentIncrementFactor = 1/((g_FPS * g_powerupLife)/100);
var g_hoveredCell = undefined;
var g_gameOver = false;
var g_restartFlag = false;
var g_gameOverMsg = "";
var g_gameLogo       = new c_gameLogo(g_myCanvas.width, g_myCanvas.height);
var g_infoScreen     = new c_instructionScreen(g_myCanvas.width, g_myCanvas.height);
var g_homeScreen     = new c_homeScreen(g_myCanvas.width, g_myCanvas.height, [
						["Start Game", "#ff0066", undefined, undefined, false],  						
						["Instruction", "#9933ff", undefined, undefined, false],  						
						["Settings", "#00ff99", undefined, undefined, false]
					]);
var g_helpScreen     = new c_helpScreen(g_myCanvas.width, g_myCanvas.height, g_soundStatus)

// musics
var g_moveSound            = new Audio('audio/move.mp3');
var g_lengthIncreaseSound  = new Audio('audio/length_increase.wav');
var g_lengthDescreaseSound = new Audio('audio/length_decrease.wav');
var g_speedDescreaseSound  = new Audio('audio/speed_decrease.wav');
var g_speedIncreaseSound   = new Audio('audio/speed_increase.wav');
var g_hitSound             = new Audio('audio/hit.mp3');

// set volume to 0.5
g_moveSound.volume            = 0.5;
g_lengthIncreaseSound.volume  = 0.2;
g_lengthDescreaseSound.volume = 0.5;
g_speedDescreaseSound.volume  = 0.5;
g_speedIncreaseSound.volume   = 0.5;
g_hitSound.volume             = 0.5;




//-----------------------[Adding rounded rectangle to canvas methods]---------------------------//
CanvasRenderingContext2D.prototype.roundRect = function roundRect(x, y, width, height, radius, fill, stroke) {
	if (typeof stroke == "undefined" ) {
		stroke = true;
	}
	if (typeof radius === "undefined") {
		radius = 5;
	}
	this.beginPath();
	this.lineWidth = 5;
	this.moveTo(x + radius, y);
	this.lineTo(x + width - radius, y);
	this.quadraticCurveTo(x + width, y, x + width, y + radius);
	this.lineTo(x + width, y + height - radius);
	this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	this.lineTo(x + radius, y + height);
	this.quadraticCurveTo(x, y + height, x, y + height - radius);
	this.lineTo(x, y + radius);
	this.quadraticCurveTo(x, y, x + radius, y);
	this.closePath();
	if (stroke) {
		this.stroke();
	}
	if (fill) {
		this.fill();
	}
	this.lineWidth = 1;
}