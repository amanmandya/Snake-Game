let grid = document.querySelector(".grid") 
let popup = document.querySelector(".popup"); 
let playAgain = document.querySelector(".playAgain"); 
let scoreDisplay = document.querySelector(".scoreDisplay") 
let left = document.querySelector(".left") 
let bottom = document.querySelector(".bottom") 
let right = document.querySelector(".right") 
let up = document.querySelector(".top") 
let width=10; 
let currentIndex = 0 
let appleIndex=0 
let currentSnake=[2,1,0] 
let direction =1 
let score = 0 
let speed = 0.8
let intervalTime =0 
let interval =0


document.addEventListener("DOMContentLoaded",function(){ 
    var audio=new Audio("music/music.mp3");
    audio.play(); 
  
createBoard();
startGame();

playAgain.addEventListener("click", replay); 
})

//createboard function
function createBoard(){ 
popup.style.display = "none"; 
for(let i=0;i<100;i++){
let div =document.createElement("div") 
grid.appendChild(div) 
}
} 

//startgame function
function startGame(){ 
    
let squares =document.querySelectorAll(".grid div") 
food(squares) 
//random apple 
direction =1 
scoreDisplay.innerHTML=score 
intervalTime=1000 
currentSnake =[2,1,0] 
currentIndex = 0 
currentSnake.forEach(index=>squares[index].classList.add("snake")) 
interval = setInterval(moveOutcome,intervalTime) 
} 

function moveOutcome (){ 
let squares =document.querySelectorAll(".grid div") 
if(checkForHits(squares)){
    var audio=new Audio("music/gameover.mp3");
    audio.play(); 
// alert("you hit something") 

popup.style.display="flex" 
return clearInterval(interval) 
}else{ 
moveSnake(squares) 
}
} 

function moveSnake(squares){
   
let tail = currentSnake.pop() 
squares[tail].classList.remove("snake") 
currentSnake.unshift(currentSnake[0]+direction)  
// movement ends here  
eatApple(squares,tail)  
squares[currentSnake[0]].classList.add("snake")  
}

function checkForHits(squares){  
if(  
(currentSnake[0] + width >=(width*width) && direction === width) ||
(currentSnake[0] % width ===width -1 && direction ===1) ||   
(currentSnake[0] % width === 0 && direction === -1) ||   
(currentSnake[0] - width <= 0 && direction === -width) ||
squares[currentSnake[0] + direction].classList.contains("snake")   
){ 
    
  
return true  
}else{  
return false 
}
}  

function eatApple(squares,tail){ 
if(squares[currentSnake[0]].classList.contains("apple")){ 
    var audio=new Audio("music/food.mp3");
    audio.play(); 
  
squares[currentSnake[0]].classList.remove("apple") 
squares[tail].classList.add("snake") 
currentSnake.push(tail)
food(squares) 
score++ 
scoreDisplay.textContent = score 
clearInterval(interval) 
intervalTime = intervalTime *speed 
interval = setInterval(moveOutcome,intervalTime) 
}
} 

function food(squares){ 
do{ 
appleIndex =Math.floor(Math.random() * squares.length) 
}while(squares[appleIndex].classList.contains("snake")) 
squares[appleIndex].classList.add("apple") 
} 



up.addEventListener("click",()=>direction= -width ) 
bottom.addEventListener("click",()=>direction= +width ) 
left.addEventListener("click",()=>direction= -1 ) 
right.addEventListener("click",()=>direction= 1 )


document.addEventListener("keypress", function(event) {
var audio=new Audio("music/move.mp3");
    audio.play(); 
 if(event.key==='i') direction= -width;
 else if(event.key==='k') direction= +width;
 else if(event.key==='j') direction= -1;
 else if(event.key==='l') direction= 1;
 

});

 function replay() { 
 grid.innerHTML="" 
 createBoard()  
 startGame()  
 popup.style.display = "none"; 
 }  