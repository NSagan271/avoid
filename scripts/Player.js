/*global Thing*/
class Player extends Thing{
    constructor(screenSize){
        super(screenSize);
    }
    setCoordinates(){
        this.x = 0;
        this.size = 25 * (this.screenSize/500);
        this.y = this.screenSize - this.size;
    }
    draw(canvas){
        canvas.fillStyle = "blue";
        super.draw(canvas);
    }
    die(canvas){
        canvas.fillStyle = "black";
        canvas.fillRect(0, 0, this.screenSize, this.screenSize);
        canvas.fillStyle = "blue";
        var pieces = 100;
        for (var i = 0; i < pieces; i ++){
            var tempR = (Math.random()*this.size*10 - this.size*5);
            var tempX = this.x + tempR*Math.cos(i*2*Math.PI/pieces);
            var tempY =  this.y - tempR*Math.sin(i*2*Math.PI/pieces);
            var tempS = this.size*(Math.random()*1.0/5+ 1.0/5);
            canvas.fillRect(tempX, tempY, tempS, tempS);
        }
    }
}