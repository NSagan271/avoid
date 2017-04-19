/*global $*/
/*global Game*/
'use strict';
var g; //game object
//when next enemy will be created
var countdown = 100;
var moveRight = false;
var moveLeft = false;
$(document).ready(function(){start();});
function start(){//starting or restarting the game
    //hide restart button
    $("#restart").css("display","none");
    var canvas = document.getElementById("game");
    
    //set element positions
    var w = $(window).width();
    var h = $(window).height();
    var s = (w>h)?h:w;
    canvas.width = s*9/10;
    canvas.height = s*9/10;
    var buttonHeight = s/10;
    if (h - (h-s)/2+s >= 10) buttonHeight+=10;
    else buttonHeight = (h-(h-s)/2 +s);
    $("#game").css({"top":((h-s)/2)+"px","left":(w-s*9/10)/2+"px"});
    
    $("#restart").css({"top":(h-s/8)/2+"px","left":(w-(s*0.9)/1.5)/2+"px",
    "width":(s*0.9)/1.5+"px","height":(s*0.9)/8+"px",
    "line-height":(s*0.9)/8+"px", "font-size":(s*0.9)/10+"px"});
    
    $(".btn").css({"top":((h-s)/2+s*9.0/10+1)+"px",
    "width":(s*9/20-10)+"px","height": (buttonHeight-4)+"px",
    "line-height":buttonHeight+"px" ,"font-size":(s*0.9)/10+"px"});
    
    $("#left").css("left",(w-s*9/10)/2+"px");
    $("#right").css("left",(w/2+10)+"px");
    
    //create game object
    g = new Game(s*9/10,canvas.getContext("2d"));
    //start game
    anim();
}
function anim(){//animate game
    countdown--;
    if (countdown == 0){ //create a new enemy
        g.newEnemy();
        countdown = Math.floor(Math.random()*50+75);
    }
    if(g.move(moveRight, moveLeft))requestAnimationFrame(anim);
    else over();
}
function over(){//game over
    g = null;
    $("#restart").css("display","block");
}
$(document).on("keydown",function(event){//move with arrow keys of WASD
    if (event.which == 39 || event.which == 68) moveRight = true;
    if (event.which == 37 || event.which == 65) moveLeft = true;
});
$(document).on("keyup",function(event){//stop moving
    if (event.which == 39 || event.which == 68) moveRight = false;
    if (event.which == 37 || event.which == 65) moveLeft = false;
});