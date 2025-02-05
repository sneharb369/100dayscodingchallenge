var text = document.getElementById("text");
var sentence = "HULK SMASH! HULK!";
let index = 1;
let speedChanger = 250;

writingSentence();
function writingSentence() {
  text.innerText = sentence.slice(0, index);
  index++;

  if (index > sentence.length) {
    index = 1;
  }
  setTimeout(writingSentence, speedChanger);
}

