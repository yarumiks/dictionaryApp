import "./dark-mode.js";
import "./font-theme.js";
import dictionarySearch from "./dictionary-api.js";

const searchBtn = document.getElementById("search-button")
const searchInput = document.getElementById("search-input")



searchBtn.addEventListener('click', () => searchedWord())

function searchedWord(keyword) {
    const searchFor = keyword || searchInput.value;
    if (searchFor) {
        location.assign(location.href.split("#")[0] + "#" + encodeURIComponent(searchFor))
    }
}


console.log("location: " + location.href.split("#")[1]);
const firstWord = location.href.split("#")[1]
if (firstWord) {
    search(firstWord)
}

window.addEventListener("hashchange", (event) => {
    console.log("keyword: " + location.href.split("#")[1])
    const keyword = decodeURIComponent(location.href.split("#")[1])
    if (keyword) {
        search(keyword);
    }
})


searchInput.addEventListener("keydown", (event) => event.key === "Enter" && searchedWord())

function search(term) {
    setDataState("busy");
    const keyword = term || searchInput.value;
    dictionarySearch(keyword).then((result) => {
        if (result.error) {
            setDataState("error");
        } else {
            setDataState("keyword");
            // fillKeyword(result[0]);
            fillExplanation(result);
            searchInput.value = "";
        }
    });
}

function setDataState(state) {
    const dataState = document.querySelector("[data-state]")
    if (state) {
        dataState.setAttribute("data-state", state)
    } else {
        dataState.setAttribute("data-state", "")
    }
}

function fillExplanation(data) {
    const explanation = document.querySelector("[data-explanation]")
    const headerWord = document.querySelector(".wanted-word")
    explanation.innerHTML = "";
    headerWord.innerHTML = "";
    let html = "";
    html += `
            
            <div class="word-head">
            <h1 data-keyword>${data[0].word}</h1>
            <p data-pronunciation>${data[0].phonetic}</p>
        </div>
        <figure class="word-audio">
                <audio data-audio id="audio" src="${data[0].phonetics[0].audio ? data[0].phonetics[0].audio : data[0].phonetics[1].audio }">
                    <a href="${data[0].phonetics[0].sourceUrl}">
                        Download audio
                    </a>
                </audio>
            </figure>
        <button  type="button" aria-labelledby="audio"  class="button" id="play"><i class="fa-solid fa-play"></i></button>
            `
    headerWord.innerHTML = html;

    // audio button event
    const play = document.getElementById('play')
    const audio = document.getElementById('audio')
    play.addEventListener('click', ()=>{
        audio.play();
    })
    //
        
    data[0].meanings.forEach(a => {
        let exp1 = "";
        exp1 +=
            `
                 <h2 class="sentenceO">${a.partOfSpeech}</h2>
                  <h3 class="s-mean">meaning</h3>
                 `
        explanation.insertAdjacentHTML('beforeEnd', exp1);

        for (const b of a.definitions) {
            let mean = "";

            mean += `
                         <ul class="meaning-list">
                         <li>
                             <p>${b.definition}</p>
                             <p class="example">${b.example ? b.example : ''}</p>
                         </li>
                         </ul>
                         `
            explanation.insertAdjacentHTML('beforeEnd', mean);
        }
    });
}







