const close = document.querySelector(".close__modal");
const modal = document.querySelector(".modal__adjust");
const content = document.querySelector(".container__content");
const chevronModal = document.querySelector(".chevron__modal");
const optionsBar = document.querySelector(".options__bar");
const selectedOption = document.querySelector(".selected");
const adjustButton = document.querySelector("#adjustButton")
const newProjectButton = document.querySelector("#newProjectButton");
const fileInput = document.querySelector('#fileInput')
const imagePreview = document.querySelector('#imagePreview');
const uploadLabel = document.querySelector('.upload__label');
const zoomPercentage = document.querySelector('.zoom__percentage');
const minus = document.querySelector('#minus');
const plus = document.querySelector('#plus');
const inputProjectName = document.querySelector('.input__project__name');
const projectNameDefault = document.querySelector('.proyect__name__default');
const slider = document.querySelector('#slider');
const bar = document.querySelector(".zoom__bar__content");
const logo = document.querySelector('.logo__loader');
const containerLogo = document.querySelector('.container__logo');
const currentDate = new Date();
const formattedDate = formatCustomDate(currentDate);
let currentWidth = 50;
let reader;

updateCurrentWidth();
addEventListeners()


function addEventListeners(){
    close.addEventListener("click", ()=>{
        if(content.classList.contains('menu__opened')){
            content.classList.remove('menu__opened');
            modal.classList.add('closed');
            chevronModal.classList.add('open__modal')
            optionsBar.classList.add('menu__opened');
        }else{
            modal.classList.remove('closed');
            content.classList.add('menu__opened');
            chevronModal.classList.remove('open__modal')
            optionsBar.classList.remove('menu__opened');
        }
    })
    adjustButton.addEventListener("click", ()=>{
        if(!content.classList.contains('menu__opened')){
            content.classList.add('menu__opened');
            modal.classList.remove('closed');
            optionsBar.classList.remove('menu__opened');
        }else {
            content.classList.remove('menu__opened');
            modal.classList.add('closed');
            optionsBar.classList.add('menu__opened');
        }
    })
    newProjectButton.addEventListener("click", ()=>{
        imagePreview.innerHTML = '';
        uploadLabel.style.display = "block";
        currentWidth = 50;
        fileInput.value = '';
        slider.style.left = currentWidth + "%";
        updateCurrentWidth();
        updateTitle();
    })
    fileInput.addEventListener('change', (e) => {
        let input = e.target;
    
        if (input.files && input.files[0]) {
            uploadLabel.style.display = "none";
            reader = new FileReader();
            reader.onload = function (e) {
                let image = new Image();
                image.src = e.target.result;
                image.classList.add("image");
                imagePreview.innerHTML = '';
                imagePreview.appendChild(image);
                updateWidthImage();
            };
            reader.readAsDataURL(input.files[0]);
        }else{
            uploadLabel.style.display = "block";
        }
    });
    
    plus.addEventListener("click", () =>{
        if (currentWidth < 100){
            currentWidth += 1;
            updateWidthImage();
        }
        updateCurrentWidth();
    })

    minus.addEventListener("click", () =>{
        if(currentWidth > 1){
        currentWidth -=1;
        updateWidthImage(); 
    } 
    updateCurrentWidth();
    })
    
    slider.addEventListener("mousedown", sliderInit);
    bar.addEventListener("mousedown", sliderInit);

    imagePreview.addEventListener("wheel", function(e) {
        let delta = e.deltaY || e.detail || e.wheelDelta;
        if (delta < 0) {
            moveSlider(1);
        } else {
            moveSlider(-1);
        }
        e.preventDefault();
    });

    document.addEventListener('DOMContentLoaded', updateTitle)   

    projectNameDefault.addEventListener('click', () => {
        projectNameDefault.style.display = 'none';
        let input = document.createElement('input');
        input.placeholder = `Enter your title...`;
        input.classList.add('custom__name__project');
        inputProjectName.appendChild(input);
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                projectNameDefault.innerText = `${input.value} - ${formattedDate}` || updateTitle();
                projectNameDefault.style.display = 'block';
                inputProjectName.removeChild(input);
            }
    })
    });
}

function valBetween(v, min, max) {
    return Math.min(max, Math.max(min, v));
}

function updateWidth(percent) {
    currentWidth = Math.round(valBetween(percent * 100, 0, 100));
}

function updateWidthImage(){
    imagePreview.style.width = currentWidth + "%"; 
}

function sliderInit(e) {
    e.preventDefault();
    document.addEventListener("mousemove", sliderDrag);
    document.addEventListener("mouseup", e => {
    document.removeEventListener("mousemove", sliderDrag);
});
}
  
function sliderDrag(e) {
    let x0 = bar.getBoundingClientRect().left;
    let width = bar.offsetWidth; 
    let dX = e.clientX - x0; 
    let dPercent = dX / width;

    slider.style.left = valBetween(dX / width * 100, 0, 100) + "%";
   
    updateWidthImage();
    updateWidth(dPercent);
    updateCurrentWidth();
}

function moveSlider(direction) {
    let currentLeft = currentWidth
    let newLeft = currentLeft + direction * 1; 

    newLeft = valBetween(newLeft, 0, 100);

    slider.style.left = newLeft + "%";
    let percent = newLeft / 100;
    updateWidth(percent);
    updateWidthImage();
    updateCurrentWidth();
}

function updateCurrentWidth(){
    zoomPercentage.innerText = currentWidth + "%"
}

function updateTitle(){
    projectNameDefault.innerText = `MY PROJECT - ${formattedDate}`;    
}
  

function formatDate(date) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatCustomDate(date) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

createLogo()

function createLogo() {
  for (let i = 1; i < 26; i++) {
    let div = document.createElement('div');
    div.classList.add(`logo__piece`,  "initial__position");
    logo.appendChild(div);
    setTimeout(() => {
      div.classList.remove("initial__position");  
      div.classList.add(`logo__${i}`)
      div.style.transition = `top 0.5s ${i * 0.01}s ease`;;
    } , i * 100)
    
  }
  cleanAnimation();
  
}

function cleanAnimation() {
    setTimeout(() => {
      containerLogo.style.opacity = 0;
      containerLogo.style.transition = "opacity 0.5s linear";
      setTimeout(() => {
        containerLogo.innerHTML = '';
        containerLogo.style.display = 'none';
      }, 500);
    }, 4000);
  }







