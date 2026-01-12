const dessin3 = (p) => { //pour pouvoir faire plusieurs dessins sur la même page html

  let data = [
    { x: 0, y: 0 },
    { x: 0, y: 2 },
    { x: 2, y: -1 }
  ];

  let scaledData = [];

  p.setup = () => {
    let c = p.createCanvas(640, 400);
    c.parent("dessin3");
    p.rectMode(p.CENTER);
    p.colorMode(p.HSB, 360, 100, 100);

    let scale = p.width / 15;
    for (let i = 0; i < data.length; i++) {
      scaledData.push({
        x: data[i].x * scale,
        y: data[i].y * scale
      });
    }
  };

  p.draw = () => {
    p.background(240);

//Dessin
    for (let x = 1; x <= 1100; x += 4) {
      let hue = (x * 40) % 360;
      p.stroke(hue, 80, 100);
      let x1 = x / 2;
      let y1 = x / 10 * p.sin(x / 20) + x / 20 + p.height / 5;

      let x2 = 50 * p.sin(p.width / x / 70) + p.width / 2;
      let y2 = x / 4 * p.sin(x / 120) + p.width / 5;

      p.line(x1, y1, x2, y2);
    }

    p.noLoop();
  };
};

//-------------------------------------------------------------------

const dessin5 = (p) => {

  // variables accessibles dans setup ET draw
  let Xrs1;
  let Yrs1;
  let A;
  let B;

  p.setup = () => {
    let c = p.createCanvas(640, 400);
    c.parent("dessin5");
    p.background(0); //noir
    p.strokeWeight(2);
    p.noFill();
    p.colorMode(p.HSB, 360, 100, 100);


    Xrs1 = p.width;
    Yrs1 = p.height;

    A = Xrs1 / 2;
    B = Yrs1 / 2;
  };

  p.draw = () => {
      let R = Yrs1 * 0.7;

      // boucle W Pi/4 -> 3.6
      for (let W = Math.PI / 4; W <= 3.6; W += 0.05) {
        let hue = (W * 250) % 360; //teinte dynamique selon W
        p.stroke(hue, 80, 100);
        let X = R * Math.cos(W);
        let Y = R * Math.sin(W);

        p.line(A + X, B - Y, A - Y, B - X);
        p.line(A - Y, B - X, A - X, B + X);
        p.line(A - X, B + Y, A + X, B - Y);
        p.line(A - X, B + Y, A + Y, B + X);
        p.line(A + X, B + X, A + X, B - Y);

        R = R * 0.94;
      }
    p.noLoop(); // stop draw après 1 rendu
  };
};

new p5(dessin3);
new p5(dessin5);
