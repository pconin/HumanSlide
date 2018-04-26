// Options : div, splitNb
// Images : [{src : , }]
// https://stackoverflow.com/questions/21933043/split-an-image-using-javascript
var def = {
	div			: 'HumanSlide',
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
		this.createStyle();
		this.assertParams();
		this.insertSplitImg();
	}

	createStyle(){

	}

	assertParams(){
		this.div			= document.getElementById(this.options.div		|| def.div);
		this.activeImage	= this.options.activeImage	|| def.activeImage;
		this.splitsNb		= this.options.splitsNb		|| def.splitsNb;

		for(var i = 0; i < this.images.length; i++){
			this.images[i] = {src : this.images[i], parts : []};
		}
		this.length = this.images.length;
	}

	insertSplitImg(){
		var self = this;
		// Create image and get ratio
		var image = document.createElement('img');
		image.id  = 'image';
		image.src = this.images[0].src;
		this.div.appendChild(image);

		image.onload = function () {
			var ratio = this.height / this.width;

			console.log(ratio);
			this.style.display = 'none';
			self.div.style.height = ratio * self.div.offsetWidth + 'px';

			for(var i = 0; i < self.images.length; i++){
				console.log('insert split img');
				// Create a div
				var image = self.images[i];
				// Add classes puzzle and id piece + i
				for(var j = 0; j < self.splitsNb; j++){
					var yPercent = (100 / (self.splitsNb - 1)) * j;

					console.log(self.splitsNb , j);
					var part		= document.createElement('div');
					part.className += 'puzzle';
					part.id			= 'piece' + i + 'part' + j;
					part.setAttribute('style', 'background-image:url(\''+ image.src +'\');background-position:0% ' + yPercent + '%;');
					console.log(part);
					self.div.appendChild(part);

					image.parts[j]	= part;
				}



			}
		}


	}
}
