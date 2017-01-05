Meme.js
=======

Use one function to generate a meme.

You can call it all with strings:

```javascript
Meme('dog.jpg', 'canvasID', 'Buy pizza', 'Pay in snakes');
```

Or with a selected canvas element:

```javascript
var canvas = document.getElementById('canvasID');
Meme('wolf.jpg', canvas, 'The time is now', 'to take what\'s yours');
```

Or with a jQuery/Zepto selection:

```javascript
Meme('spidey.jpg', $('#canvasID'), 'Did someone say', 'Spiderman JS?');
```

You can also pass in an image:

```javascript
var img = new Image();
img.src = 'insanity.jpg';
var can = document.getElementById('canvasID');
Meme(img, can, 'you ignore my calls', 'I ignore your screams of mercy');
```

License info is in LICENSE.txt.
