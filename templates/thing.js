function mousePressed() {
    if (page === pagechoose) {
      setpage(mouseX * scala > width / 2 ? "student" : "teacher");
    }
    b.clicked();
    bregister.clicked();
    bupload.clicked();
  }
  
  class thing {
    constructor(s, sx, sy, x, y) {
      this.s = s;
      this.x = x || width * 0.5;
      this.y = y || height * 1.2;
      this.sx = sx;
      this.sy = sy;
      this.sf = 0.1;
      this.c = color(255);
      this.size = 10;
      this.seeking = true;
    }
    seekto(x, y) {
      this.sx = x;
      this.sy = y;
    }
    seek() {
      this.x = lerp(this.x, this.sx, this.sf);
      this.y = lerp(this.y, this.sy, this.sf);
    }
    display() {
      fill(this.c);
      textSize(this.size);
      text(this.s, this.x, this.y);
    }
    work() {
      if (this.seeking) this.seek();
      this.display();
    }
  }
  
  class Button {
    constructor(
      s,
      size = 20,
      f = emptyfunction,
      toggleable = false,
      x = 0,
      y = 0,
      t = -10
    ) {
      this.displaylikelink = false;
      this.s = s;
      this.textSize = size;
      this.toggleable = toggleable;
      this.f = f;
      this.position(x, y);
      this.on = false;
      this.theta = radians(t);
      textSize(this.textSize);
      this.w = textWidth(this.s) + this.textSize;
      this.h = textAscent() + this.textSize / 2;
      this.c = this.c_text = this.c_stroke = this.c_lines = color(0, 0);
      this.c_inside = color(255, 0, 69);
      this.c_outside = color(40);
      this.mx = this.my = 0;
      this.lines_theta = radians(80);
      this.lines_d = this.h / tan(this.lines_theta);
      this.lines_dis = 20;
      this.lines_speed = 0.5;
      this.lines_weight = 2;
    }
    position(x, y) {
      this.x = x;
      this.y = y;
    }
    inside() {
      return this.mx > 0 && this.mx < this.w && this.my > 0 && this.my < this.h;
    }
    display_lines() {
      stroke(this.c_lines);
      strokeWeight(this.lines_weight);
      let x1, y1, x2, y2;
      for (
        let i = ((frameCount * this.lines_speed) % this.lines_dis) - this.lines_d;
        i < this.w;
        i += this.lines_dis
      ) {
        x1 = i;
        y1 = this.h;
        x2 = x1 + this.lines_d;
        y2 = 0;
        if (x2 > this.w) {
          y2 = map(x2 - this.w, 0, this.lines_d, 0, this.h);
          x2 = this.w;
        }
        if (x1 < 0) {
          y1 = map(x1, -this.lines_d, 0, 0, this.h);
          x1 = 0;
        }
        line(x1, y1, x2, y2);
      }
    }
    display() {
      push();
      translate(this.x, this.y);
      rotate(this.theta);
      fill(this.c);
      rect(0, 0, this.w, this.h);
      //if( this.inside() )
      //this.display_lines() ;
      textSize(this.textSize);
      textAlign(CENTER, CENTER);
      fill(250);
      text(this.s, this.w / 2, this.h / 2);
      pop();
    }
    display_aslink() {
      push();
      translate(this.x, this.y);
      rotate(this.theta);
      // fill(this.c);
      // rect(0, 0, this.w, this.h);
      //if( this.inside() )
      //this.display_lines() ;
      textSize(this.textSize);
      textAlign(CENTER, CENTER);
      stroke(this.c);
      strokeWeight(2);
      line(this.w * 0.04, this.h * 0.9, this.w * 0.96, this.h * 0.9);
      noStroke();
      fill(this.c);
      text(this.s, this.w / 2, this.h / 2);
      pop();
    }
    clicked() {
      if (!this.inside()) return;
      if (this.toggleable) this.on = !this.on;
      else this.f();
    }
    work() {
      [this.mx, this.my] = translatePoint(
        mouseX * scala,
        mouseY * scala,
        this.x,
        this.y,
        this.theta
      );
      this.c = lerpColor(
        this.c,
        this.inside() ? this.c_inside : this.c_outside,
        0.1
      ); //: lerpColor(this.c, this.c_outside, 0.1);
      // this.c_lines =  //lerpColor(this.c_lines,this.inside()? this.c_outside:this.c_inside, 0.05) ;
      if (this.displaylikelink) this.display_aslink();
      else this.display();
      if (this.on) this.f();
      if (this.inside()) cursor(HAND);
    }
  }
  function translatePoint(absPointX, absPointY, centerX, centerY, theta) {
    // theta in radians
    absPointX -= centerX;
    absPointY -= centerY;
    let c = cos(theta);
    let s = sin(theta);
    return [absPointX * c + absPointY * s, -absPointX * s + absPointY * c];
  }
  function emptyfunction() {}