var dogsSlide = () => {
  let containerH = document.getElementById("home");
  containerH.className = "home cats-animation-back";
  let containerD = document.getElementById("dogs");
  containerD.className = "dogs dogs-animation";
}

var catsSlide = () => {
  let containerH = document.getElementById("home");
  containerH.className = "home dogs-animation-back";
  let containerC = document.getElementById("cats");
  containerC.className = "cats cats-animation";
}

var catsSlideBack = () => {
  let containerH = document.getElementById("home");
  containerH.className = "home dogs-animation";
  let containerC2 = document.getElementById("cats");
  containerC2.className = "cats cats-animation-back";
}

var dogsSlideBack = () => {
  let containerH = document.getElementById("home");
  containerH.className = "home cats-animation";
  let containerD2 = document.getElementById("dogs");
  containerD2.className = "dogs dogs-animation-back";
}
