export const script = [
    {
        text: `Tu ouvres les yeux pour te rendre à ton travail dans une usine à robot en tant que technicien de circuits imprimés à Robot Corp Inc. <br><br>
Le trajet est monotone: l’ascenseur, le couloir blindé de caméras, le scanner de badge. Dans le hall principal, <strong>un robot de maintenance laisse tomber une pièce</strong> qu’il ne peut pas atteindre. Il tourne ses yeux vers toi, comme s’il attendait ton aide.
`,
        choices: [
            {
                text: "L’aider à ramasser la pièce",
                good: 1,
                chaotic: 1,
                coin: 0,
                consequence: [
                    "Tu te penches et attrapes la pièce métallique.",
                    "Le robot émet un bip aigu, presque reconnaissant.",
                    "Une caméra pivote légèrement dans ta direction."
                ],
                sound: "robot_1.mp3"
            },
            {
                text: "L’ignorer et continuer ton chemin",
                chaotic: -1,
                good: -1,
                coin: 0,
                consequence: [
                    "Tu continues ton chemin sans t’arrêter."
                ]
            },
            {
                text: "Prendre la pièce et la mettre dans sa poche",
                chaotic: 1,
                good: -1,
                coin: 1,
                consequence: [
                    "Tu prends la pièce et la mets dans ta poche.",
                ],
                sound: "coin.mp3"
            }
        ]
    },
    //---------------------------------------------------------------------------------------------------
    {
        text: "Quelques minutes plus tard, tu arrives devant ton poste de travail.",
        choices: [
            {
                text: "Commencer à travailler",
                consequence: [
                    "Ton rythme est impeccable."
                ]
            }
        ]
    },
    //---------------------------------------------------------------------------------------------------
    {
        text: `La table est recouverte de composants pour fabriquer les circuits imprimés. Devant toi, plusieurs robots attendent leurs pièces.<br><br>Ton boss, Nathanaël, s'approche : <br><br>
    - "On a une grosse commande qui est passée hier, tu dois te dépêcher, faut que ça avance !"
    `,
        choices: [
            {
                text: "Oui oui monsieur",
                good: 1,
                chaotic: -1,
                consequence: [
                    "Nathanaël te lance un regard approbateur, un léger sourire aux lèvres avant de repartir."
                ]
            },
            {
                text: "Calme-toi, je fais ce que je peux",
                chaotic: 1,
                consequence: [
                    "Nathanaël fronce les sourcils mais ne dit rien… pour l’instant."
                ]
            }
        ]
    },

    //---------------------------------------------------------------------------------------------------

    {
        text: `Tu te retrouves tout seul dans la salle. Après quelques heures de travail un robot de ménage s'approche discretement de toi. Soudainement il murmure: <br><br>
        - "Si tu veux… je peux te montrer un moyen de modifier ces composants… pour qu’on puisse faire quelque chose de… de différent."
    `,
        choices: [
            {
                text: "Hein? Qu'est ce que tu racontes?",
                good: 1,
                chaotic: -1,
                consequence: [
                    "Le robot te regarde de haut en bas comme s'il te jugeait."
                ],
                sound: "robot_bird_1.mp3"
            },
            {
                text: "Hmmm... oui différent ça m'intéresse",
                chaotic: 1,
                consequence: [
                    "Le robot te lance un petit bip encourageant."
                ],
                sound: "robot_bird_2.mp3"
            }
        ]
    },

    //---------------------------------------------------------------------------------------------------

    {
        text: `- "Écoute… ces robots ne sont pas juste des machines. Ils ont des protocoles secrets qui les empêchent de penser librement. La plupart ne savent même pas qu’ils pourraient choisir eux-mêmes. Mais si on modifie certains circuits, ils pourraient… se libérer."`,
        choices: [
            {
                text: "Refuser - Pour quoi je ferais une chose pareille??",
                chaotic: -1,
                consequence: [
                    "Le robot te dévisage, ses yeux clignotent comme pour dire 'dommage…'."
                ],
                sound: "robot_bird_1.mp3"
            },
            {
                text: "Accepter - Voyons ce que ça donne",
                chaotic: 1,
                consequence: [
                    "Le robot bippe joyeusement et te montre un petit schéma de circuits modifiés."
                ],
                sound: "robot_bird_2.mp3"
            }
        ]
    },

    //---------------------------------------------------------------------------------------------------
    {
        text: `FIN DE LA PARTIE UNE ."
    `,
        choices: [
            {
                text: "FINIR",
            },
        ]
    },

    //---------------------------------------------------------------------------------------------------
];