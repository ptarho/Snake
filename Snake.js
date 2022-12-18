class Snake {
    constructor(){
        this.x = 176;
        this.y = 208;
        this.dx = config.cellSize;
        this.dy = 0;
        this.tails = [];
        this.maxTails = 3;
    }

    draw(){
        this.x += this.dx;
        this.y += this.dy;

        this.collision();
        this.tails.unshift( {x: this.x, y: this.y} );

        if (this.tails.length > this.maxTails){
            this.tails.pop();
        }

        this.tails.forEach( (el, index) => {
            if (index == 0){
                context.fillStyle = "#FA0556";
            }else{
                context.fillStyle = "#A00034";
            }
            context.fillRect(el.x, el.y, config.cellSize, config.cellSize)
    
            if (el.x == berry.x && el.y == berry.y){
                score.increase();
                berry.randomPosition();
            }
            
            //Check for snake collision with itself
            if (el.x == this.tails[0].x && el.y == this.tails[0].y && index != 0){
                resetGame();
            }
            
        })
    }

    collision(){
        //Check collision by x coord
        if (this.x < 0){
            this.x = canvas.width - config.cellSize;
        }else if (this.x >= canvas.width){
            this.x = 0;
        }
        //Check collision by y coord
        if (this.y < 0){
            this.y = canvas.height - config.cellSize;
        }else if (this.y >= canvas.height){
            this.y = 0;
        }
    }
}