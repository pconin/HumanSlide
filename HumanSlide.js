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
		var self = this;

		this.images		= images;
		this.options	= options;
		console.log(images);
		console.log(options);
		this.assertParams();
		this.createStyle();
		this.start();
		window.onresize = function(){console.log('resize'); self.resize();};
	}
	// Todo later, get ratio only the first time to remove the callback from insertSplitImg
	getRatio(){

	}

	// Create additional CSS
	createStyle(){

	}

	// Assert parameters
	assertParams(){
		this.div			= document.getElementById(this.options.div		|| def.div);
		this.activeImage	= this.options.activeImage	|| def.activeImage;
		this.splitsNb		= this.options.splitsNb		|| def.splitsNb;

		for(var i = 0; i < this.images.length; i++){
			this.images[i] = {src : this.images[i], parts : []};
		}
		this.length = this.images.length;
	}

	// Rebuild on resize
	resize(){
		for(var i = 0; i < this.images.length; i++){
			for(var j = 0; j < this.images[i].parts.length; j++){
				this.div.removeChild(this.images[i].parts[j]);
			}
		}
		this.start();
	}

	//
	start(){
		this.insertSplitImg();
	}



	insertSplitImg(){
		var self = this;
		// Create image and get ratio
		var image = document.createElement('img');
		image.id  = 'image';
		console.log(this.images);
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

					var part		= document.createElement('div');
					part.className += 'puzzle';
					part.id			= 'piece' + i + 'part' + j;
					part.setAttribute('style', 'background-image:url(\''+ image.src +'\');background-position:0% ' + yPercent + '%;');
					self.div.appendChild(part);

					image.parts[j]	= part;
				}


				// Remove image from parents
				if(document.getElementById('image')) self.div.removeChild(document.getElementById('image'));



			}
		}


	}
}
