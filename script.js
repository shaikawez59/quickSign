const fontColorPicker = document.querySelector("#textColorPicker");
const background = document.querySelector("#background");
const fontSize = document.querySelector("#fontSize");
const btnClear = document.querySelector(".btnClear");
const btnSave = document.querySelector(".btnSave");
const btnRetrieve = document.querySelector(".btnRetrieve");

const myCanva = document.querySelector("#myCanva");
const ctx = myCanva.getContext("2d");

let isDrawing;
let lastX = 0;
let lastY = 0;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 800, 400);

fontColorPicker.addEventListener("change", (event) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
});

background.addEventListener("change", (event) => {
  ctx.fillStyle = event.target.value;
  ctx.fillRect(0, 0, 800, 400);
});

fontSize.addEventListener("change", (event) => {
  ctx.lineWidth = event.target.value;
});

myCanva.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

myCanva.addEventListener("mousedown", (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});

myCanva.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();

    lastX = event.offsetX;
    lastY = event.offsetY;
  }
});

myCanva.addEventListener("mouseup", (event) => {
  isDrawing = false;
});

btnClear.addEventListener("click", (event) => {
  ctx.fillRect(0, 0, 800, 400);
  ctx.fillStyle = "white";
});

btnSave.addEventListener("click", (event) => {
  localStorage.setItem("canvaContent", myCanva.toDataURL());
  let link = document.createElement("a");
  link.download = "my-canva.png";
  link.href = myCanva.toDataURL();
  link.click();
});

btnRetrieve.addEventListener("click", (event) => {
  let savedItem = localStorage.getItem("canvaContent");
  if (savedItem) {
    let img = new Image();
    img.src = savedItem;
    img.onload = (event) => {
      ctx.drawImage(img, 0, 0);
    };
  }
});

