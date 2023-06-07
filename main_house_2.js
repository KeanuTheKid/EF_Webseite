//4k 3840x2160 1080p 1920x1080 720p 1280x720 480p 854x480
let scale = 1;
if(window.screen.width >= 1920){
  scale = 1;
}
else {
  scale = 1;
}

const BoardImage = new Image();
BoardImage.src = 'assets/board.png';
const BookImage = new Image();
BookImage.src = 'assets/book.jpg';

const can = document.getElementById("myCanvas")
let ctx = can.getContext("2d")
const player = document.querySelector('.player')
const can_pos = {
  x: parseInt(-642 * scale),
  y: parseInt(-30* scale)
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
 
  
  { x: -30, y: 100, width: 40, height: 400 },
  { x: -30, y: 500, width: 750, height: 40 },
  { x: 690, y: 100, width: 30, height: 400 },
  { x: 0, y: 110, width: 700, height: 40, id: 'wall' },//wall(boarder)
  { x: 555, y: 150, width: 150, height: 40, id: 'table' },//shelf
  { x: 280, y: 240, width: 140, height: 70, id: 'c1' },//table
  { x: 290, y: 340, width: 50, height: 40, id: 'c2' },//chair 1
  { x: 360, y: 340, width: 50, height: 40, id: 'c3' },//chair 2
  { x: 10, y: 440, width: 60, height: 50, id: 'b11' },//pot(left)
  { x: 630, y: 440, width: 60, height: 50, id: 'b12' },//pot(right)



]


function draw() {
  can.width = 2 * window.innerWidth;
  can.height = 2 *  window.innerHeight;
  ctx.beginPath()
  ctx.strokeStyle = "transparent"
  ctx.lineWidth = "3"
  rectangles.forEach(rect => {
    ctx.rect(rect.x*scale, rect.y*scale, rect.width*scale, rect.height*scale);

  });

  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = "transparent"
  ctx.lineWidth = "1"
  ctx.rect(260, 450, 110, 60); //door house 1




  ctx.stroke()
}



//image collison
let b_x = 250;
let b_y = 100;
let b_w = 190;
let b_h= 100;
//image 
let imagex_b = 230;
let imagey_b = 30;
let imagew_b = 250;
let imageh_b= 50;

let book_x = 250;
let book_y = 220;
let book_w = 100;
let book_h= 110;
//image 
let imagex_bk = 220;
let imagey_bk = 185;
let imagew_bk = 300;
let imageh_bk= 200;
function popup() {
  if (
    player_pos.x >= b_x && // from left
    player_pos.x <= b_x + b_w && // from right
    player_pos.y >= b_y && // from above
    player_pos.y <= b_y + b_h // from below
  ) {
    ctx.beginPath();
    ctx.strokeStyle = "transparent";
    ctx.lineWidth = "1";
    ctx.drawImage(BoardImage, imagex_b, imagey_b, imagew_b, imageh_b); 
    ctx.stroke();
  } else {
    ctx.clearRect(imagex_b, imagey_b, imagew_b, imageh_b); 
  }
  if (
    player_pos.x >= book_x && // from left
    player_pos.x <= book_x + book_w && // from right
    player_pos.y >= book_y && // from above
    player_pos.y <= book_y + book_h // from below
    
  ) {
    ctx.beginPath();
    ctx.strokeStyle = "transparent";
    ctx.lineWidth = "1";
    ctx.drawImage(BookImage, imagex_bk, imagey_bk, imagew_bk, imageh_bk); 
    ctx.stroke();
  }
  else {
    ctx.clearRect(imagex_bk, imagey_bk, imagew_bk, imageh_bk); 
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

  doors();
  requestAnimationFrame(run);
  popup();
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
  if (player_pos.x >= 260 && //from left
    player_pos.x <= 260 + 110 && //from right
    player_pos.y >= 450 && //from above
    player_pos.y <= 450 + 60 //from under
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

