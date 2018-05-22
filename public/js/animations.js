var dogsSlide = () => {
  let containerD = document.getElementById("dogs");
  containerD.className = "dogs dogs-animation";
}

var catsSlide = () => {
  let containerC = document.getElementById("cats");
  containerC.className = "cats cats-animation";
}

var catsSlideBack = () => {
  let containerC2 = document.getElementById("cats");
  containerC2.className = "cats cats-animation-back";
}

var dogsSlideBack = () => {
  let containerD2 = document.getElementById("dogs");
  containerD2.className = "dogs dogs-animation-back";
}
