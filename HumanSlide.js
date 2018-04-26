// Options : div, splitNb
// Images : [{src : , }]
// https://stackoverflow.com/questions/21933043/split-an-image-using-javascript
var def = {
	div			: 'HumanSlide',
	canvas		: 'HumanSlideCanvas',
	activeImage : 0,
	splitsNb	: 3
}

class HumanSlide {

	constructor(images, options){
		if(!options) options = {};
		if(!images || typeof images !== 'object') return console.log('Error : you have to pass an array as images');

		this.images		= images;
		this.options	= options;
		console.log(images);
		console.log(options);
		this.assertParams();
		this.insertSplitImg();
	}

	assertParams(){
		this.div			= document.getElementById(this.options.div		|| def.div);
		this.activeImage	= this.options.activeImage	|| def.activeImage;
		this.splitsNb		= this.options.splitsNb		|| def.splitsNb;

		for(var i = 0; i < this.images.length; i++){
			this.images[i] = {src : this.images[i], div : null, parts : []};
		}
		this.length = this.images.length;
	}

	insertSplitImg(){
		for(var i = 0; i < this.images.length; i++){
			console.log('insert split img');
			// Insert image in div
			var image = this.images[i];
			var newImage = document.createElement("img");
			//	newImage.style.display = 'none';
				newImage.setAttribute("src", image.src);
			this.div.appendChild(newImage);
			image.div = newImage;

			// Split image and assert
		}
	}
}
