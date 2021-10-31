let things = [];
let page;
let scala = 1;

function windowResized() {
  resizeCanvas(windowWidth * scala, windowHeight * scala);
}
function preload() { 

    
}
function setup() {
  createCanvas(windowWidth * scala, windowHeight * scala);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  noStroke();
  things.push(
    new thing("Are you a here to teach or to learn?", width / 2, height / 5)
  );
  things.push(new thing("Student", width / 2, height / 20, width / 2, -height));
  setpage("choose");
  c1 = color(0, 0);
  c2 = color(0, 0);
  b = new Button(
    "Go  Back",
    10,
    () => {
      setpage("choose");
    },
    false,
    -width,
    height * 0.9,
    0
  );
  bregister = new Button(
    "Register to program",
    10,
    () => {
      open("http://172.20.10.3:5000/add")
    },
    false,
    -width,
    height * 0.28,
    0
  );
  bupload = new Button(
    "Upload Lesson",
    10,
    () => {
      setpage("choose");
    },
    false,
    -width,
    height * 0.57,
    0
  );
  bask = new Button(
    "Ask a teacher",
    10,
    () => {
      open("http://172.20.10.3:5000/question");
    },
    false,
    2 * width,
    height * 0.28,
    0
  );
  bview = new Button(
    "View Lessons",
    10,
    () => {
      setpage("choose");
    },
    false,
    2 * width,
    height * 0.57,
    0
  );
  sxu = 0;
  sxd = width;
  ghat = loadImage("ghat.png");
  ghatx = width * 0.75;
  ghaty = height * 0.4;
  jhatx = width * 0.25;
  jhaty = height * 0.6;
  jhat = loadImage("jhat.png");
}
let b;
function draw() {
  textAlign(CENTER, CENTER);
  page();
  b.work();
  bregister.work();
  bupload.work();
  bask.work();
  bview.work();
}

function common() {
  c1 = lerpColor(c1, color(100, 20, 50, 150), 0.1);
  fill(c1);
  beginShape();
  vertex(0, 0);
  vertex(sxu, 0);
  vertex(sxd, height);
  vertex(0, height);
  endShape();
  c2 = lerpColor(c2, color(200, 20, 60, 150), 0.1);
  fill(c2);
  beginShape();
  vertex(width, 0);
  vertex(sxu, 0);
  vertex(sxd, height);
  vertex(width, height);
  endShape();

  for (let i = 0; i < things.length; ++i) {
    things[i].work();
  }
  tint(255, fade);

  image(ghat, ghatx, ghaty, width / 3.5, width / 3.5);
  image(jhat, jhatx, jhaty, width / 3.5, width / 3.5);
  textAlign(LEFT, TOP);
  textSize(height * 0.015);
  fill(255);
  text(
    "Opt into helping students learn by clearing their doubts.",
    bregister.x + width * 0.02,
    bregister.y + height * 0.05
  );
  text(
    "You will recieve a message if a student requires help",
    bregister.x + width * 0.02,
    bregister.y + height * 0.075
  );
  text(
    "connect with them or reply directly to the their doubts.",
    bregister.x + width * 0.02,
    bregister.y + height * 0.1
  );

  text(
    "Create lessons or link up material for students to see and interact with,",
    bupload.x + width * 0.02,
    bupload.y + height * 0.05
  );
  text(
    "Add your own lessons to the database for everyone to see!",
    bupload.x + width * 0.02,
    bupload.y + height * 0.075
  );

  text(
    "Find a teacher to help you out! If someone is present,",
    bask.x + width * 0.02,
    bask.y + height * 0.05
  );
  text(
    "and can help you out with your doubts, they will contact you!",
    bask.x + width * 0.02,
    bask.y + height * 0.075
  );
  text(
    "View lessons uploaded by other teachers, interact with models",
    bview.x + width * 0.02,
    bview.y + height * 0.05
  );
  text(
    "in AR/VR/XR and others powered by Computer Vision!",
    bview.x + width * 0.02,
    bview.y + height * 0.075
  );
}
let fade = 0;
let sxu, sxd;
function pagechoose() {
  b.x = lerp(b.x, -width, 0.02);
  bask.x = lerp(bask.x, width * 2, 0.1);
  bview.x = bask.x;
  bregister.x = lerp(bregister.x, -width, 0.02);
  bupload.x = bregister.x;
  fade = lerp(fade, 150, 0.01);
  sxu = lerp(sxu, width * 0.8, 0.01);
  sxd = lerp(sxd, width * 0.2, 0.01);
  ghatx = lerp(ghatx, width * 0.75, 0.01);
  ghaty = lerp(ghaty, height * 0.6, 0.01);
  jhatx = lerp(jhatx, width * 0.25, 0.01);
  jhaty = lerp(jhaty, height * 0.4, 0.01);
  clear();
  fill(255, fade);
  text("Teacher", jhatx, jhaty + width / 5);
  text("Student", ghatx - width / 20, ghaty - width / 7);
  common();
}

function pagestudent() {
  b.x = lerp(b.x, 0, 0.1);
  bask.x = lerp(bask.x, width * 0.03, 0.1);
  bview.x = bask.x;
  bregister.x = lerp(bregister.x, -width, 0.02);
  bupload.x = bregister.x;
  ghatx = lerp(ghatx, width / 2, 0.1);
  ghaty = lerp(ghaty, height * 0.13, 0.1);
  jhatx = lerp(jhatx, -width / 7, 0.1);
  jhaty = lerp(jhaty, height * 0.4, 0.1);
  sxu = lerp(sxu, 0, 0.05);
  sxd = lerp(sxd, 0, 0.05);
  fade = lerp(fade, 255, 0.01);
  clear();
  common();
}

function pageteacher() {
  b.x = lerp(b.x, 0, 0.1);
  bask.x = lerp(bask.x, width * 2, 0.1);
  bview.x = bask.x;
  bregister.x = lerp(bregister.x, width * 0.03, 0.02);
  bupload.x = bregister.x;
  jhatx = lerp(jhatx, width * 0.55, 0.1);
  jhaty = lerp(jhaty, height * 0.175, 0.1);
  ghatx = lerp(ghatx, width * 1.15, 0.1);
  ghaty = lerp(ghaty, height * 0.6, 0.1);
  sxu = lerp(sxu, width, 0.05);
  sxd = lerp(sxd, width, 0.05);
  fade = lerp(fade, 255, 0.01);

  clear();
  common();
}