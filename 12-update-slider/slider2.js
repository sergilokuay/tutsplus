function Slider (container,nav){
	this.container = container; //this ya no se refiere a window, cuando creamos una instancia de Slider (new Slider()) la estamos tratando como un 'constructor' y this ya no se refiere a window, si no a Slider
	this.nav = nav.show();

	this.imgs = this.container.find('img');
	this.imgWidth = this.imgs[0].width;	
	this.imgsLen = this.imgs.length;

	this.current = 0; // Ahora prueba en zero base

	this.events.click.call(this) // this es la instancia Slider
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

Slider.prototype.events = {
	click: function(){
		var self = this; // this se refiere al objeto events, asi que habra que utilizar call() en la instancia Slider utilizando su propio this para setear este de aqui y que se refiera a la instancia Slider
		self.nav.find('button').on('click',function(){
			//aqui this cambia otra vez, se refiere al boton, por, lo que cajeamos la ubicacion de la instancia Slider con la variable self, asi no haria falta usar Slider.setCurrent
			var current = self.setCurrent($(this).data('dir'));
			//$(this) se refiere al objecto jquery button
			self.transition();
		});
	}
}
