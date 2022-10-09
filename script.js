//Edits from Raul are marked and greatly appreciated
const url = "https://www.fishwatch.gov/api/species";
let array0 = [];
let currentPosition = 0;
let intervalID; //RAUL

fetch(url)
  .then((res) => {
    let data = res.json();
    return data;
  })
  .then((data) => {
    array0 = data;
    resume(array0);
  })
  .catch((err) => {
    console.error("this ain't right", err);
  });

transitionSlide = (arr) => {
  let gallery = document.querySelector(".js-gallery");
  //RAUL (I feel like I should have thought of this solution -Malik)
  gallery.innerHTML = "";
  stop()

  arr.forEach((element) => {
    let li = document.createElement("li");
    li.setAttribute("class", "gallery__item js-gallery-item");
    li.setAttribute("style", `background-image: url('${element.src}')`);
    li.setAttribute("alt", `'${element.alt}'`);
    gallery.appendChild(li);
  });
  let slideCount = arr.length;
  let slideWidth = document.querySelector("li").offsetWidth * -1;
  let currentSlide = 1;
  called = () => {
    if (currentSlide < slideCount) {
      let delta = slideWidth * currentSlide;

      gallery.style.transform = `translateX(${delta}px)`;
      currentSlide++;
    } else {
      currentSlide = 1;
      gallery.style.transform = "translateX(0)";
    }
  };
  intervalID = setInterval(called, 1800);
};

resume = (array) => {
  increase = () => {
    currentPosition++;
    if (currentPosition >= array.length) {
      currentPosition = 0;
    }
    information(array[currentPosition]);
    transitionSlide(array[currentPosition]["Image Gallery"]);
  };

  decrease = () => {
    console.log("we here")
    if ((currentPosition == 0)) {
      currentPosition = array.length;
    }
    currentPosition--;
    information(array[currentPosition]);
    transitionSlide(array[currentPosition]["Image Gallery"]);
  };

  document.querySelector(".next").addEventListener("click", increase);
  document.querySelector(".prev").addEventListener("click", decrease);
  information(array[currentPosition])
  transitionSlide(array[currentPosition]["Image Gallery"]);
};
console.log(document.querySelector(".prev"));
console.log("we here")
function information(array)
{
  let fishName = document.querySelector(".name");
  let info = document.querySelector(".info");

  fishName.innerText = array["Species Name"];
  let x =
  array["Biology"] +
  array["Physical Description"] +
  array["Habitat"] +
  array["Location"] +
  array["Taste"] +
  array["Texture"];
  info.innerHTML = x;
}

function stop() {
  clearInterval(intervalID)
}
