function setup() {
  createCanvas(640, 400);
  background(0); // 20 = opacité faible, ça laisse un effet glow/trail
  strokeWeight(2);
  colorMode(HSB, 360, 100, 100);
  noFill();
}

let stars = [];

//dessiner la forme de l'étoile
function drawStar(star) {
  let angle = TWO_PI / star.branches;
    let moitie_angle = angle / 2.0;
    
  push();
  translate(star.x, star.y);
  rotate(star.rotation);  // rotation dynamique basée sur l'objet
  stroke(star.hue, 80, 100); // couleur dynamique basée sur l'objet
  fill(0, 0, 0);
  
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) { //two_pi pour que ca fasse un cercle complet
    let sx = cos(a) * star.radius_ext;
    let sy = sin(a) * star.radius_ext;
    vertex(sx, sy);
    
    sx = cos(a + moitie_angle) * star.radius_int;
    sy = sin(a + moitie_angle) * star.radius_int;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}

//système de particules animées
let particles = [];

function createParticles(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x, y,
      size: random(2,5),
      vx: random(-1,1),
      vy: random(-1,1),
      alpha: 255
    });
  }
}

function updateAndDrawParticles() {
  for (let i = particles.length -1; i >=0; i--) {
    let p = particles[i];
    noStroke();
    fill(0, 0, 100, p.alpha);
    ellipse(p.x, p.y, p.size);
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 2;

    if (p.alpha <= 0) particles.splice(i,1);
  }
}


function draw() {
    background(0, 0, 0);

if (mouseIsPressed && frameCount % 5 === 0) { // une étoile tous les 5 frames, si la souris est appuyée

//paramètres d'une étoile
let star = {
      x: mouseX,
      y: mouseY,
      radius_int: 10,
      radius_ext: 20,
      branches: 5,
      hue: random(360), // couleur aléatoire
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.02, 0.02), // vitesse de rotation
      hueSpeed: random(0.5, 2) // vitesse changement couleur
    };
    stars.push(star);
    createParticles(star.x, star.y, 15);
  }
  
 // mettre à jour et dessiner toutes les étoiles
  for (let s of stars) {
    s.rotation += s.rotationSpeed; // rotation continue
    s.hue = (s.hue + s.hueSpeed) % 360; // changement de couleur continu
    drawStar(s);
  }
  updateAndDrawParticles();

}
