/*global Player*/
/*global Enemy*/
class Game{
    constructor(screenSize, canvas){
        this.screenSize = screenSize;
        this.canvas = canvas;
        this.fontSize = (1.0*screenSize*30/500);
        this.canvas.font = this.fontSize+"px sans-serif";
        this.player = new Player(screenSize);
        this.enemies = [];
        this.score = 0;
        this.highScore = this.getHighScore();
        this.newEnemy();
    }
    draw(){
        this.canvas.fillStyle = "black";
        this.canvas.fillRect(0, 0, this.screenSize, this.screenSize);
        this.player.draw(this.canvas);
        for (var i = 0; i < this.enemies.length; i++){
            this.enemies[i].draw(this.canvas);
        }
        this.drawScore();
    }
    move(playerRight, playerLeft){
        var cont = true;
        if(playerRight)this.player.moveRight();
        if(playerLeft)this.player.moveLeft();
        for (var i = this.enemies.length-1; i >= 0; i--){
            this.enemies[i].moveDown();
            if (this.enemies[i].y + this.enemies[i].size >= this.player.y){
                if (this.enemies[i].x <= this.player.x + this.player.size &&
                this.enemies[i].x + this.enemies[i].size >= this.player.x){
                    cont = false;
                    break;
                }
                else if (this.enemies[i].y > this.screenSize){
                    this.enemies.splice(i,1);
                    if(Math.random() < 0.99) this.newEnemy();
                }
            }
        }
        if (cont){
            this.draw();
            return true;
        }
        this.over();
        this.drawScore();
        return false;
    }
    drawScore(){
        this.canvas.fillStyle = "white";
        this.canvas.fillText("SCORE: "+ Math.ceil(this.score/5) + " ~ HIGH SCORE: " + this.highScore,5,this.fontSize);

    }
    newEnemy(){
        this.enemies[this.enemies.length] = new Enemy(this.screenSize);
        this.score++;
        this.incrementSpeed();
    }
    incrementSpeed(){
        this.player.incrementSpeed();
        for (var i = 0; i <this.enemies.length; i++){
            this.enemies[i].incrementSpeed();
        }
    }
    over(){
      if (this.getHighScore() < this.score){
        this.saveHighScore(Math.ceil(this.score/5));
        this.highScore = Math.ceil(this.score/5);
        this.drawScore();
      }
      this.enemies = [];
      this.player.die(this.canvas);
      this.player = null;
    }
    saveHighScore(score){
      document.cookie = "high_score="+score+";expires=Tue, 19 Jan 2038 03:14:06 UTC;";
      console.log("Saved: " + document.cookie)
    }
    getHighScore(){
      console.log("Reading: "+document.cookie);
        var cookie = decodeURIComponent(document.cookie);
        console.log(cookie);
        var i  =cookie.indexOf("high_score=");
        if (i > 0){
          cookie = cookie.substring(i+10);
          console.log(cookie);
          var j = cookie.indexOf(';');
          if (j > 0) cookie = cookie.substring(0,j);
          console.log(cookie);
          cookie  = parseInt(cookie);
          if (!isNaN(cookie)) return cookie;
        }
        return 0;
    }
}
