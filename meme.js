/*

Meme.js

Use one function to generate a meme.

********************************************************************************

Copyright (c) 2012 BuddyMeme

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

window.Meme = function(image, canvas, topText, bottomText) {

	/*
	Deal with the canvas
	*/

	// If it's nothing, set it to a dummy value to trigger error
	if (!canvas)
		canvas = 0;

	// If it's a string, conver it
	if (canvas.toUpperCase)
		canvas = document.getElementById(canvas);

	// If it's jQuery or Zepto, convert it
	if (canvas instanceof $)
		canvas = canvas[0];

	// Throw error
	if (!(canvas instanceof HTMLCanvasElement))
		throw new Error('No canvas selected');

	/*
	Deal with the image
	*/

	// If there's no image, set it to a dummy value to trigger an error
	if (!image)
		image = 0;

	// Convert it from a string
	if (image.toUpperCase) {
		var src = image;
		image = new Image();
		image.src = src;
	}

	// Set the proper width and height of the canvas
	var setCanvasDimensions = function(w, h) {
		canvas.width = w;
		canvas.height = h;
	};
	image.onload = function() {
		setCanvasDimensions(image.width, image.height);
	};

};

$(document).ready(function(){
//todo: dynamic text sizing and multiple rows
//possible todo: scumbag hats

//initializes a new javascript image, and sets the source to a value passed from php
  var img = new Image();
  img.src = 'https://fbcdn-sphotos-a.akamaihd.net/hphotos-ak-snc6/270682_2052357142431_1049580821_32284789_3039041_n.jpg';
  //sets the can and context variables of the canvas
  var can = document.getElementById('canvas');
  var ctx = can.getContext('2d');

//when the image loads, i basically draw the image object onto the canvas element, with no text on it
  img.onload = function(){    	
  	ctx.drawImage(img,0,0);
  };

function changeFontSize(newFontSize,multiplier){
	if(fontSize == origFontSize){
		ctx.font = newFontSize+"pt Impact";
		return newFontSize;
	} else {
		return origFontSize * multiplier;
	}
}

//drawText adds text to the image. Unfortunately, the only way to do this is to erase the canvas completely and then redraw the entire thing with new text.
  function drawText(top, bottom){

	fitWidth = 533;
	//draw an image with no text onto the canvas
  	ctx.drawImage(img,0,0);

	//set the font styles
  	ctx.fillStyle = "white";
  	ctx.strokeStyle = "black";
  	ctx.lineWidth = 2;
  	//we will need to dynamically alter the font size based on the character count
  	fontSize = origFontSize = 52;
  	multiplier = .75;
  	ctx.font = fontSize+"pt Impact";
 		ctx.textAlign = "center";
 		lineHeight = 1.33;
 				
 		var x = can.width/2;
 		var y = fontSize*lineHeight;
 		//width of the text to be drawn
 		width = ctx.measureText(top).width;

	var words = top.split(' ');
	var currentLine = 0;
	var idx = 1;
	while (words.length > 0 && idx <= words.length) {
      	var str = words.slice(0,idx).join(' ');
      	var w = ctx.measureText(str).width;
      	if ( w > fitWidth ) {
          	if (idx==1) {
              	idx=2;
          	}
          	fontSize = changeFontSize(fontSize*multiplier, multiplier);
          	y = fontSize*1.33;
          	ctx.fillText( words.slice(0,idx-1).join(' '), x, y + (fontSize*lineHeight*currentLine), 533 );
          	ctx.strokeWidth = fontSize/16 + "px";
          	ctx.strokeText( words.slice(0,idx-1).join(' '), x, y + (fontSize*lineHeight*currentLine), 533 );
          	currentLine++;
          	words = words.splice(idx-1);
          	idx = 1;
      	} else {
      		idx++;
      	}
  	}
  			
	if  (idx > 0) {
      	ctx.fillText( words.join(' '), x, y + (fontSize*lineHeight*currentLine), 533);
          ctx.strokeWidth = fontSize/16 + "px";
      	ctx.strokeText( words.join(' '), x, y + (fontSize*lineHeight*currentLine), 533);
	}

	//REPEAT THE ABOVE, BUT FOR THE BOTTOM
 		var y = 720 - fontSize*lineHeight+fontSize;
	while(ctx.measureText(bottom).width>fitWidth){
		fontSize = .9*fontSize;
		ctx.font = fontSize + "pt Impact";
	}

     	ctx.fillText( bottom, x, y, 533);
     	ctx.strokeWidth = fontSize/16 + "px";
     	ctx.strokeText( bottom, x, y, 533);

  }

//after every keystroke into the form
  $('.memetext').keyup(function() {
	//get the form values
	var toptext = $('.toptext').val();
	var bottomtext = $('.bottomtext').val();

	//pass the values into the draw function
	drawText(toptext, bottomtext);
});

//once clicking submit
$('#post').click(function(){
	//save canvas element to a data uri
  mixpanel.track("Submitted Meme");
	dataURI = can.toDataURL();
	//pass the data uri to a server to generate an image
	//saveImage(dataURI);
  var body = 'Reading JS SDK documentation';
  $('#formimage').val(dataURI);
  $('#form').submit();
/*  var formData = new FormData();

/*  for (var i = 0, dataURI; dataURI = dataURI[i]; ++i) {
    formData.append(dataURI.name, dataURI);
  } */
/*  formData.append('source', dataURI.replace(/^data:image\/\w+;base64,/, ""));
  formData.append('message', 'test');

  $.ajax({
    type:'POST',
    url: 'http://talktomindy.com/saveImage.php',
    data: {image:dataURI, hash:'test'},
    success: function(){
      alert('test');
    }
  })
  FB.api('/me/photos', 'post', formData, function(response) {
    if (!response || response.error) {
      alert('Error occured: ' + JSON.stringify(response.error));
    } else {
      alert('Post ID: ' + response.id);
    }
  });
*/
/*  data = {data:dataURI};
  $.ajax({
    type: 'POST',
    url: 'writer',
    data: data,
    success: function(){ alert('woohoo')},
  });
*/
});

});
