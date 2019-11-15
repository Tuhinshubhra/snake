function f_checkCollison(){
	let l_sumRad = 0;
	let l_distX  = 0;
	let l_distY  = 0;
	
	for (let s in g_snake){
		//-----------------------[snake and powerup collision]--------------------------//
		l_sumRad = g_snake[s].radius + g_powerUp.radius;
		l_distX  = g_snake[s].x - g_powerUp.x;
		l_distY  = g_snake[s].y - g_powerUp.y;
		
		if (l_distX*l_distX + l_distY*l_distY <= l_sumRad*l_sumRad){
			// food and mouth collides
			g_score[s]++;
			switch(g_powerUp.type){
				case 0:
					// Increase length by 7
					(g_snake[s].length+7 > g_snake[s].maxLength) ? g_snake[s].length = g_snake[s].maxLength : g_snake[s].length += 7;
					if (g_soundStatus) g_lengthIncreaseSound.play();
					break;
				case 1:
					// Decrease length by 7
					(g_snake[s].length - 7 < 0) ? g_snake[s].length = 1 : g_snake[s].length -= 7;
					if (g_soundStatus) g_lengthDescreaseSound.play();
					break;
				case 2:
					// Increase speed by 7
					(g_snake[s].speed + 7 > g_snake[s].maxSpeed) ? g_snake[s].speed = g_snake[s].maxSpeed : 
					g_snake[s].speed += 7;
					if (g_soundStatus) g_speedIncreaseSound.play();
					break;
				case 3:
					// Decrease speed by 7
					(g_snake[s].speed - 7 < 0) ? g_snake[s].speed = 1 : g_snake[s].speed -= 7;
					if (g_soundStatus) g_speedDescreaseSound.play();
					break;
			}
			f_spawnNewpowerUp();
		}
		
		//----------------------------[boundery collison]--------------------------//
		if (g_snake[s].x - g_snake[s].radius-2 <= 0 || g_snake[s].x + g_snake[s].radius+2 >= g_myCanvas.width || g_snake[s].y - g_snake[s].radius-2 <= 0 || g_snake[s].y + g_snake[s].radius+2 >= g_myCanvas.height){
			// boundary collision
			g_snake[s].isAlive = false;
		}
		
		//-----------------------[snake to snake collision]--------------------------//
		// head to body collision = the one with head dies
		for (let j=0; j<2; j++){
			for (let i=0; i<g_snake[j].length; i++){
				if (g_snake[s].move){
					if (!(s == j && (i == 0 || i == 1 || i == 2 || i == 3))){
						// no collision for 4 cells of the same snake due to drawing limitations
						l_sumRad = g_snake[s].radius + g_snake[j].cells[i].radius;
						l_distX  = g_snake[s].x - g_snake[j].cells[i].x;
						l_distY  = g_snake[s].y - g_snake[j].cells[i].y;
						if (l_distX*l_distX + l_distY*l_distY <= l_sumRad*l_sumRad){
							// collision
							g_snake[s].isAlive = false;
							console.log(`snake: ${s} cell: ${i} of snake ${j}`);
						}
					}
				}
			}
		}
		
		// head to head collision = both dies
		(s == 0) ? j = 1 : j = 0;
		if (g_snake[s].isAlive){
			l_sumRad = g_snake[s].radius + g_snake[j].radius;
			l_distX  = g_snake[s].x - g_snake[j].x;
			l_distY  = g_snake[s].y - g_snake[j].y;
			if (l_distX*l_distX + l_distY*l_distY <= l_sumRad*l_sumRad){
				// collision
				g_snake[s].isAlive = false;
				g_snake[j].isAlive = false;
			}
		}
	}
}

function f_spawnNewpowerUp(){
	g_powerUp = new c_powerUp(
		g_powerUpRadius + (Math.random()*(g_myCanvas.width-2*g_powerUpRadius)), 
		100+g_powerUpRadius+(Math.random()*(g_myCanvas.height-2*g_powerUpRadius-100)), 
		g_powerUpRadius,
		parseInt(Math.random() * 4)
	)
	g_powerupSec = g_seconds;
	g_powerupPercent = 0;
}

function f_checkIfGameOver(){
	if ((!g_snake[0].isAlive || !g_snake[1].isAlive) && !g_gameOver){
		g_gameOverMsg =(g_score[0] != g_score[1]) ? 'Player ' + ((g_score[0] > g_score[1]) ? '1' : '2') + ' Won by ' + Math.abs(g_score[0] - g_score[1]) + ' points!' : 'Match Draw!';
		g_gameOver = true;
		if (g_soundStatus) g_hitSound.play();
	}
}

function f_handleRestart(){
	if (g_restartFlag){
		if (g_gameOver != false){
			// restart game
			g_upFlag      = [false, false];
			g_downFlag    = [false, false];
			g_rightFlag   = [false, false];
			g_leftFlag    = [false, false];
			g_gameStarted = true;
			g_seconds     = 0;
			g_frameCount  = 0;
			g_score       = [0,0];
			g_powerUp     = undefined;
			g_snake       = undefined;
			g_powerupSec  = 0;
			g_gameOver    = false;
			g_gameOverMsg = "";
			g_snake = [new c_snake(200, g_myCanvas.height/2, 10, 4, g_snakeRadius, [255, 0, 102], [0, 102, 255]),
			new c_snake(g_myCanvas.width - 200, g_myCanvas.height/2, 10, 4, g_snakeRadius, [86, 238, 225],  [176, 255, 39])];
			g_snake[0].m_createBody();
			g_snake[1].m_createBody();
			f_spawnNewpowerUp();
			console.log('Game restarted!')
		} else {
			console.log('here we are')
		}
		g_restartFlag = false;
		
	}
}

function f_clearScreen(){
	var grd = g_context.createRadialGradient(0, 0, 5, 90, 60, 100);
	grd.addColorStop(0, "#001a33");
	grd.addColorStop(1, "#000000");
	g_context.fillStyle = grd;
	g_context.fillRect(0, 0, g_myCanvas.width, g_myCanvas.height);
	
	if (g_currentScreen == 1){
		// write scores
		g_context.font = "20px Fredoka One";
		g_context.textAlign = "center";

		// player 1
		g_context.fillStyle = "rgb(255, 0, 102)";
		g_context.fillText("Player 1", 100, 50);
		g_context.font = "40px Fredoka One";
		g_context.fillText(g_score[0], 100, 100);


		// player 2
		g_context.font = "20px Fredoka One";
		g_context.fillStyle = "rgb(86, 238, 225)";
		g_context.fillText("Player 2", g_myCanvas.width - 100, 50);
		g_context.font = "40px Fredoka One";
		g_context.fillText(g_score[1], g_myCanvas.width - 100, 100);
		
		// if game over !
		if (g_gameOver && g_gameOverMsg != ""){
			g_myCanvas.style.letterSpacing = "5px"
			g_context.shadowColor = "#9933ff";
			g_context.shadowBlur = "30";
			g_context.font = "50px Fredoka One";
			g_context.strokeStyle = "#ff00ff"
			g_context.strokeText(g_gameOverMsg, g_myCanvas.width/2, g_myCanvas.height/2);
			g_myCanvas.style.letterSpacing = "1px";
			g_context.shadowColor = "transparent"
			
			// press space message
			g_context.font = "30px Fredoka One";
			g_context.fillStyle = "#9933ff";
			g_context.fillText("Press [SPACE] to restart game", g_myCanvas.width/2, g_myCanvas.height/2+80);
		}
	} else if (g_currentScreen == 0){
		g_context.font = "20px Fredoka One";
		g_context.textAlign = "center";
		g_context.fillStyle = "#9933ff";
		g_context.fillText("Press [F11] for better view!", g_myCanvas.width/2, g_myCanvas.height - 80);
	}
}

function f_drawObjects(){
	if (g_currentScreen == 0){
		// Home screen
		g_homeScreen.m_draw(g_context);
	} else if (g_currentScreen == 1) {
		// Game Screen
		if (!g_gameOver){
			g_powerUp.m_draw(g_context, g_powerupPercent);
			g_snake[0].m_draw(g_context);
			g_snake[1].m_draw(g_context);
		}
	} else if (g_currentScreen == 2){
		// Help Screen
		g_helpScreen.m_draw(g_context);
	} else {
		g_infoScreen.m_draw(g_context);
	}
	g_gameLogo.m_draw(g_context, g_currentScreen);
}

function f_toggleSound(){
	g_soundStatus = !g_soundStatus;
	localStorage.setItem('snake_soundStatus', g_soundStatus);
}

function f_moveObjects(){
	g_snake[0].m_move();
	g_snake[1].m_move();
}

function f_manageTime(){
	if (g_gameStarted && !g_gameOver){
		g_frameCount++
		g_powerupPercent += g_percentIncrementFactor;
		if (g_frameCount >= g_FPS){
			g_frameCount = 0;
			g_seconds++;
		}
		
		// manage powerup 
		if (g_seconds - g_powerupSec >= g_powerupLife){
			f_spawnNewpowerUp();
		}
	}
}