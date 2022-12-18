class Berry{
    constructor(){
        this.randomPosition();
    }
    randomPosition(){
        this.x = getRandomInt(0, canvas.width / config.cellSize) * config.cellSize;
        this.y = getRandomInt(0, canvas.height / config.cellSize) * config.cellSize;
    }

    draw(){
        context.beginPath();
        context.fillStyle = "#A00034";
        context.arc(this.x + (config.cellSize / 2 ), this.y + (config.cellSize / 2 ), config.berryRadius, 0, Math.PI*2);
        context.fill();
    }
}