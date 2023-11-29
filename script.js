const inputWord = document.querySelector("#input-word");
const btnCheck = document.querySelector("#btn-check");
const answerParagraph = document.querySelector("#answer__paragraph");

document.addEventListener("keydown", function(event) {
    if (inputWord.value != "" && event.key === "Enter") {
        checkAnswer();
    }
});

function showCongratulations(word) {
    inputWord.value = "";
    answerParagraph.style.display = "block";
    answerParagraph.innerHTML = `¡Felicidades! "${word}" es un palíndromo. 🎉`;
    answerParagraph.style.backgroundColor = "#22B573";
    startConfetti();
}

function showAnswerNo(word) {
    inputWord.value = "";
    answerParagraph.style.display = "block";
    answerParagraph.innerHTML = `Qué mal, "${word}" no es un palíndromo. 😪`;
    answerParagraph.style.backgroundColor = "#FF4565";
    stopConfetti();
}

function checkAnswer() {
    if(inputWord.value == "" || /^\s+$/.test(inputWord.value)) {
        inputWord.placeholder ="Tienes que escribir algo";
    } else {
        let word = inputWord.value;
        let wordWithoutSpaces = word.replace(/\s/g, '');
        let cleanString = ((wordWithoutSpaces.toLowerCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, '')).replace(/[.,;]/g, '');
        let firstHalf = "";
        let secondHalf = "";

        if (cleanString.includes("mayonesa")) {
            inputWord.value = "";
            answerParagraph.innerHTML = `No patricio, la mayonesa no es un instrumento 😒`;
            answerParagraph.style.backgroundColor = "#F09E17";
            stopConfetti();
        } else if  (cleanString.includes("rabanos")) {
            inputWord.value = "";
            answerParagraph.innerHTML = `Los rábanos picantes tampoco 🙄`;
            answerParagraph.style.backgroundColor = "#FF4565";
            stopConfetti();
        } else if (wordWithoutSpaces.length % 2 == 0) {
            let indexInBetween = (cleanString.length / 2);
            for(let i = 0; i < indexInBetween; i++) {
                firstHalf += cleanString[i];
            }
            for(let i = (cleanString.length - 1); i > (indexInBetween - 1); i--) {
                secondHalf += cleanString[i];
            }

            if(firstHalf === secondHalf) {
                showCongratulations(word);
            } else {
                showAnswerNo(word);
            }
        } else {
            let indexInBetween = parseInt(cleanString.length / 2);

            for(let i = 0; i < indexInBetween; i++) {
                firstHalf += cleanString[i];
            }

            for(let i = (cleanString.length - 1); i > indexInBetween; i--) {
                secondHalf += cleanString[i];
            }

            if(firstHalf === secondHalf) {
                showCongratulations(word);
            } else {
                showAnswerNo(word);
            }
        }
    }
}