import { script } from './data.js';

let good = 0;
let chaotic = 0;

let coin = 0;

let current_scene = 0;

const log = document.getElementById("log");
const coin_counter = document.getElementById("coin");


function addText(text) {
    const p = document.createElement("p");
    p.innerHTML = text;
    log.appendChild(p);

    // auto-scroll en bas
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}

function showChoices(choices) {
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("choice-container");
    log.appendChild(btnContainer);

    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = "> " + choice.text;

        btn.onclick = () => {
            good += choice.good || 0;
            chaotic += choice.chaotic || 0;
            coin += choice.coin || 0;

            coin_counter.innerHTML = coin;

            // remplacer le bouton cliqué par le texte
            const p = document.createElement("p");
            p.classList.add("player-choice");
            p.innerHTML = "> " + choice.text;

            btnContainer.innerHTML = "";
            btnContainer.appendChild(p);

            // afficher les conséquences dans le log
            if (choice.consequence) {
                choice.consequence.forEach(c => addText(c));
            }

            if (choice.sound) {
                const audio = new Audio(`assets/sounds/${choice.sound}`);
                audio.play();
            }

            // passer à la scène suivante
            current_scene++;
            setTimeout(() => showScene(current_scene), 300);
            console.log("good: " + good + " chaotic: " + chaotic + " coin: " + coin);
            console.log(current_scene);
        };

        btnContainer.appendChild(btn);

        // scroll auto
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }, 50); // délai pour laisser le DOM se mettre à jour
    });
}

function showScene(index) {
    const scene = script[index];
    if (!scene) {
        showResult();
        return;
    };

    // texte principal
    addText(scene.text);

    // choix
    showChoices(scene.choices);
}

function showResult() {
    console.log("FIN");
    let alignment = "";

    // good vs evil
    if (good > 0) alignment += "Good";
    else if (good < 0) alignment += "Evil";
    else alignment += "Neutral";

    alignment += " ";

    // lawful vs chaotic
    if (chaotic > 0) alignment += "Chaotic";
    else if (chaotic < 0) alignment += "Lawful";
    else alignment += "Neutral";

    console.log("Ton alignement est : " + alignment);

    const p = document.createElement("p");
    p.innerHTML = "Ton alignement est : " + alignment;
    log.appendChild(p);

    // auto-scroll en bas
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}

showScene(current_scene);