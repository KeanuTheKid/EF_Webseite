//4k 3840x2160 1080p 1920x1080 720p 1280x720 480p 854x480
let scale = 1;
if(window.screen.width >= 1920){
  scale = 1;
}
else {
  scale = 1;
}


const can = document.getElementById("myCanvas")
let ctx = can.getContext("2d")
const player = document.querySelector('.player')
const can_pos = {
  x: parseInt(-660 * scale), 
  y: parseInt(-27* scale)
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
  {x:0,y:100,width:700,height:30},
  {x:-30,y:100,width:40,height:400},
  {x:-30,y:500,width:750,height:40},
  {x:690,y:100,width:30,height:400},
  {x:0,y:100,width:260,height:210,id:'counter'},//counter
  {x:450,y:240,width:120,height:190,id:'v1'},
  {x:70,y:356,width:120,height:70,id:'v1'},
  {x:635,y:250,width:70,height:180,id:'v2'},
  {x:450,y:050,width:180,height:120,id:'v2'},
] 


function draw() {
  can.width = 2 * window.innerWidth;
  can.height = 2 *  window.innerHeight;
  ctx.beginPath()
  ctx.strokeStyle = "transparent"
  ctx.lineWidth = "0"

  rectangles.forEach(rect => {
    ctx.rect(rect.x*scale, rect.y*scale, rect.width*scale, rect.height*scale);

  });

  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = "transparent"
  ctx.lineWidth = "0"
  ctx.rect(240,460,100,50); //door outside




  ctx.stroke()
}
function player_boarder() {
  ctx.beginPath()
  ctx.strokeStyle = "transparent"
  ctx.lineWidth = "0"
  ctx.rect(player_pos.x-playerSize.width/2, player_pos.y-playerSize.height/2, playerSize.width, playerSize.height);
  ctx.stroke()
}


function run() {
  const prevPlayerPos = { x: player_pos.x, y: player_pos.y }; 
  can_pos.x += player_vel.x;
  can_pos.y += player_vel.y;
  can.style.position = 'absolute';
  can.style.left = -1 * can_pos.x + 'px';
  can.style.top = -1 * can_pos.y + 'px';

  player_pos = {
    x: can_pos.x + window.innerWidth / 2,
    y: can_pos.y + window.innerHeight / 2
  };

  if (checkCollision()) {
    
    can_pos.x -= player_vel.x;
    can_pos.y -= player_vel.y;
  }

  doors();
  requestAnimationFrame(run);
  player_boarder();
}




let up = 0;
let down = 0;
let left = 0;
let right = 0;

function checkCollision() {
  let collided = false;

  rectangles.forEach(rect => {
    if (
      player_pos.x  >= rect.x && //from left
      player_pos.x <= rect.x + rect.width && //from right
      player_pos.y >= rect.y && //from above
      player_pos.y <= rect.y + rect.height //from under
    ) {
      collided = true;
      console.log("Collision: " + rect.id + "=" + rect.x + "/" + player_pos.x + "::: " + rect.y + "/" + player_pos.y + "--- " + up + down + left + right);
    } 
  });

  return collided;
  

  
}
function doors() {
  if (player_pos.x  >= 240 && //from left
    player_pos.x <= 240 + 100 && //from right
    player_pos.y  >= 460 && //from above
    player_pos.y <= 460 + 50 //from under
  ) { //door house 1
    console.log("door house 1");
    location.replace("index.html");
  }
}


function init() {
  draw()
  run()
}

init()



window.addEventListener('keydown', function (e) {
  
  if (e.key == "W" || e.key == "w") {
    checkCollision()
      player_vel.y = -3
      player.style.backgroundImage = 'url("assets/player_front.png")'
      up = 1;
  }
  if (e.key == "S" || e.key == "s") {
    checkCollision()
    player_vel.y = 3
    player.style.backgroundImage = 'url("assets/player_back.png")'
    down = 1;
  }
  if (e.key == "A" || e.key == "a") {
    checkCollision()
    player_vel.x = -3
    player.style.backgroundImage = 'url("assets/player_left.png")'
    left = 1;
  }
  if (e.key == "D" || e.key == "d") {
    checkCollision()
    player_vel.x = 3
    player.style.backgroundImage = 'url("assets/player_right.png")'
    right = 1;
  }
  player.classList.add('active')
})
window.addEventListener('keyup', function () {
  player_vel.x = 0
  player_vel.y = 0
  player.classList.remove('active')
})

