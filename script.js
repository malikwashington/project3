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
    currentPosition++;
    if (currentPosition >= array.length) {
      currentPosition = 0;
    }
  };

  decrease = () => {
    if ((currentPosition = 0)) {
      currentPosition = array.length - 1;
    }
    currentPosition--;
    console.log(currentPosition);
  };

  document.querySelector(".next").addEventListener("click", increase());
  prev = document.querySelector(".prev").addEventListener("click", decrease);
  let fishName = document.querySelector(".name");
  let info = document.querySelector(".info");

  transitionSlide(array[currentPosition]["Image Gallery"]);
  fishName.innerText = array[currentPosition]["Species Name"];
  let x =
    array[currentPosition]["Biology"] +
    array[currentPosition]["Physical Description"] +
    array[currentPosition]["Habitat"] +
    array[currentPosition]["Location"] +
    array[currentPosition]["Taste"] +
    array[currentPosition]["Texture"];
  info.innerHTML = x;
}