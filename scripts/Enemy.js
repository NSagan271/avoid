/*global Thing*/
class Enemy extends Thing{
    constructor(screenSize){
        super(screenSize);
    }
    setCoordinates(){
        this.x = Math.random()*this.screenSize;
        this.y = 0;
        this.size = 10 * (this.screenSize/500);
        this.speed = (Math.random()*4.0+3) * (this.screenSize/500);
    }
    draw(canvas){
        canvas.fillStyle = "red";
        super.draw(canvas);
    }
}
