const toggle = document.querySelector('#dark-mode')
const body = document.querySelector('body')
const logo = document.querySelector('.logo i')
const moon = document.querySelector('.material-symbols-outlined')
const search = document.getElementById('search-button')
const play = document.getElementById('play')
import fontSelect from './font-theme.js';

let click = 0
function darkMode(){
    click = 1
    localStorage.setItem("color-mode","dark")

    toggle.classList.add('active')
    body.classList.add('active')
    /*If you want, you can add the active class 
    to other elements(logo,moon...) and 
    write separate css for them.
    */
    logo.style.color= "#e4771f";
    moon.style.color= "#e4771f";
     search.style.color= "#e4771f";
     play.style.backgroundColor= "#e4771f";
     fontSelect.style.color = "#ffff";
     
}

function lightMode(){
    localStorage.setItem("color-mode","light")

    toggle.classList.remove('active')
    body.classList.remove('active')
    logo.style.color= "";
    moon.style.color= "";
     search.style.color= "";
     play.style.backgroundColor= "";
     fontSelect.style.color = "";
}

toggle.addEventListener('click',() =>{
       if(click == 1){
        lightMode()
        click = 0
       } else{
         darkMode()
       }
})

function getColorStatus(){
    if (localStorage.getItem("color-mode") == "dark") {
        darkMode();
      } else {
        lightMode(); 
      }
}
getColorStatus()

