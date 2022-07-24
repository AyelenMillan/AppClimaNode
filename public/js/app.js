const view = document.querySelector(".view");
const viewSvg = document.querySelector(".svg");
const search = document.querySelector("svg");
const viewMoreBox = document.querySelector(".info-card");
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const viewLess = document.querySelector(".less");

let currTime = () => {
    let currDate = new Date();
    let localTime = currDate.toLocaleTimeString();
    time.innerHTML = localTime;
};

let currDay = () => {
    let day = new Date();
    let options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    let today = day.toLocaleDateString('es-ES', options);
    date.innerHTML = today;
};

currDay();

setInterval(currTime, 1000);

view.addEventListener("click", ()=>{
    viewSvg.classList.toggle("girar");
    viewMoreBox.classList.toggle("visible");
    view.classList.toggle("menos");
    if(view.classList.contains("menos")){
        view.innerHTML = "Ver menos";
    }else{
        view.innerHTML = "Ver mas";
    }
});

viewSvg.addEventListener("click", ()=>{
    viewSvg.classList.toggle("girar");
    viewMoreBox.classList.toggle("visible");
    view.classList.toggle("menos");
    if(view.classList.contains("menos")){
        view.innerHTML = "Ver menos";
    } else{
        view.innerHTML = "Ver mas";
    }
});