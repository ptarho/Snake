//Canva variables
const canvas = document.querySelector('.snake__canvas');
const context = canvas.getContext('2d');

const config = new Config();
const snake = new Snake();
const berry = new Berry(canvas, config);
const score = new Score();



function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}


function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
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
            break;

        case "ArrowUp":
        case "KeyW":
            if (snake.dy != 0) return;
            snake.dx = 0;
            snake.dy = -config.cellSize;
            break;

        case "ArrowLeft":
        case "KeyA":
            if (snake.dx != 0) return;
            snake.dx = -config.cellSize;
            snake.dy = 0;
            break;

        case "ArrowRight":
        case "KeyD":
            if (snake.dx != 0) return;
            snake.dx = config.cellSize;
            snake.dy = 0;
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
    snake.draw(); 
    berry.draw(context, config);
}

function resetGame(){
    alert(`Game over! \nYour score is ${score.points}`);

    //Reset snake config
    snake.x = 176;
    snake.y = 208;
    snake.dx = config.cellSize;
    snake.dy = 0;
    snake.tails = [];
    snake.maxTails = 3;
    
    //Reset score
    score.points = 0;
    score.display();

    berry.randomPosition();
}

requestAnimationFrame(game);

