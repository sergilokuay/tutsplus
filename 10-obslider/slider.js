(function($){
	var sliderUL = $('div.slider').css('overflow','hidden').children('ul'),
		imgs = sliderUL.find('img'), 
		imgWidth = imgs[0].width, // 320
		imgsLen = imgs.length, // 4
		current = 1,
		totalImgsWidth = imgsLen * imgWidth; // 1280
	$('#slider-nav').show().find('button').on('click',function(){
		var direction = $(this).data('dir'),
			loc = imgWidth; //320

		// update current value
		// if (direction === 'next'){
		// 	current += 1;
		// } else {
		// 	current -= 1
		// }
		// Tambien se puede hacer asi: (test)?true:false;
		(direction === 'next')? ++current : --current;

		//if first image
		if(current === 0){
			current = imgsLen;
			loc = totalImgsWidth - imgWidth;
			direction = 'next';
		} else if (current -1 === imgsLen) {//are we at the end?should we reset?
			current = 1;
			loc = 0;
		};
		transition(sliderUL, loc, direction);
	});

	function transition(container,loc,direction){
		var unit; // -= +=

		if (direction && loc !== 0){
			unit = (direction === 'next')? '-=': '+=';
		}

		container.animate({
			'margin-left': unit ? (unit+loc):loc
		});
	}

})(jQuery);