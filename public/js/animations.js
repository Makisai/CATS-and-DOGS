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

// Get the modal(div) for the cats
var modalCats = document.getElementById('modalCatsUpload');

// Get the modal(div) for the dogs (needs 2 modals because ids are unique)
var modalDogs = document.getElementById('modalDogsUpload');

// Get the button that opens the modal
var btnC = document.getElementById("uploadC");

// Get the button that opens the modal
var btnD = document.getElementById("uploadD");

// Get the <span> element that closes the modal
var spanC = document.getElementById("spanCats");
var spanD = document.getElementById("spanDogs");

// When the user clicks on the button, open the modal
btnC.onclick = function() {
    modalCats.style.display = "block";
}

btnD.onclick = function() {
    modalDogs.style.display = "block";
}

// When the user clicks on <span> (x), close the modal for Cats
spanC.onclick = function() {
    modalCats.style.display = "none";
}

// When the user clicks on <span> (x), close the modal for Dogs
spanD.onclick = function() {
    modalDogs.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close the modal for dogs
window.onclick = function(event) {
    if (event.target == modalDogs) {
        modalDogs.style.display = "none";
    }else if (event.target == modalCats) {
        modalCats.style.display = "none";
    }
}
