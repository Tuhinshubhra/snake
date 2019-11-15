function c_homeScreen(l_canvasWidth, l_canvasHeight, l_buttons){
	this.cHeight       = l_canvasHeight;
	this.cWidth        = l_canvasWidth;
	this.buttonWidth   = l_canvasWidth/4;
	this.margin        = 50;
	this.buttonHeight  = 80;
	this.buttonRadius  = 7;
	this.buttons       = l_buttons;
	this.widthPadding  = (l_canvasWidth - this.buttonWidth)/2;
	this.heightPadding = (l_canvasHeight - (this.buttonHeight * this.buttons.length) - ((this.buttons.length-1) * this.margin))/2;
	
	// assign x and y to buttons
	for (let i=0; i<this.buttons.length; i++){
		this.buttons[i][2] = this.widthPadding; // set x
		this.buttons[i][3] = this.heightPadding + (i * this.buttonHeight) + (i*this.margin); // set y
	}
	
	this.m_draw = (l_context) => {
		for (let i=0; i<this.buttons.length; i++){
			l_context.fillStyle = (this.buttons[i][4]) ? this.buttons[i][1] : "transparent";
			l_context.strokeStyle = this.buttons[i][1];
			l_context.roundRect(this.buttons[i][2], this.buttons[i][3], this.buttonWidth, this.buttonHeight, this.buttonRadius, true);
			l_context.fillStyle = (this.buttons[i][4]) ? "black" : this.buttons[i][1];
			l_context.textAlign = "center"
			l_context.font      = "30px Fredoka One";
			l_context.fillText(this.buttons[i][0], this.buttons[i][2] + this.buttonWidth/2, this.buttons[i][3] + this.buttonHeight/2 + this.margin/6);
		}
	}
}


function c_instructionScreen(l_canvasWidth, l_canvasHeight){
	this.cHeight  = l_canvasHeight;
	this.cWidth   = l_canvasWidth;
	this.title    = "I N S T R U C T I O N S";
	this.buttons  = [["Go Back", "lime", undefined, undefined, false]];
	this.buttonHeight  = 80;
	this.buttonRadius  = 7;
	this.buttonWidth   = l_canvasWidth/4;
	this.margin        = 50;
	this.buttons[0][2] = (l_canvasWidth - this.buttonWidth)/2;
	this.buttons[0][3] = 670;
	
	this.m_draw = (l_context) => {
		// draw title
		l_context.fillStyle = "#9933ff";
		l_context.textAlign = "center"
		l_context.font      = "30px Fredoka One";
		l_context.fillText(this.title, this.cWidth/2, 200);
		
		// Movement
		// player 1
		l_context.fillStyle = "#99ff99";
		l_context.fillText('M O V E M E N T S', this.cWidth/2, 270);
		l_context.fillStyle = "rgb(255, 0, 102)";
		l_context.fillText("Player 1", this.cWidth/2 - 100, 340);
		l_context.font = "20px Fredoka One";
		l_context.fillStyle = "white";
		l_context.fillText("↑ Move Up", this.cWidth/2 - 100, 380);
		l_context.fillText("↓ Move Down", this.cWidth/2 - 100, 410);
		l_context.fillText("→ Move Right", this.cWidth/2 - 100, 440);
		l_context.fillText("← Move Left", this.cWidth/2 - 100, 470);
		
		// player 2
		l_context.font = "30px Fredoka One";
		l_context.fillStyle = "rgb(86, 238, 225)";
		l_context.fillText("Player 2", this.cWidth/2 + 100, 340);
		l_context.font = "20px Fredoka One";
		l_context.fillStyle = "white";
		l_context.fillText("[W] Move Up", this.cWidth/2 + 100, 380);
		l_context.fillText("[S] Move Down", this.cWidth/2 + 100, 410);
		l_context.fillText("[D] Move Right", this.cWidth/2 + 100, 440);
		l_context.fillText("[A] Move Left", this.cWidth/2 + 100, 470);
		
		// different powerups
		l_context.font = "30px Fredoka One";
		l_context.fillStyle = "#99ff99";
		l_context.fillText('P O W E R U P S', this.cWidth/2, 530);
		
		l_context.beginPath()
		l_context.fillStyle = "lime"
		l_context.arc(this.cWidth/8, 580, 15, 0, Math.PI * 2);
		l_context.fill();
		l_context.font = "20px Fredoka One";
		l_context.fillText('Increase length by 7', this.cWidth/8, 620)
		
		l_context.beginPath()
		l_context.fillStyle = "red"
		l_context.arc(this.cWidth/4 + this.cWidth/8, 580, 15, 0, Math.PI * 2);
		l_context.fill();
		l_context.fillText('Decrease length by 7', this.cWidth/4 + this.cWidth/8, 620)
		
		l_context.beginPath()
		l_context.fillStyle = "aqua"
		l_context.arc(this.cWidth/2 + this.cWidth/8, 580, 15, 0, Math.PI * 2);
		l_context.fill();
		l_context.fillText('Increase speed by 7', this.cWidth/2 + this.cWidth/8, 620)
		
		l_context.beginPath()
		l_context.fillStyle = "orange"
		l_context.arc(this.cWidth - this.cWidth/8, 580, 15, 0, Math.PI * 2);
		l_context.fill();
		l_context.fillText('Decrease speed by 7', this.cWidth - this.cWidth/8, 620)
		
		// draw button
		l_context.fillStyle = (this.buttons[0][4]) ? this.buttons[0][1] : "transparent";
		l_context.strokeStyle = this.buttons[0][1];
		l_context.roundRect(this.buttons[0][2], this.buttons[0][3], this.buttonWidth, this.buttonHeight, this.buttonRadius, true);
		l_context.fillStyle = (this.buttons[0][4]) ? "black" : this.buttons[0][1];
		l_context.textAlign = "center"
		l_context.font      = "30px Fredoka One";
		l_context.fillText(this.buttons[0][0], this.buttons[0][2] + this.buttonWidth/2, this.buttons[0][3] + this.buttonHeight/2 + this.margin/6);
	}
}


function c_helpScreen(l_canvasWidth, l_canvasHeight, l_soundEnabled){
	this.cHeight       = l_canvasHeight;
	this.cWidth        = l_canvasWidth;
	this.buttonWidth   = l_canvasWidth/4;
	this.margin        = 50;
	this.sound         = l_soundEnabled;
	this.buttonHeight  = 80;
	this.buttonRadius  = 7;
	this.title         = "S E T T I N G S";
	this.buttons       = [["Sound", "aqua", undefined, undefined, false], ["Go Back", "lime", undefined, undefined, false]];
	this.widthPadding  = (l_canvasWidth - this.buttonWidth)/2;
	this.heightPadding = (l_canvasHeight - (this.buttonHeight * this.buttons.length) - ((this.buttons.length-1) * this.margin))/2;
	
	// assign x and y to buttons
	for (let i=0; i<this.buttons.length; i++){
		this.buttons[i][2] = this.widthPadding; // set x
		this.buttons[i][3] = this.heightPadding + (i * this.buttonHeight) + (i*this.margin); // set y
	}
	
	this.m_draw = (l_context) => {
		// Draw Title
		l_context.fillStyle = "yellow";
		l_context.textAlign = "center"
		l_context.font      = "30px Fredoka One";
		l_context.fillText(this.title, this.cWidth/2, 300);
		
		// Draw buttons
		(this.sound) ? this.buttons[0][1] = "aqua" : this.buttons[0][1] = "lightgray";
		l_context.fillStyle = (this.buttons[0][4]) ? this.buttons[0][1] : "black";
		l_context.strokeStyle = this.buttons[0][1];
		l_context.roundRect(this.buttons[0][2], this.buttons[0][3], this.buttonWidth, this.buttonHeight, this.buttonRadius, true);
		l_context.fillStyle = (this.buttons[0][4]) ? "black" : this.buttons[0][1];
		l_context.textAlign = "center"
		l_context.font      = "30px Fredoka One";
		l_context.fillText(this.buttons[0][0] + ((this.sound) ? " On" : " Off"), this.buttons[0][2] + this.buttonWidth/2, this.buttons[0][3] + this.buttonHeight/2 + this.margin/6);
		
		// back button
		l_context.fillStyle = (this.buttons[1][4]) ? this.buttons[1][1] : "transparent";
		l_context.strokeStyle = this.buttons[1][1];
		l_context.roundRect(this.buttons[1][2], this.buttons[1][3], this.buttonWidth, this.buttonHeight, this.buttonRadius, true);
		l_context.fillStyle = (this.buttons[1][4]) ? "black" : this.buttons[1][1];
		l_context.textAlign = "center"
		l_context.font      = "30px Fredoka One";
		l_context.fillText(this.buttons[1][0], this.buttons[1][2] + this.buttonWidth/2, this.buttons[1][3] + this.buttonHeight/2 + this.margin/6);
	}
	
	this.m_update = (l_status) => {
		this.sound = l_status;
	}
}

function c_gameLogo(l_canvasWidth, l_canvasHeight){
	
	// The game logo and attribution footer text
	
	this.cHeight  = l_canvasHeight;
	this.cWidth   = l_canvasWidth;
	this.title    = ['S', 'N', 'A', 'K', 'E'];
	this.colors   = ['rgb(255, 0, 102)', 'rgb(212, 59, 132)', 'rgb(169, 118, 162)', 'rgb(126, 177, 192)', 'rgb(86, 238, 225)'];
	this.padding  = 10;
	this.width    = 70;
	this.x        = (l_canvasWidth - this.title.length * this.width)/2
	this.y        = 10;
	
	this.m_draw = (l_context, l_currentScreen) => {
		l_context.textAlign = "center";
		(l_currentScreen != 1) ? (l_context.font = "70px Fredoka One", l_context.lineWidth = 3) : l_context.font = "30px Fredoka One";
		let l_x = 0;
		
		for (let i = 0; i<this.title.length; i++){
			l_context.shadowColor = l_context.strokeStyle = l_context.fillStyle = this.colors[i];
			l_x = this.x + i * this.width
			l_context.shadowBlur = 10;
			(l_currentScreen != 1) ? l_context.strokeText(this.title[i], l_x + this.width/2 , this.y + this.width/2 + this.padding/2 + 100) : l_context.strokeText(this.title[i], l_x + this.width/2, this.y + this.width/2 + this.padding/2);
			
		}
		l_context.shadowColor = "transparent"
	}
}