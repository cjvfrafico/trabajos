//este juego está pensado para dispositivos como pequeños ipads con dimensiones aproximadas de 540px x 720px, pero en la práctica sería poco eficiente, ya que al ser un trabajo de clase que vemos y utilizamos con el pc, el evento para adivina cada letra, está colocado en el keyboard, no en cada popia letra.

const wordPlace = document.getElementById("word");
const wordDisplay = document.getElementById("wordDisplay");
const wrongLettersPlace = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("playAgainButton");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notificacion-container");
const finalMessage = document.getElementById("final-message");
const partesMonigote = document.getElementById("partes-monigote");
const letras = document.querySelectorAll(".letter");
const words = [
  "cowboy",
  "cactus",
  "colt",
  "mustang",
  "llanura",
  "asalto",
  "pistolero",
  "sheriff",
  "jinete",
  "locomotora",
  "indios",
  "buffalo",
  "siux",
  "navajo",
  "apache",
  "peyote",
  "rancho",
  "bandido",
  "carbón",
  "batea",
  "saloon",
];
const pistaWord = document.getElementById("pista");

let isGameWon = false; //
let todosLosIntentos = {};
let randomNumber = Math.floor(Math.random() * words.length);
let word = words[randomNumber].toLowerCase();
console.log(word);
let guessedLetters = [];
let attempts = 7;
let pts = 0;

let myAudio = document.getElementById("audio");
myAudio.play();

document.getElementById("counter").innerText = pts + " pts.";
document.getElementById("guesses").innerText = "Intentos restantes: 6";
document.getElementById("message").innerText = "Buena suerte!";

playButton = document.getElementById("playButton");
pantallaInicio = document.getElementById("pantalla_inicio");

startGame = () => {
  pantallaInicio.classList.remove("pantalla_inicio");
  pantallaInicio.classList.add("pantalla_inicio_play");
};

playButton.addEventListener("click", startGame);

const displayWord = () => {
  let display = "";
  for (const letter of word) {
    if (guessedLetters.includes(letter)) {
      display += letter;
    } else {
      display += "_";
    }
  }
  wordDisplay.innerText = display;
};

displayWord();

//funcion para mostrar la pista

const pista = () => {
  const pistas = [
    "Pastor de ganado vacuno, que vigila y conduce a caballo los rebaños de reses vacunas",

    "Planta de tallo globoso con espinas, propia de climas desérticos",

    "Arma corta de fuego",

    "Caballos salvajes de Norteamérica",

    "Campo o terreno igual y dilatado, sin altos ni bajos",

    "Combate amistoso entre dos tiradores",

    "Persona que utiliza la pistola de modo habitual para cometer atentados personales u otros actos delictivos",

    "En los Estados Unidos de América y en ciertas regiones o condados británicos, representante de la justicia, que se encarga de hacer cumplir la ley",

    "Persona diestra en la equitación",

    "Máquina que, montada sobre ruedas y movida de ordinario por vapor, electricidad o motor de combustión interna, arrastra los vagones de un tren",

    "Dicho de una persona: De alguno de los pueblos o razas indígenas de América",

    "Bóvido corpulento, con largos cuernos deprimidos, de cuyas dos especies principales una es de origen asiático y otra de origen africano",

    "De un pueblo amerindio oriundo de los valles del norte del Misisipi",

    "Dicho de una persona: De un pueblo originario del oeste de América del Norte",

    "Dicho de una persona: De un pueblo indio nómada de las llanuras de Nuevo México, caracterizado por su gran belicosidad",

    "Planta cactácea, de pequeño tamaño, que contiene una sustancia cuya ingestión produce efectos alucinógenos y narcóticos",

    "Choza o casa pobre con techumbre de ramas o paja, fuera de poblado",

    "Persona que roba en los despoblados, salteador de caminos",

    "Sustancia fósil, dura, bituminosa, de color oscuro o casi negro, que resulta de la descomposición lenta de materia leñosa",

    "Recipiente de forma normalmente cúbica que se usa para el lavado de minerales",

    "Bar, lugar donde se toman bebidas alcohólicas",
  ];
  console.log(randomNumber);
  pistaWord.innerText = pistas[randomNumber];
};

pista();

// fucion para saber si la palabra ha sido acertada

const isWordGuessed = () => {
  for (const letter of word) {
    if (!guessedLetters.includes(letter)) {
      return false;
    }
  }
  return true;
};

const letraRepetida = (letter) => {
  letter = letter.toLowerCase();
  if (todosLosIntentos[letter]) {
    alert(`¡La letra "${letter}" ya ha sido introducida antes!`);
  }
  if (guessedLetters.includes(letter)) {
    todosLosIntentos[letter] = (todosLosIntentos[letter] || 0) + 1;
  }
};

//funcion para parar el juego si llegas a cero
// medir el número de intentos

//partes del cuerpo
cabeza = document.getElementById("cabeza");
cuerpo = document.getElementById("cuerpo");
brazoi = document.getElementById("brazo-izq");
brazod = document.getElementById("brazo-drch");
piernai = document.getElementById("pierna-izq");
piernad = document.getElementById("pierna-drch");

let isGameOver = false;

const checkGuess = (letter) => {
  const gameContainer = document.getElementById("game-container");
  if (isGameOver) return;

  letter = letter.toLowerCase();
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    if (!word.includes(letter)) {
      attempts--;
      // Add the corresponding hangman part based on the number of incorrect attempts.
      switch (attempts) {
        case 6:
          gameContainer.classList.add("cabeza");
          break;
        case 5:
          gameContainer.classList.remove("game-container");
          gameContainer.classList.add("torso");
          break;
        case 4:
          gameContainer.classList.remove("game-container");
          gameContainer.classList.add("brazod");
          break;
        case 3:
          gameContainer.classList.remove("game-container");
          gameContainer.classList.add("brazoi");
          break;
        case 2:
          gameContainer.classList.remove("game-container");
          gameContainer.classList.add("piernad");
          break;
        case 1:
          gameContainer.classList.remove("game-container");
          gameContainer.classList.add("piernai");
          document.getElementById("message").innerText =
            "¡Perdiste! La palabra era: " + word;
          document.getElementById("guesses").innerText =
            "Intentos restantes: 0";
          pts -= 5; // Restar 100 puntos al perder
          document.getElementById("counter").innerText = pts + " pts.";
          break;
      }
    } else {
      // Acierto
      pts += 0; // Sumar 100 puntos al acertar
      document.getElementById("counter").innerText = pts + " pts.";
    }
    document.getElementById("guesses").innerText =
      "Intentos restantes: " + attempts;

    if (isWordGuessed()) {
      isGameOver = true; // El juego ha terminado
      document.getElementById("message").innerText = "¡Felicidades! Ganaste";
      pts += 10; // Sumar 100 puntos adicionales por ganar
      document.getElementById("counter").innerText = pts + " pts.";
    } else if (attempts === 0) {
      isGameOver = true; // El juego ha terminado
      document.getElementById("message").innerText =
        "¡Perdiste! La palabra era: " + word;
      document.getElementById("guesses").innerText = "Intentos restantes: 0";
      pts -= 5; // Restar 5 puntos al perder
      document.getElementById("counter").innerText = pts + " pts.";
    }
  }
  displayWord();

  if (!isGameOver) {
    // Cambiar las clases de las letras solo si el juego no ha terminado
    const dataGame = document.querySelector(`[data-hungman="${letter}"]`);
    if (word.includes(letter)) {
      dataGame.classList.add("letraAcertada");
    } else {
      dataGame.classList.add("letraErrada");
    }
  }
};

document.addEventListener("keydown", function (event) {
  if (isGameOver) return;
  const letter = event.key.toLowerCase();
  const dataGame = document.querySelector(`[data-hungman="${letter}"]`);

  if (/[a-z]/.test(letter)) {
    letraRepetida(letter); // Llamar a la función letraRepetida para verificar repeticiones
    checkGuess(letter);
    displayWord();
  }
  //
  if (word.includes(event.key)) {
    dataGame.classList.add("letraAcertada");
  } else dataGame.classList.add("letraErrada");
});

// Variable para almacenar las letras utilizadas y su conteo

const resetGame = () => {
  const gameContainer = document.getElementById("game-container");
  attempts = 6;
  randomNumber = Math.floor(Math.random() * words.length);
  word = words[randomNumber].toLowerCase();

  document.getElementById("guesses").innerText =
    "Intentos restantes: " + attempts;
  document.getElementById("message").innerText = "Buena suerte!";
  letras.forEach((letra) =>
    letra.classList.remove("letraAcertada", "letraErrada")
  );

  pista();
  isGameOver = false;
  guessedLetters = [];
  todosLosIntentos = {};
  displayWord();

  /*
  gameContainer.classList.remove("cabeza");
  gameContainer.classList.remove("torso");
  gameContainer.classList.remove("brazod");
  gameContainer.classList.remove("brazoi");
  gameContainer.classList.remove("piernad");
  gameContainer.classList.remove("piernai");
  gameContainer.classList.add("game-contaier");
  */
  gameContainer.classList.add("vuelta");
};

playAgainButton.addEventListener("click", resetGame);

// eliminar y avisar si esta repetida

//if counter = equis valor, mostrar partes del monigote?
