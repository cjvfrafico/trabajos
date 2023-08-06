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
const words = ["guateque", "manteca", "chocolate", "batucada", "feria"];
const pistaWord = document.getElementById("pista");

let isGameWon = false; //
let todosLosIntentos = {};
let randomNumber = Math.floor(Math.random() * words.length);
let word = words[randomNumber].toLowerCase();
console.log(word);
let guessedLetters = [];
let attempts = 6;
let pts = 0;

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
    "Fiesta de jóvenes que se celebra en una casa particular y en la que se baila y se bebe, especialmente la que se celebraba en las décadas de 1950 y 1960.",
    "Producto obtenido por el batido, amasado y posterior maduración de la crema extraída de la leche de vaca o de otros animales.",
    "Pasta hecha con cacao y azúcar molidos, a la que generalmente se añade canela o vainilla",
    " Baile popular afrobrasileño que se acompaña con instrumentos de percusión",
    "Mercado de mayor importancia que el común, en paraje público y días señalados",
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
  if (isGameOver) return;

  letter = letter.toLowerCase();
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    if (!word.includes(letter)) {
      attempts--;
      // Add the corresponding hangman part based on the number of incorrect attempts.
      switch (attempts) {
        case 5:
          cabeza.classList.add("partes-monigote-ver");
          break;
        case 4:
          cuerpo.classList.add("partes-monigote-ver");
          break;
        case 3:
          brazoi.classList.add("partes-monigote-ver");
          break;
        case 2:
          brazod.classList.add("partes-monigote-ver");
          break;
        case 1:
          piernai.classList.add("partes-monigote-ver");
          break;
        case 0:
          piernad.classList.add("partes-monigote-ver");
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
  attempts = 6;
  randomNumber = Math.floor(Math.random() * words.length);
  word = words[randomNumber].toLowerCase();

  document.getElementById("guesses").innerText =
    "Intentos restantes: " + attempts;
  document.getElementById("message").innerText = "Buena suerte!";
  letras.forEach((letra) =>
    letra.classList.remove("letraAcertada", "letraErrada")
  );
  cabeza.classList.remove("partes-monigote-ver");
  cuerpo.classList.remove("partes-monigote-ver");
  brazoi.classList.remove("partes-monigote-ver");
  brazod.classList.remove("partes-monigote-ver");
  piernai.classList.remove("partes-monigote-ver");
  piernad.classList.remove("partes-monigote-ver");
  pista();
  isGameOver = false;
  guessedLetters = [];
  todosLosIntentos = {};
  displayWord();
};

playAgainButton.addEventListener("click", resetGame);

// eliminar y avisar si esta repetida

//if counter = equis valor, mostrar partes del monigote?
