console.log("Snake_Mania");
const foodSound = new Audio('sound/food.mp3');
const gameoverAudio = new Audio('sound/gameover.mp3');
const  moveSound= new Audio('sound/move.mp3');
const gameAudio = new Audio('sound/music.mp3');
let box=document.querySelector('.box');

let inputDir={x:0,y:0};
let lasttime=0;
let speed=5;
let snakeArr=[{x:9,y:7}];

food = {x: 6, y: 7};


// Game Function

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    // console.log(box);
    
    
    if((ctime-lasttime)/1000 < 1/speed){
        return;
    }
   lasttime=ctime;

   
   gameEngine();
}

function isCollide(sarr){
    for(let i=1;i<sarr.length;i++){
        if(sarr[i].x==sarr[0].x && sarr[i].y==sarr[0].y)
        return true;
    }

     // If you bump into the wall
    if(sarr[0].x >= 18 || sarr[0].x <=0 || sarr[0].y >= 18 || sarr[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){

    
    // type 1
    if(isCollide(snakeArr)){
        gameAudio.pause();
        gameoverAudio.play();
        alert("Game over boss GO and study now.....");
        snakeArr=[{x:10,y:5}];
        gameAudio.play();
    }
    // Generate food 

    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}

    }

    // Move snake
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

  
    // type 2 Display snake and food on board.....
    box.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        box.appendChild(snakeElement);

    })
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    box.appendChild(foodElement);


}




// Main Logic

window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});