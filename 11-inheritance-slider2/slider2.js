function Slider (container,nav){
	this.container = container;
	this.nav = nav.show();

	this.imgs = this.container.find('img');
	this.imgWidth = this.imgs[0].width;	
	this.imgsLen = this.imgs.length;

	this.current = 0; // Ahora prueba en zero base
}

Slider.prototype.transition = function(coords){
	this.container.animate({
		'margin-left': coords || -(this.current * this.imgWidth)
	})
}

Slider.prototype.setCurrent = function(dir){
var pos = this.current; // asi lo hacemos mas legible


	pos += (~~( dir === 'next') || -1); // '~~' hace de un valor bool true=1 y false=0 
	
	this.current = (pos < 0)? this.imgsLen - 1: pos % this.imgsLen; // no cambiamos este this.current por pos, porque al final lo que queremos es actualizar el valor de this.current, no de pos.// 1%4=1,2%4=2,3%4=3,4%4=0 esto es un truco para resetear a cero cuando la pos = 4 (con la quinta imagen, que no hay, retorna a cero, la primera)
	return pos;
};
