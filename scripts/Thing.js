class Thing{
    constructor(screenSize){
        this.screenSize = screenSize;
        this.speed = 5 * (screenSize/500);
        this.setCoordinates();
        this.maxSpeed = this.speed*1.1;
    }
    setCoordinates(){
        this.x = 0;
        this.y = 0;
        this.size = 100;
    }
    moveLeft(){
        this.x -= this.speed;
        if (this.x < 0) this.x = 0;
    }
    moveRight(){
        this.x += this.speed;
        if (this.x + this.size > this.screenSize) this.x = this.screenSize - this.size;
    }
    moveUp(){
        this.y -= this.speed;
    }
    moveDown(){
        this.y += this.speed;
    }
    draw(canvas){
        canvas.fillRect(this.x, this.y, this.size, this.size);
    }
    incrementSpeed(){
        if (this.speed < this.maxSpeed) this.speed += 0.005*this.speed*(this.maxSpeed-this.speed);
        else this.speed = this.maxSpeed;
    }
}