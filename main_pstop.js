
const can = document.getElementById("myCanvas")
let ctx = can.getContext("2d")
const player = document.querySelector('.player')
const can_pos = {
    x:parseInt(-507),
    y:parseInt(-50)
} 
const player_vel = {
    x: 0,
    y: 0
}
let player_pos = {
    x: can_pos.x + window.innerWidth / 2,
    y: can_pos.y + window.innerHeight / 2
}
//div to can object
let playerRect = player.getBoundingClientRect();
let playerPos = {
  x: playerRect.left,
  y: playerRect.top
};
let playerSize = {
  width: playerRect.width,
  height: playerRect.height
};



const rectangles = [
  //{x:280,y:166,width:1450,height:1100},//worldborder
  {x:190,y:90,width:320,height:130,id:'rezeption'},//rezeption
  {x:520,y:336,width:85,height:100,id:'table'},//table
  {x:520,y:280,width:80,height:50,id:'c1'},//chair 1
  {x:660,y:336,width:50,height:100,id:'c2'},//chair 2
  {x:510,y:95,width:50,height:50,id:'computer'},//computer
  {x:0,y:300,width:100,height:110,id:'stairs'},//stairs


] 

function draw() {
  can.width  = 2*window.innerWidth;
  can.height = 2*window.innerHeight;
  ctx.beginPath()
  ctx.strokeStyle = "red"
  ctx.lineWidth = "3"

rectangles.forEach(rect => {
  ctx.rect(rect.x,rect.y,rect.width,rect.height);

});

  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = "blue"
  ctx.lineWidth = "1"
  ctx.rect(320,460,70,50); //door outside




  ctx.stroke()
}

function run(){
    can_pos.x += player_vel.x
    can_pos.y += player_vel.y
    can.style.position = 'absolute';
    can.style.left = -1*can_pos.x + 'px'
    can.style.top = -1*can_pos.y + 'px'


    player_pos = {
      x: can_pos.x + window.innerWidth / 2,
      y: can_pos.y + window.innerHeight / 2}
    doors()
    requestAnimationFrame(run)
    
}



let up = 0;
let down = 0;
let left = 0;
let right = 0;

function checkCollision() {
  let collided = false;

  rectangles.forEach(rect => {
    if (
      player_pos.x + playerSize.width >= rect.x && //from left
      player_pos.x <= rect.x + rect.width && //from right
      player_pos.y + playerSize.height >= rect.y && //from above
      player_pos.y <= rect.y + rect.height //from under
    ) {
      collided = true;
      console.log("Collision: " + rect.id + "=" + rect.x + "/"+ player_pos.x + "::: "+ rect.y + "/"+player_pos.y+ "--- " + up+down+left+right );
    }
    if (collided) {
      if(left === 1){can_pos.x += 6; 
        left = 0;
      console.log("left");}
      if( right === 1){can_pos.x -= 6;
        right = 0;
      console.log("right");}
      if(up === 1 ){can_pos.y += 6; 
        up = 0;
      console.log("up");}
      if(down === 1){can_pos.y -= 6; 
        down = 0;
      console.log("down");}
      }
  });
}


(320,460,70,50)
function doors(){
  if (player_pos.x + playerSize.width >= 320 && //from left
    player_pos.x <= 320 + 700 && //from right
    player_pos.y + playerSize.height >= 460 && //from above
    player_pos.y <= 460 + 50 //from under
  ) { //door house 1
    console.log("door house 1");
    location.replace("index.html");
  } 
}

  
/*function checkCollision() {
  let collided = false;

  rectangles.forEach(rect => {
    if (
      player_pos.x + playerSize.width >= rect.x) //from left
      {
        let fromLeft = 1;
      }
    else if(player_pos.x <= rect.x + rect.width) //from right
    {
      let fromRight = 1;
    }
      else if(player_pos.y + playerSize.height >= rect.y) //from above
      {
        let fromAbove = 1;
      }
      else if (player_pos.y <= rect.y + rect.height) //from below
      {
        let fromBelow = 1;
      }
   if (fromLeft + fromRight + fromAbove + fromBelow === 4) {collided = true; console.log("collided")}
  });
 
   up = 0;
   down = 0;
   left = 0;
   right = 0;
}*/


  




function init(){
    draw()
    run()
}

init()
window.addEventListener('keydown', function(e){
    if(e.key == "ArrowUp"){
        player_vel.y = -3
        player.style.backgroundImage = 'url("assets/player_front.png")'
        up = 1;
        checkCollision()
    }
    if(e.key == "ArrowDown"){
        player_vel.y = 3
        player.style.backgroundImage = 'url("assets/player_back.png")'
        down = 1;
        checkCollision()
    }
    if(e.key == "ArrowLeft"){
        player_vel.x = -3
        player.style.backgroundImage = 'url("assets/player_left.png")'
        left = 1;
        checkCollision()
    }
    if(e.key == "ArrowRight"){
        player_vel.x = 3
        player.style.backgroundImage = 'url("assets/player_right.png")'
        right = 1;
        checkCollision()
    }
    player.classList.add('active')
})
window.addEventListener('keyup', function(){
    player_vel.x = 0
    player_vel.y = 0
    player.classList.remove('active')
})

