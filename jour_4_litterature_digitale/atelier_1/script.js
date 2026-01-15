let first = ['Mon petit', 'Chéri', 'Doux', 'Lil', 'Kawaii']
let second = ['choux à la crême de dubai', 'chaton', 'sucre', 'channel coco', "baby", "dessert"]

const adjectives = [
    "Kawaine", "préféré", "gentil", "cher",
    "charmant", "tendre", "affectueux", "passionné", "doux",
    "mignon", "délicat", "romantique", "amoureux", "adoré",
    "précieux", "joli", "intense", "cute", "affectionné", "fondant", "chéri", "dévoué",
    "super", "séduisant", "joyeux", "lumineux"
];

const nouns = [
    "adoration", "coco", "désir", "charmant",
    "cœur", "passion brullante", "amour", "choux à la crême de dubai",
    "dessert à la vanille", "lover", "coco channel", "délice", "bonheur", "amour",
    "rayon de soleil au bout du tunnel", "trésor", "nounours de graduation", "loup alpha",
    "chaton", "lapin", "ange tombé du ciel", "sucre", "dessert"
];

const adverbs = [
    "affectueusement", "tendrement", "passionnément", "doucement",
    "amoureusement", "chaleureusement", "romantiquement", "avec amour",
    "délicatement", "attentivement", "avec tendresse", "gentiment", "avec passion", "avec douceur", 
    "adorablement", "avec tout le love", "en mode love"
];

const verbs = [
    "adore", "love avec tout mon coeur", "aimes", "désires", "affectionne",
    "préfère", "trouves adorable", "enlacés par",
    "protège", "embrasses", "câlines", "soutiens",
    "soigne", "envies", "chéris tendrement",
    "admire de tout mon coeur", "aimes passionnément", "fondes pour",
    "souhaites", "désires avec passion"
];

function maybe(words) {
    return Math.random() < 0.5 
        ? " " + words[Math.floor(Math.random() * words.length)]
        : "";
}

function longer() { // génère une phrase longue
    return (
        " Mon" +
        maybe(adjectives) + " " +
        nouns[Math.floor(Math.random() * nouns.length)] +
        maybe(adverbs) + " " +
        verbs[Math.floor(Math.random() * verbs.length)] +
        " ton" +
        maybe(adjectives) + " " +
        nouns[Math.floor(Math.random() * nouns.length)] +
        "."
    );
}

function shorter() {//phrase courte
    return ' ' + adjectives[Math.floor(Math.random() * adjectives.length)] + ' ' + nouns[Math.floor(Math.random() * nouns.length)] + ".";
}

function body() { //génère le corps principal de la lettre
    let text = "";
    let you_are = false;

    for (let i = 0; i < 5; i++) { //5 phrases
        const type = Math.random() < 0.5 ? "longer" : "shorter"; //1 chance sur 2 d'être une phrase courte ou longue

        if (type == "longer") {
            text += longer();
            you_are = false;
        } else {
            if (you_are) {
                text = text.slice(0, -1) + ": mon" + shorter();
                you_are = false;
            } else {
                text += " T'es mon" + shorter();
                you_are = true;
            }
        }
    }
    return text;
}

function letter() { //assemble la lettre
    let text =
        `${first[Math.floor(Math.random() * first.length)]}` + " " +
        `${second[Math.floor(Math.random() * second.length)]}` + "<br>" +
        body();
        document.querySelector(".lettre").innerHTML = text;
    return text;
}

letter();