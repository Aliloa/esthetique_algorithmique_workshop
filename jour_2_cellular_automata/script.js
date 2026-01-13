//-----------------JEU

let player = {
    x: 25,
    y: 25,
    color: "red"
};

//spawn le joueur dans une case 0
function spawnPlayer() {
    for (let y = 25; y < rows; y++) {
        for (let x = 25; x < cols; x++) {
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

//--------------------GENERATION DE LA MAP
let cols = 50; // nombre de colonnes
let rows = 50; // nombre de lignes
let cell_size = 10; // taille d'une case
let map = [];

function setup() {
    createCanvas(windowWidth, rows * cell_size);
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
    // dessiner le perso
    fill(player.color);
    rect(player.x * cell_size, player.y * cell_size, cell_size, cell_size);
}

//automate cellulaire
function automate(oldMap) {
    let newMap = [];
    for (let y = 0; y < rows; y++) {
        newMap[y] = [];
        for (let x = 0; x < cols; x++) {
            let neighbors = countWallsAround(oldMap, x, y);
            if (oldMap[y][x] == 1) {
                newMap[y][x] = neighbors >= 4 ? 1 : 0;
            } else {
                newMap[y][x] = neighbors >= 5 ? 1 : 0;
            }
        }
    }
    return newMap;
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
});