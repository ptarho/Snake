class Score{
    //Score variables
    constructor(){
        this.points = 0;
        this.field = document.querySelector('.snake__score-field');
    }
    //Output new score into the page
    display(){
        this.field.innerHTML = this.points;
    }
    //Increase score by 1 point and output it
    increase(){
        snake.maxTails++;
        this.points++;
        this.display();
    }
}