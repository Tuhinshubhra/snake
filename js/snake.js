function c_snake(l_x, l_y, l_defaultLength, l_speed, l_radius, l_startColor, l_endColor){
	// snake properties
	this.x          = l_x;
	this.y          = l_y;
	this.dx         = 0;
	this.dy         = 0;
	this.color      = "";
	this.startColor = l_startColor;
	this.endColor   = l_endColor;
	this.length     = l_defaultLength;
	this.speed      = l_speed;
	this.radius     = l_radius;
	this.maxLength  = 70;
	this.maxSpeed   = 10;
	this.isAlive    = true;
	this.xpos       = [];
	this.ypos       = [];
	this.move       = false;
	this.cells      = [];
	
	// snake methods
	this.m_createBody = () => {
		let l_colors = this.m_createColorArray(this.startColor, this.endColor, this.maxLength)
		this.color = "rgb(" + l_colors[0].join(",") + ")";
		for (let i=0; i<this.maxLength; i++){
			let l_x = this.x + i * (this.radius) -i
			this.cells[i] = new c_cell(l_x, this.y, this.radius - i/10, "rgb(" + l_colors[i].join(",") + ")");
		}
                
                // add all the values of x to xpos
                for (let i = this.x; i <= this.cells[this.maxLength -1].x; i++){
                    this.xpos.push(i);
                    this.ypos.push(this.y);
                }
	}
	
	this.m_createColorArray = (l_start, l_end, n) => {
		//Distance between each color
		var steps = [
		  (l_end[0] - l_start[0]) / n,  
		  (l_end[1] - l_start[1]) / n,  
		  (l_end[2] - l_start[2]) / n  
		];

		//Build array of colors
		var colors = [l_start];
		for(var ii = 0; ii < n - 1; ++ii) {
		  colors.push([
			Math.floor(colors[ii][0] + steps[0]),
			Math.floor(colors[ii][1] + steps[1]),
			Math.floor(colors[ii][2] + steps[2])
		  ]);
		}
		colors.push(l_end); 

		return colors;
	  };
	
	this.m_addCell = () => {
		(this.length < this.maxLength-1) ? this.length++ : null;
	}
	
	this.m_draw = (l_context) => {
		
		// draw the body
		for (let i=this.length-1; i>=0; i--){
			this.cells[i].m_draw(l_context);
		}

		// draw the head
		l_context.fillStyle = this.color;
		l_context.shadowBlur = 15;
		l_context.shadowColor = this.color;
		l_context.beginPath();
		l_context.arc(this.x + this.radius/2 +1, this.y + this.radius/2 , this.radius+2, 0, Math.PI*2);
		l_context.fill();
		l_context.closePath();
		l_context.shadowColor = 'transparent';
	}
	
	this.m_updateSpeed = (l_flag) => {
		switch(l_flag){
			case 'up':
				if (this.dy == 0){
					this.dy = -this.speed;
					this.dx = 0;
				}
				break;
			case 'down':
				if (this.dy == 0){
					this.dy = this.speed;
					this.dx = 0;
				}
				break;
			case 'left':
				if (this.dx == 0){
					this.dx = -this.speed;
					this.dy = 0;
				}
				break;
			case 'right':
				if (this.dx == 0){
					this.dx = this.speed;
					this.dy = 0;
				}
				break;
		}
		(!this.move) ? this.move = true : null;
	}
	
	this.m_move = () => {
		if (this.move){
			for (let i=0; i<this.speed; i++){
				for (let j=this.xpos.length-1; j>0; j--){
					this.xpos[j] = this.xpos[j-1];
					this.ypos[j] = this.ypos[j-1];
				} 
				(this.dx) ? ((this.dx > 0) ? this.xpos[0] += 1 : this.xpos[0] -=1) : null;
				(this.dy) ? ((this.dy > 0) ? this.ypos[0] += 1 : this.ypos[0] -=1) : null;
			}
			for (let i=0; i<this.length; i++){
				this.cells[i].x = this.xpos[i*10]
				this.cells[i].y = this.ypos[i*10]
			}
			this.x = this.xpos[0];
			this.y = this.ypos[0];
		}
	}
}

function c_cell(l_x, l_y, l_radius, l_color){
	// Cell properties
	this.x      = l_x;
	this.y      = l_y;
	this.radius = l_radius;
	this.color  = l_color;
			
	// cell methods
	this.m_draw = (l_context) => {
		l_context.fillStyle = this.color;
		l_context.save();
		l_context.shadowBlur = 15;
		l_context.shadowColor = this.color;
		l_context.beginPath();
		l_context.arc(this.x + this.radius/2, this.y + this.radius/2 , this.radius, 0, Math.PI*2);
		l_context.fill();
		//l_context.stroke();
		l_context.closePath();
		l_context.restore();
	}
}