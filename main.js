//4k 3840x2160 1080p 1920x1080 720p 1280x720 480p 854x480
let scale = 1;
if(window.screen.width == 1920 && window.screen.height == 1080){
  scale = 1.15;
}
else {
  scale = 1;
}

const GymImage = new Image();
GymImage.src = 'assets/gym.jpg';
const KesswilImage = new Image();
KesswilImage.src = 'assets/kesswil.png';


const can = document.getElementById("myCanvas")
let ctx = can.getContext("2d")
const player = document.querySelector('.player')
const can_pos = {
  x: parseInt(207 * scale),
  y: parseInt(132* scale)
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
  {x:280,y:166,width:20,height:1100},//west
  {x:280,y:146,width:1450,height:20},//south
  {x:280,y:1246,width:1450,height:20},//north
  {x:1730,y:166,width:20,height:1100},//east
  { x: 280, y: 166, width: 500, height: 40, id: 'fence_1' },//fence(boarder)
  { x: 380, y: 266, width: 400, height: 430, id: 'fence_2' },//fence(trees)
  { x: 990, y: 356, width: 210, height: 140, id: 'house_1' },//house top 
  { x: 990, y: 646, width: 210, height: 140, id: 'house_2' },//house bottom
  { x: 1400, y: 670, width: 165, height: 160, id: 'pstore' },//pokestore
  { x: 990, y: 940, width: 210, height: 180, id: 'pstop' },//pokestop
  { x: 1360, y: 256, width: 245, height: 180, id: 'gym0' },//gym0
  { x: 1470, y: 420, width: 75, height: 40, id: 'gym1' },//gym1
  { x: 450, y: 1080, width: 250, height: 210, id: 'lake' },//lake
  { x: 1200, y: 630, width: 550, height: 30, id: 'fence_3' },//fence(no trees)
  { x: 829, y: 665, width: 35, height: 40, id: 'sign' },//sign(red)
  { x: 1325, y: 400, width: 35, height: 50, id: 'sign1' },//sign(gym)
  { x: 290, y: 956, width: 160, height: 80, id: 'trees_1' },//trees(bottom)
  { x: 1000, y: 156, width: 150, height: 50, id: 'trees_2' },//trees(top)
  { x: 500, y: 1000, width: 75, height: 80, id: 'tree' },//tree
  { x: 785, y: 628, width: 40, height: 35, id: 'b1' },//bush(left,4)
  { x: 785, y: 545, width: 40, height: 35, id: 'b2' },//bush(left,3)
  { x: 785, y: 462, width: 40, height: 35, id: 'b3' },//bush(left,2)
  { x: 785, y: 379, width: 40, height: 35, id: 'b4' },//bush(left,1)
  { x: 785, y: 296, width: 40, height: 35, id: 'b5' },//bush(left,0)
  { x: 950, y: 379, width: 40, height: 35, id: 'b6' },//bush(right,0)
  { x: 950, y: 462, width: 40, height: 35, id: 'b7' },//bush(right,1)
  { x: 950, y: 669, width: 40, height: 35, id: 'b8' },//bush(right,2)
  { x: 950, y: 752, width: 40, height: 35, id: 'b9' },//bush(right,3)
  { x: 1119, y: 500, width: 680, height: 40, id: 'b10' },//bushes + hill
  { x: 995, y: 770, width: 35, height: 35, id: 'b11' },//pot(left)
  { x: 1075, y: 770, width: 120, height: 35, id: 'b12' },//pot(right)
]


function draw() {
  can.width = 2 * window.innerWidth;
  can.height = 2 *  window.innerHeight;
  ctx.beginPath()
  ctx.strokeStyle = "transparent"
  ctx.lineWidth = "0"
  ctx.fillStyle = "red";
  
  rectangles.forEach(rect => {
    ctx.rect(rect.x*scale, rect.y*scale, rect.width*scale, rect.height*scale);

  });

  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = "transparent"
  ctx.lineWidth = "0"
  ctx.fillStyle = "blue";
  ctx.rect(1030*scale, 460*scale, 40*scale, 40*scale); //door house 1
  ctx.rect(1030*scale, 750*scale, 40*scale, 40*scale); //door house 2
  ctx.rect(1490*scale, 790*scale, 40*scale, 45*scale); //door pokestore
  ctx.rect(1075*scale, 1080*scale, 40*scale, 45*scale); //door pokestop
  ctx.rect(1485*scale, 430*scale, 50*scale, 40*scale); //door gym
  ctx.stroke()
}

//image collison
let gym_x = 1300;
let gym_y = 380;
let gym_w = 80;
let gym_h= 90;
//image 
let imagex_gym = 1360;
let imagey_gym = 255;
let imagew_gym = 245;
let imageh_gym= 180;

let kesswil_x = 820;
let kesswil_y = 655;
let kesswil_w = 60;
let kesswil_h= 80;
//image 
let imagex_k = 929;
let imagey_k = 665;
let imagew_k = 700;
let imageh_k= 200;
function popup() {
  if (
    player_pos.x >= gym_x*scale && // from left
    player_pos.x <= gym_x*scale + gym_w*scale && // from right
    player_pos.y >= gym_y*scale && // from above
    player_pos.y <= gym_y*scale + gym_h*scale // from below
  ) {
    ctx.beginPath();
    ctx.strokeStyle = "transparent";
    ctx.lineWidth = "1";
    ctx.drawImage(GymImage, imagex_gym*scale, imagey_gym*scale, imagew_gym*scale, imageh_gym*scale); 
    ctx.stroke();
  } else {
    ctx.clearRect(imagex_gym*scale, imagey_gym*scale, imagew_gym*scale, imageh_gym*scale); 
  }
  if (
    player_pos.x >= kesswil_x*scale && // from left
    player_pos.x <= kesswil_x*scale + kesswil_w*scale && // from right
    player_pos.y >= kesswil_y*scale && // from above
    player_pos.y <= kesswil_y*scale + kesswil_h*scale // from below
    
  ) {
    ctx.beginPath();
    ctx.strokeStyle = "transparent";
    ctx.lineWidth = "1";
    ctx.drawImage(KesswilImage, imagex_k*scale, imagey_k*scale, imagew_k*scale, imageh_k*scale); 
    ctx.stroke();
  }
  else {
    ctx.clearRect(imagex_k*scale, imagey_k*scale, imagew_k*scale, imageh_k*scale); 
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




let up = 0;
let down = 0;
let left = 0;
let right = 0;

function checkCollision() {
  let collided = false;

  rectangles.forEach(rect => {
    if (
      player_pos.x  >= rect.x*scale && //from left
      player_pos.x <= rect.x*scale + rect.width*scale && //from right
      player_pos.y >= rect.y*scale && //from above
      player_pos.y <= rect.y*scale + rect.height*scale //from under
    ) {
      collided = true;
      console.log("Collision: " + rect.id + "=" + rect.x + "/" + player_pos.x + "::: " + rect.y + "/" + player_pos.y + "--- " + up + down + left + right);
    } 
  });

  return collided;
  


}
function doors() {
  if (player_pos.x + playerSize.width >= 1030*scale && //from left
    player_pos.x <= (1030 + 40)*scale && //from right
    player_pos.y + playerSize.height >= 460*scale && //from above
    player_pos.y <= (460 + 40)*scale //from under
  ) { //door house 1
    console.log("door house 1");
    location.replace("index_house_1.html");

  }
  if (player_pos.x + playerSize.width >= 1030*scale && //from left
    player_pos.x <= (1030 + 40)*scale && //from right
    player_pos.y + playerSize.height >= 750*scale && //from above
    player_pos.y <= (750 + 40)*scale //from under
  ) { //door house 2
    console.log("door house 2");
    location.replace("index_house_2.html");
  }
  if (player_pos.x + playerSize.width >= 1490*scale && //from left  
    player_pos.x <= (1490 + 40)*scale && //from right
    player_pos.y + playerSize.height >= 790*scale && //from above
    player_pos.y <= (790 + 45)*scale //from under
  ) { //door pokestore
    console.log("door pokestore");
    location.replace("index_pstore.html");
  }
  if (player_pos.x + playerSize.width >= 1075*scale && //from left
    player_pos.x <= (1075 + 40)*scale && //from right
    player_pos.y + playerSize.height >= 1080*scale && //from above
    player_pos.y <= (1080 + 45)*scale //from under
  ) { //door pokestop
    console.log("door pokestop");
    location.replace("index_pstop.html");
  }
  if (player_pos.x + playerSize.width >= 1485*scale && //from left
    player_pos.x <= 1485*scale + 50*scale && //from right
    player_pos.y + playerSize.height >= 430*scale && //from above
    player_pos.y <= 430*scale + 40*scale //from under
  ) { //door gym
    console.log("door gym");
    location.replace("index_gym.html");
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

