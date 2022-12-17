//Score variables
const scoreField = document.querySelector('.snake__score-field')
let score = 0;
//Output new score into the page
function displayScrore(){
    scoreField.innerHTML = score;
}
//Increase score by 1 point and output it
function uppdateScore(){
    snake.maxTails++;
    score++;
    displayScrore();
}

//Configuration of the game
const config = {
    berryRadius: 4,
    cellSize: 16,
    step: 0,
    maxStep: 6, //Snake`s speed
}

//Snake config
const snake = {
    x: 176,
    y: 208,
    dx: config.cellSize,
    dy: 0,
    tails: [],
    maxTails: 3,
}

//Coordinates of next berry
const berry = {
    x: 0,
    y: 0,
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}
//Canva variables
let canvas = document.querySelector('.snake__canvas');
let ctx = canvas.getContext('2d');

function randomPosBerry(){
    berry.x = getRandomInt(0, canvas.width / config.cellSize) * config.cellSize;
    berry.y = getRandomInt(0, canvas.height / config.cellSize) * config.cellSize;
}

function drawBerry(){   
    ctx.beginPath();
    ctx.fillStyle = "#A00034";
    ctx.arc(berry.x + (config.cellSize/ 2 ), berry.y + (config.cellSize/ 2 ), config.berryRadius, 0, Math.PI*2);
    ctx.fill();
}

function drawSnake(){
    snake.x += snake.dx;
    snake.y += snake.dy;

    collision();
    snake.tails.unshift( { x: snake.x, y: snake.y});

    if ( snake.tails.length > snake.maxTails ){
        snake.tails.pop()
    }

    snake.tails.forEach( function(el, index){
        if (index == 0){
            ctx.fillStyle = "#FA0556";
        }else{
            ctx.fillStyle = "#A00034";
        }
        ctx.fillRect(el.x, el.y, config.cellSize, config.cellSize)

        if (el.x == berry.x && el.y == berry.y){
            uppdateScore();
            randomPosBerry();
        }

        //Check for snake collision with itself
        if (el.x == snake.tails[0].x && el.y == snake.tails[0].y && index != 0){
            resetGame();
        }
        
    })
}
    
function collision(){
    if (snake.x < 0){
        snake.x = canvas.width - config.cellSize;
    }else if (snake.x >= canvas.width){
        snake.x = 0;
    }

    if (snake.y < 0){
        snake.y = canvas.height - config.cellSize;
    }else if (snake.y >= canvas.height){
        snake.y = 0;
    }
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//Change direction of movement
document.addEventListener('keydown', (e) => {
    let key = e.code;
    switch(key){
        case "ArrowDown":
        case "KeyS":
            if (snake.dy != 0) return;
            snake.dx = 0;
            snake.dy = config.cellSize;
            console.log(snake);
            break;

        case "ArrowUp":
        case "KeyW":
            if (snake.dy != 0) return;
            snake.dx = 0;
            snake.dy = -config.cellSize;
            console.log(snake);
            break;

        case "ArrowLeft":
        case "KeyA":
            if (snake.dx != 0) return;
            snake.dx = -config.cellSize;
            snake.dy = 0;
            console.log(snake);
            break;

        case "ArrowRight":
        case "KeyD":
            if (snake.dx != 0) return;
            snake.dx = config.cellSize;
            snake.dy = 0;
            console.log(snake);
            break;
    }
});

function game(){ 
    requestAnimationFrame(game);
    if( ++config.step < config.maxStep) {
        return
    }
    config.step = 0;
    clearCanvas();
    drawSnake(); 
    drawBerry();
}

function resetGame(){
    alert(`Game over! \nYour score is ${score}`);

    //Reset snake config
    snake.x = 176;
    snake.y = 208;
    snake.dx = config.cellSize;
    snake.dy = 0;
    snake.tails = [];
    snake.maxTails = 3;
    
    //Reset score
    score = 0;
    displayScrore();

    randomPosBerry();
}

randomPosBerry();
requestAnimationFrame(game);

