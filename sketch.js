class Ball {
  constructor(x, y, r, speedX, speedY, color, maxCount) {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 30;
    this.speedX = 7;
    this.speedY = 5;
    this.count = 0;
    this.color = (255, 255, 255);
    this.maxCount = 7;
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2);
  }

  move() {
    if (this.x < this.r || this.x > width - this.r) {
      this.speedX = -this.speedX;
      // this.color = color(random(255), random(255), random(255));
      // this.count++;
    }
    if (this.y < this.r || this.y > height - this.r) {
      this.speedY = -this.speedY;
      this.color = color(random(255), random(255), random(255));

      if (this.count === this.maxCount + 1) {
        this.count = 0;
      }
      this.count++;
    }
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
  }
}

let ball;
let firstClick, secondClick;
let correctClicks;
let wrongClick;
let sliderSize, sliderSpeed, startButton;
let defaultSize, defaultSpeed;
let firstCount;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  ball = new Ball();
  firstClick = false;
  secondClick = false;
  correctClicks = 0;
  wrongClick = false;
  firstCount = 4;

  textAlign(CENTER);

  defaultSize = 30;
  sliderSize = createSlider(10, 60, defaultSize);
  sliderSize.position(70, 10);
  sliderSize.style("width", "80px");
  sliderSize.input(changeSize);

  defaultSpeed = 10;
  sliderSpeed = createSlider(5, 20, defaultSpeed);
  sliderSpeed.position(70, 30);
  sliderSpeed.style("width", "80px");
  sliderSpeed.input(changeSpeed);

  noLoop();
  startButton = createButton("start");
  startButton.position(50, 60);
  startButton.mousePressed(start);
}

function changeSize() {
  ball.r = sliderSize.value();
}

function changeSpeed() {
  ball.speedX = sliderSpeed.value();
  ball.speedY = sliderSpeed.value() - 2;
}

function start() {
  if (ball.x < ball.r) {
    ball.x = ball.r;
  } else if (ball.x > width - ball.r) {
    ball.x = width - ball.r;
  }
  if (ball.y < ball.r) {
    ball.y = ball.r;
  } else if (ball.y > height - ball.r) {
    ball.y = height - ball.r;
  }

  ball.count = 0;
  firstClick = false;
  secondClick = false;
  correctClicks = 0;
  wrongClick = false;
  loop();
}

function draw() {
  background(0);

  fill(255);
  textSize(14);
  text("ball size", 35, 25);
  text("ball speed", 35, 45);

  ball.display();
  ball.move();

  print(ball.count);

  //   if (ball.count === ball.maxCount + 1) {
  //     print(click);
  //     if (click === false) {
  //       fill(255);
  //       textSize(32);
  //       text("correct hits: " + correctClicks, width / 2, height / 2);
  //       noLoop();
  //       print(correctClicks);
  //     } else {
  //       click = false;
  //       ball.count = 1;
  //     }
  //   } else if (ball.count < ball.maxCount) {
  //     if (wrongClick === true) {
  //       fill(255);
  //       textSize(32);
  //       text("correct hits: " + correctClicks, width / 2, height / 2);
  //       noLoop();
  //     }
  //   }

  if (ball.count < firstCount + 1) {
    if (wrongClick === true) {
      fill(255);
      textSize(32);
      text("correct hits: " + correctClicks, width / 2, height / 2);
      noLoop();
    }
  } else if (ball.count === firstCount + 1) {
    print(firstClick);
    if (firstClick === false) {
      fill(255);
      textSize(32);
      text("correct hits: " + correctClicks, width / 2, height / 2);
      noLoop();
      print(correctClicks);
    }
  } else if (ball.count > firstCount + 1 && ball.count < ball.maxCount + 1) {
    if (wrongClick === true) {
      fill(255);
      textSize(32);
      text("correct hits: " + correctClicks, width / 2, height / 2);
      noLoop();
    }
  } else if (ball.count === ball.maxCount + 1) {
    print(secondClick);
    if (secondClick === false) {
      fill(255);
      textSize(32);
      text("correct hits: " + correctClicks, width / 2, height / 2);
      noLoop();
      print(correctClicks);
    } else {
      firstClick = false;
      secondClick = false;
      ball.count = 1;
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    // if (isLooping() === false) {
    //   start();
    // } else {
    //   if (ball.count === ball.maxCount) {
    //     click = true;
    //     correctClicks++;
    //     print(correctClicks);
    //   } else if (ball.count < ball.maxCount) {
    //     wrongClick = true;
    //   }
    // }

    if (isLooping() === false) {
      start();
    } else {
      if (ball.count === firstCount) {
        firstClick = true;
        correctClicks++;
        // print(correctClicks);
      } else if (ball.count < firstCount) {
        wrongClick = true;
      }

      if (ball.count === ball.maxCount) {
        secondClick = true;
        correctClicks++;
        // print(correctClicks);
      } else if (ball.count > firstCount && ball.count < ball.maxCount) {
        wrongClick = true;
      }
    }
  }

  return false;
}
