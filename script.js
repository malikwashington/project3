const url = "https://www.fishwatch.gov/api/species";
let array0 = [];
let currentPosition = 0;

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
  console.log(arr)
  let gallery = document.querySelector(".js-gallery");

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
  setInterval(called, 1500);
};

resume = (array) => {
  increase = () => {
    // console.log(currentPosition)
    currentPosition++;
    // console.log(currentPosition)
    // console.log(array)
    if (currentPosition >= array.length) {
      currentPosition = 0;
    }
    information(array[currentPosition]);
    transitionSlide(array[currentPosition]["Image Gallery"]);
      // console.log(array[currentPosition]["Image Gallery"]);

  };

  decrease = () => {
    if ((currentPosition = 0)) {
      currentPosition = array.length;
    }
    currentPosition--;
    information(array[currentPosition]);
    transitionSlide(array[currentPosition]["Image Gallery"]);
  };

  document.querySelector(".next").addEventListener("click", increase);
  prev = document.querySelector(".prev").addEventListener("click", decrease);
  information(array[currentPosition])
  transitionSlide(array[currentPosition]["Image Gallery"]);
};

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


