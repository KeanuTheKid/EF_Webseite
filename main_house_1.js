//4k 3840x2160 1080p 1920x1080 720p 1280x720 480p 854x480
let scale = 1;
if(window.screen.width >= 1920){
  scale = 1;
}
else {
  scale = 1;
}

const SpiderImage = new Image();
SpiderImage.src = 'assets/spider.png';
const FoodImage = new Image();
FoodImage.src = 'assets/food.jpg';


const can = document.getElementById("myCanvas")
let ctx = can.getContext("2d")
const player = document.querySelector('.player')
const can_pos = {
  x: parseInt(-684 * scale), 
  y: parseInt(-13* scale)
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
  {x:0,y:80,width:700,height:30},
  {x:-30,y:100,width:40,height:400},
  {x:-30,y:500,width:750,height:40},
  {x:690,y:100,width:30,height:400},
  { x: 0, y: 110, width: 380, height: 40, id: 'wall' },//wall(boarder)
  { x: 320, y: 256, width: 110, height: 100, id: 'table' },//table
  { x: 250, y: 266, width: 50, height: 40, id: 'c1' },//chair 1
  { x: 250, y: 326, width: 50, height: 40, id: 'c2' },//chair 2
  { x: 450, y: 266, width: 50, height: 40, id: 'c3' },//chair 3
  { x: 450, y: 326, width: 50, height: 40, id: 'c4' },//chair 4
  { x: 0, y: 450, width: 50, height: 50, id: 'b11' },//pot(left)
  { x: 640, y: 450, width: 50, height: 50, id: 'b12' },//pot(right)



]


function draw() {
  can.width = 2 * window.innerWidth;
  can.height = 2 *  window.innerHeight;
  ctx.beginPath()
  ctx.strokeStyle = "transparent"
  ctx.lineWidth = "1"
  rectangles.forEach(rect => {
    ctx.rect(rect.x*scale, rect.y*scale, rect.width*scale, rect.height*scale);

  });

  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = "transparent"
  ctx.lineWidth = "1"
  ctx.rect(230, 460, 100, 50); //door outside
  ctx.stroke()
}
//image collison
let TV_x = 300;
let TV_y = 100;
let TV_w = 90;
let TV_h= 100;
//image 
let imagex_tv = 320;
let imagey_tv = 85;
let imagew_tv = 50;
let imageh_tv= 30;

let food_x = 120;
let food_y = 100;
let food_w = 100;
let food_h= 80;
//image 
let imagex_f = 220;
let imagey_f = 185;
let imagew_f = 300;
let imageh_f= 200;
function popup() {
  if (
    player_pos.x >= TV_x && // from left
    player_pos.x <= TV_x + TV_w && // from right
    player_pos.y >= TV_y && // from above
    player_pos.y <= TV_y + TV_h // from below
  ) {
    ctx.beginPath();
    ctx.strokeStyle = "transparent";
    ctx.lineWidth = "1";
    ctx.drawImage(SpiderImage, imagex_tv, imagey_tv, imagew_tv, imageh_tv); 
    ctx.stroke();
  } else {
    ctx.clearRect(imagex_tv, imagey_tv, imagew_tv, imageh_tv); 
  }
  if (
    player_pos.x >= food_x && // from left
    player_pos.x <= food_x + food_w && // from right
    player_pos.y >= food_y && // from above
    player_pos.y <= food_y + food_h // from below
    
  ) {
    ctx.beginPath();
    ctx.strokeStyle = "transparent";
    ctx.lineWidth = "1";
    ctx.drawImage(FoodImage, imagex_f, imagey_f, imagew_f, imageh_f); 
    ctx.stroke();
  }
  else {
    ctx.clearRect(imagex_f, imagey_f, imagew_f, imageh_f); 
  }
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
  popup();
  doors();
  requestAnimationFrame(run);
}





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
      console.log("Collision: " + rect.id + "=" + rect.x + "/" + player_pos.x + "::: " + rect.y + "/" + player_pos.y + "--- " );
    } 
  });

  return collided;
  
  

}
function doors() {
  if (player_pos.x >=  230 && //from left
    player_pos.x <= 230 + 100 && //from right
    player_pos.y  >= 460 && //from above
    player_pos.y <= 460 + 50 //from under
  ) { //door house 1
    
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
      
  }
  if (e.key == "S" || e.key == "s") {
    checkCollision()
    player_vel.y = 3
    player.style.backgroundImage = 'url("assets/player_back.png")'
    
  }
  if (e.key == "A" || e.key == "a") {
    checkCollision()
    player_vel.x = -3
    player.style.backgroundImage = 'url("assets/player_left.png")'
    
  }
  if (e.key == "D" || e.key == "d") {
    checkCollision()
    player_vel.x = 3
    player.style.backgroundImage = 'url("assets/player_right.png")'
    
  }
  player.classList.add('active')
})
window.addEventListener('keyup', function () {
  player_vel.x = 0
  player_vel.y = 0
  player.classList.remove('active')
})

