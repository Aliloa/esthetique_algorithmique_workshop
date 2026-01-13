//--------------------GENERATION DE LA MAP
let cols = 50;
let rows = 30; //ne pas mettre de nombre paire sinon les math floor /2 se cassent
let cell_size = 15; // taille d'une case
let map = [];

function setup() {
    cols = Math.floor(windowWidth / cell_size);
    createCanvas(windowWidth, rows * cell_size);
    fire = [];
    for (let y = 0; y < rows; y++) {
        fire[y] = [];
        for (let x = 0; x < cols; x++) {
            fire[y][x] = 0;
        }
    }
}

function play() {
    // créer une map aléatoire
    for (let y = 0; y < rows; y++) {
        map[y] = [];
        for (let x = 0; x < cols; x++) {
            // 40% de chance que ce soit un mur
            map[y][x] = random() < 0.4 ? 1 : 0;
        }
    }

    // appliquer l'automate plusieurs fois
    for (let i = 0; i < 5; i++) {
        map = automate(map);
    }
    redraw();
}

function draw() {
    background(0);
    if (map.length === 0) return; // rien à dessiner si map vide
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            //parcourir chacune des cases du tableau qui est 1 ou 0 et colorier de couleur correspondante
            if (map[y][x] == 1) fill(100); // mur gris
            else fill(200); // sol clair
            rect(x * cell_size, y * cell_size, cell_size, cell_size);
        }
    }

    spawnFire();
    spreadFire();

    // dessiner le perso
    fill(player.color);
    rect(player.x * cell_size, player.y * cell_size, cell_size, cell_size);
}

//automate cellulaire
function automate(old_map) {
    let new_map = [];
    for (let y = 0; y < rows; y++) {
        new_map[y] = [];
        for (let x = 0; x < cols; x++) {
            let neighbors = countWallsAround(old_map, x, y);
            if (old_map[y][x] == 1) {
                new_map[y][x] = neighbors >= 4 ? 1 : 0;
            } else {
                new_map[y][x] = neighbors >= 5 ? 1 : 0;
            }
        }
    }
    return new_map;
}

// compter les murs autour d'une cellule
function countWallsAround(map, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let nx = x + j;
            let ny = y + i;
            if (i == 0 && j == 0) continue;
            if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) {
                count++; // bord = mur
            } else if (map[ny][nx] == 1) {
                count++;
            }
        }
    }
    return count;
}

//---------------------BOUTON

let start = document.querySelector(".start");

start.addEventListener("click", function () {
    play();
    spawnPlayer();

    fire = [];
    for (let y = 0; y < rows; y++) {
        fire[y] = [];
        for (let x = 0; x < cols; x++) {
            fire[y][x] = 0;
        }
    }
    document.querySelector(".game-over").style.display = "none";
    startTimer();

});

//-----------------JEU

let player = {
    x: cols / 2,
    y: rows / 2,
    color: "blue"
};

//spawn le joueur dans une case 0
function spawnPlayer() {
    let startX = Math.floor(cols / 2);
    let startY = Math.floor(rows / 2);

    for (let y = startY; y < rows; y++) {
        for (let x = startX; x < cols; x++) {
            if (map[y][x] == 0) { // case vide
                player.x = x;
                player.y = y;
                return;
            }
        }
    }
}

document.addEventListener("keydown", function (e) {
    let newX = player.x;
    let newY = player.y;

    if (e.key === "ArrowLeft") newX--;
    else if (e.key === "ArrowRight") newX++;
    else if (e.key === "ArrowUp") newY--;
    else if (e.key === "ArrowDown") newY++;

    // vérifier si c'est pas un mur
    if (map[newY] && map[newY][newX] == 0) {
        player.x = newX;
        player.y = newY;
    }
})

//------------------------------FEU

function spawnFire() {
    for (let y = 10; y < rows; y++) {
        for (let x = 10; x < cols; x++) {
            if (map[y][x] == 0) {
                fire[y][x] = 1;
                return;
            }
        }
    }
}

function spreadFire() {

    let new_fire = fire.map(row => [...row]);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (fire[y][x] == 1) {
                // cases à côté
                let neighbors = [
                    [x + 1, y],
                    [x - 1, y],
                    [x, y + 1],
                    [x, y - 1]
                ];

                for (let [nx, ny] of neighbors) {
                    if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) {
                        if (map[ny][nx] == 0 && fire[ny][nx] == 0 && random() < 0.1) {//probabilité de se propager à la prochaine case (ralentir)
                            new_fire[ny][nx] = 1;
                        }
                    }
                }
            }
        }
    }

    let colors = ["#FF4500", "#FF8C00", "#FFA500"];
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (fire[y][x] === 1) {
                let c = random(colors);
                fill(c);
                rect(x * cell_size, y * cell_size, cell_size, cell_size);
            }
        }
    }

    fire = new_fire;

    // le joueur touche le feu
    if (fire[player.y][player.x] == 1) {
        console.log("Game Over");
        document.querySelector(".game-over").style.display = "flex";
        document.querySelector(".final-time").innerHTML = time;
        stopTimer();
    }
}

//----------------TIMER

let time = 0;
let timer_interval = null;

function startTimer() {
    stopTimer();
    time = 0;
    document.querySelector(".time").textContent = time;

    timer_interval = setInterval(() => {
        time++;
        document.querySelector(".time").textContent = time;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer_interval);
}