$(document).ready(function(){
    let keyLeft = 37, keyRight = 39, keyDown = 40, keyTop = 38, keySpace = 32;
    let spaceship = $("#spaceship"), bullet = $("#bullet"),bar = $('#bar');
    let speed = 5;
    let win_Ht = $(window).height(), win_width = $(window).width();
    let win_calc = win_Ht - 70, win_width_calc = win_width-50;
    let bulletPosTop, bulletPosLeft, barPos, barPosBottom, barPosLeft;
    let score=0, checkAimInt;
    spaceship.css({
        "position": "absolute",
        "left": 10
    });
    bullet.css({
        "display": "none",
        "position": "absolute"
    });

    bar.css({
        "position": "absolute",
        "top": 0,
        "right": 10
    });

    direction = {
        left: false,
        right: false,
        top: false,
        down: false
    }
    bulletSpeed = 1;
    bulletState = {
        state: "available",
        targ: "false"
    }    

    //When Key is Pressed
    $(document).on("keydown", function(e){
        e.preventDefault();
        var pressedKey = e.keyCode;
        if(pressedKey==keyLeft) {
            direction.left = true;
        }
        if(pressedKey==keyRight) {
            direction.right = true;
        }
        if(pressedKey==keyTop) {
            direction.top = true;
        }
        if(pressedKey==keyDown) {
            direction.down = true;
        }
        if(pressedKey==keySpace && bulletState.state ==="available") {
            bulletState.state ="fire";
        }
    });

    //When key is released
    $(document).on("keyup", function(e){
        e.preventDefault();
        var releaseKey = e.keyCode;
        if(releaseKey==keyLeft) {
            direction.left = false;
        }
        if(releaseKey==keyRight) {
            direction.right = false;
        }
        if(releaseKey==keyTop) {
            direction.top = false;
        }
        if(releaseKey==keyDown) {
            direction.down = false;
        }
    });


    //Move function for Spaceship and Bullet
    function move() {
        if(direction.left){
            spaceship.css(
                'left', (spaceship.position().left - speed) + "px"
            );
        }
        if(direction.right){
            spaceship.css(
                'left', (spaceship.position().left + speed) + "px"
            );
        }
        if(direction.top){
            spaceship.css(
                'top', (spaceship.position().top-speed) + "px"
            );
        }
        if(direction.down){
            spaceship.css(
                'top', (spaceship.position().top+speed) + "px"
            );
        }
        if(bulletState.state=="fire") {
            bulletState.state = "unavailable";
            bullet.css({
                "display": "block",
                "left": spaceship.position().left + 50 + "px",
                "top": spaceship.position().top + 58 + "px",
            }).animate({"left": win_width_calc},1000/bulletSpeed, function(){
                bullet.css({
                    "display": "none",
                })
                bulletState.state = "available";
            });
            //checkAim();
            checkAimInt = setInterval(function(){
                bulletPosTop = bullet.css("top").replace("px","");
                bulletPosLeft = bullet.css("left").replace("px","");
                barPos = bar.position().top;
                barPosBottom = bar.position().top + 70;
                barPosLeft = bar.position().left - 20;
                if((bulletPosTop >= barPos) && (bulletPosTop<=barPosBottom) && (bulletPosLeft==win_width_calc)) {
                    console.log("Hit");
                    score = score + 1;
                    bullet.css({
                        "left": spaceship.position().left + 50 + "px",
                        "top": spaceship.position().top + 58 + "px",
                    });
                }
                else if((bulletPosTop < barPos) && (bulletPosTop>=barPosBottom) && (bulletPosLeft === win_width_calc)) {
                    console.log("Miss");
                    score = score;
                }
                document.getElementById("score").innerHTML = score;
            },1);
        }
        if(bulletState.state == "available") {
            clearInterval(checkAimInt);
        }
    }
  
    //Move obstacle
    const obstacleMove = () => {
        if(bar.position().top == 0) {
            bar.animate({"top": win_calc},1000);
        }
        else if(bar.position().top == win_calc) {
            bar.animate({"top": 0},1000);
        }
    }

    //Check Aim of the bullet
    const checkAim = () => {
        
        // if(bulletState.targ == "Hit") {
        //     score = score+1;
        //     document.getElementById("score").innerHTML = score;
        //     bulletState.targ = "false";
        // }
    }

   setInterval(obstacleMove,1000);
  
   setInterval(function(){
       move();
   },10);


});