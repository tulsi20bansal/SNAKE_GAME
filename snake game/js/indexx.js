// CONSTANTS AND VARIABLES 

let inputDir={x:0,y:0}; //for initial direction of snake
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('move.mp3');
const musicSound=new Audio('music.mp3');
let speed=7;
let lastPaintTime=0;
let score=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7};

// FUNCTIONS 

//this function main is for game loop
function main(ctime)
{
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}

 
    function isCollide(snake)
    {
        // if u bump into urself
        for(let i=1;i<snakeArr.length;i++)
        {
            if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
            {
                return true;
            }
        }
        // //if u bump into urself

        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y<=0 || snake[0].y>=18)
        {
            return true;
        } 
    }

function gameEngine()
{
    //part 1 is to update the snake array and food which contains locations of snake
   
    
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("press any key to play again");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
    }

    //if u have eaten the food ,increment the score and snakearray and regenerate the food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y)
    {
        foodSound.play();
        score=score+1;
        if(score>hiscoreval)
        {
            hiscoreval=score;
            localStorage.getItem("hiScore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="HiScore: "+hiscoreval;
        }
        scoreBox.innerHTML="Score:"+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }

    //move the sname ie update the x and y

    for(let i=snakeArr.length-2;i>=0;i--)
    {
        // const element=snakeArr[i];
        // snakeArr[i+1]=snakeArr[i];
        snakeArr[i+1]={...snakeArr[i]}; //made equal to new obj so put 3 dots

    }
    snakeArr[0].x=snakeArr[0].x+inputDir.x;
    snakeArr[0].y=snakeArr[0].y+inputDir.y;

    //part 2 is to display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>
    {
        snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        // snakeElement.classList.add('snake');
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else{

            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //display the food

    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


     //part 2 is to display the snake
}


// MAIN LOFIC STARTS HERE 
musicSound.play();
  let hiscore=localStorage.getItem("hiscore");
    if(hiscore===null)
    {
        hiscoreval=0;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
    }
    else{
        hiscoreval=JSON.parse(hiscore);
        hiscoreBox.innerHTML="HiScore:"+hiscore;
    }

window.requestAnimationFrame(main);

window.addEventListener("keydown",e=>
{
    inputDir={x:0,y:1} //start the game
    moveSound.play();
  
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

            case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

            case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
            case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
})