function f_handleUserInput(){
	if (g_mouseX && g_mouseY){
		// handle mouse move
		(g_hoveredCell != undefined) ? ((g_currentScreen == 2) ? g_helpScreen.buttons[g_hoveredCell][4] = false : (g_currentScreen == 0) ? g_homeScreen.buttons[g_hoveredCell][4] = false : (g_currentScreen == 3) ? g_infoScreen.buttons[g_hoveredCell][4] = false : null) : null;
									
		
		if (g_currentScreen == 0) {
			for (let i=0; i<g_homeScreen.buttons.length; i++){
				if (g_mouseX >= g_homeScreen.buttons[i][2] && g_mouseX <= g_homeScreen.buttons[i][2] + g_homeScreen.buttonWidth &&
				   g_mouseY >= g_homeScreen.buttons[i][3] && g_mouseY <= g_homeScreen.buttons[i][3] + g_homeScreen.buttonHeight
				   ){
						if (g_clicked){ 
							// Click
							(i == 0) ? g_currentScreen = 1 : (i == 1) ? g_currentScreen = 3 : g_currentScreen = 2;
							g_hoveredCell = undefined;
						} else {
							// Hover
							g_homeScreen.buttons[i][4] = true; // set hover to true
							g_hoveredCell = i;
						} 
						break;
					}
				}
			} else if (g_currentScreen == 2){
				for (let i=0; i<g_helpScreen.buttons.length; i++){
				if (g_mouseX >= g_helpScreen.buttons[i][2] && g_mouseX <= g_helpScreen.buttons[i][2] + g_helpScreen.buttonWidth &&
				   g_mouseY >= g_helpScreen.buttons[i][3] && g_mouseY <= g_helpScreen.buttons[i][3] + g_helpScreen.buttonHeight
				   ){
						if (g_clicked){ 
							// Click
							if (i==0){
								f_toggleSound();
								g_helpScreen.m_update(g_soundStatus);
							} else {
								g_currentScreen = 0;
							}
							g_hoveredCell = undefined;
						} else {
							// Hover
							g_helpScreen.buttons[i][4] = true; // set hover to true
							g_hoveredCell = i;
						} 
						break;
					}
				}
			} else if (g_currentScreen == 3){
				for (let i=0; i<g_infoScreen.buttons.length; i++){
				if (g_mouseX >= g_infoScreen.buttons[i][2] && g_mouseX <= g_infoScreen.buttons[i][2] + g_infoScreen.buttonWidth &&
				   g_mouseY >= g_infoScreen.buttons[i][3] && g_mouseY <= g_infoScreen.buttons[i][3] + g_infoScreen.buttonHeight
				   ){
						if (g_clicked){ 
							// Click
							g_currentScreen = 0;
							g_hoveredCell = undefined;
						} else {
							// Hover
							g_infoScreen.buttons[i][4] = true; // set hover to true
							g_hoveredCell = i;
						} 
						break;
					}
				}
			}
			g_mouseX = g_mouseY = undefined;
			g_clicked = false;
		}
	if (g_gameStarted){
		for (let i in g_snake){
			if (g_upFlag[i]){
				g_snake[i].m_updateSpeed('up');
				g_upFlag[i] = false;
				if (g_soundStatus) g_moveSound.play();
			} else if (g_downFlag[i]){
				g_snake[i].m_updateSpeed('down');
				g_downFlag[i] = false;
				if (g_soundStatus)g_moveSound.play();
			}
			if (g_rightFlag[i]){
				g_snake[i].m_updateSpeed('right');
				g_rightFlag[i] = false;
				if (g_soundStatus)g_moveSound.play();
			} else if (g_leftFlag[i]){
				g_snake[i].m_updateSpeed('left');
				g_leftFlag[i] = false;
				if (g_soundStatus)g_moveSound.play();
			}
		}
	}
}


document.addEventListener('keydown', (l_event) => {
	switch(l_event.key.toLowerCase()){
		case 'arrowup':
			g_upFlag[0] = true;
			break;
		case 'arrowdown':
			g_downFlag[0] = true;
			break;
		case 'arrowleft':
			g_leftFlag[0] = true;
			break;
		case 'arrowright':
			g_rightFlag[0] = true;
			break;
		case 'w':
			g_upFlag[1] = true;
			break;
		case 's':
			g_downFlag[1] = true;
			break;
		case 'a':
			g_leftFlag[1] = true;
			break;
		case 'd':
			g_rightFlag[1] = true;
			break;
		case ' ':
			g_restartFlag = true;
			break;
	}
});

g_myCanvas.addEventListener('mousemove', (l_context) => {
	g_mouseX     = l_context.clientX - g_myCanvas.getBoundingClientRect().x;
	g_mouseY     = l_context.clientY - g_myCanvas.getBoundingClientRect().y;
	g_clicked = false;
});


g_myCanvas.addEventListener('click', (l_context) => {
	g_mouseX     = l_context.clientX - g_myCanvas.getBoundingClientRect().x;
	g_mouseY     = l_context.clientY - g_myCanvas.getBoundingClientRect().y;
	g_clicked = true;
});

window.addEventListener('resize', () => {
	g_myCanvas.width  = window.innerWidth;
	g_myCanvas.height = window.innerHeight;
})