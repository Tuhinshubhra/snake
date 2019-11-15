function c_powerUp(l_x, l_y, l_radius, l_type){
	this.x = l_x;
	this.y = l_y;
	this.color = ['lime', 'red', 'aqua', 'orange']
	this.radius = l_radius;
	this.type = l_type;
	
	this.m_draw = (l_context, l_percent) => {
		l_context.save();
		l_context.strokeStyle = l_context.fillStyle = l_context.shadowColor = this.color[this.type];
		l_context.shadowBlur = 30;
		//l_context.lineWidth = 1;
		
		l_context.beginPath();
		l_context.arc(this.x + this.radius/2, this.y + this.radius/2 , this.radius - 3, 0, Math.PI*2);
		l_context.fill();
		
		l_context.beginPath();
		l_context.arc(this.x + this.radius/2, this.y + this.radius/2, this.radius + 2, 0, (Math.PI*2)*(l_percent/100));
		l_context.stroke();

		
		l_context.closePath();
		l_context.restore();
	}
}