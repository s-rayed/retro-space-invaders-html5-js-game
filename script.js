(function(){
  $(document).ready(function() {
    var game = {};

    game.width = 550;
    game.height = 600;

    game.contextBackground = document.getElementById("backgroundCanvas").getContext("2d");
    game.contextPlayer = document.getElementById("playerCanvas").getContext("2d");

    game.stars = [];
    game.images = [];
    game.doneImages = 0;
    game.requiredImages = 0;


    function init() {
      for(var i = 0; i < game.height; i++){
        game.stars.push({
          x: Math.floor(Math.random() * game.width),
          y: Math.floor(Math.random() * game.height),
          size: Math.random() * 4
        });
      }
      loop();
    }

    function addStars(num){
      for(var i = 0; i < num; i++){
        game.stars.push({
          x: Math.floor(Math.random() * game.width),
          y: game.height + 10,
          size: Math.random() * 4
        });
      }
    }

    function update() {
      addStars(1);
      for (i in game.stars){
        if (game.stars[i].y <= -5){
          game.stars.splice(i, 1)
        }
        game.stars[i].y--;
      }
    }

    function render() {
      game.contextBackground.fillStyle = "white";
      game.contextBackground.clearRect(0, 0, game.width, game.height);
      for (i in game.stars){
        var star = game.stars[i];
        game.contextBackground.fillRect(star.x, star.y, star.size, star.size)
      }
    }

    function loop() {
      requestAnimFrame(function() {
        loop();
      });
      update();
      render();
    }

    function initImages(paths){
      game.requiredImages = paths.length;
      for(i in paths){
        var img = new Image();
        img.src = paths[i];
        game.images[i] = img;
        game.images[i].onload = function() {
          game.doneImages++;
        }
      }
    }

    function checkImages(){
      if (game.doneImages >= game.requiredImages){
        init();
      } else {
        setTimeout(function() {
          checkImages();
        },1)
      }
    }

    game.contextBackground.font = "bold 50px monaco";
    initImages(["img/ship.png", "img/enemy.png", "img/bullet.png"]);

    init();
  });

})();

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();