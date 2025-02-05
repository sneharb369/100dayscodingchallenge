const EmotionalHealth = document.getElementsByClassName("EmotionalHealth");

for (let i = 0; i < EmotionalHealth.length; i++) {
  EmotionalHealth[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}
