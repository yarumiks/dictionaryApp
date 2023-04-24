import "./dark-mode.js";
import "./font-theme.js";
import dictionarySearch from "./dictionary-api.js";

const searchBtn = document.getElementById("search-button")
const searchInput = document.getElementById("search-input")
const audio = document.getElementById('audio')
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

play.addEventListener('click', () => {
    audio.play()
})


function search(term) {
    setDataState("busy");
    const keyword = term || searchInput.value;
    dictionarySearch(keyword).then((result) => {
        if (result.error) {
            setDataState("error");
        } else {
            setDataState("keyword");
            fillKeyword(result[0]);
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


function fillKeyword(data) {
    const titleWordEl = document.querySelector("[data-keyword]")
    titleWordEl.innerText = data.word;

    const pronunciationEl = document.querySelector("[data-pronunciation]")
    pronunciationEl.innerText = data.phonetics || "";

    let audioData = data.phonetics.find((e) => {
        return e.audio
    })

    // const audioEl = document.querySelector("[data-audio]")
    //      audioEl.setAttribute(audioData.audio)

}


function fillExplanation(data) {
  
    const explanation = document.querySelector("[data-explanation]")
    const headerWord = document.querySelector(".wanted-word")
    explanation.innertext = "";

    for (const head of data) {
        console.log(head.phonetics[0].audio)
        let html = "";
        html += `
            <section class="wanted-word">
            <div class="word-head">
            <h1 data-keyword>${head.word}</h1>
            <p data-pronunciation>${head.phonetic}</p>
        </div>
        <button data-play id="play">
            <figure class="word-audio">
                <audio data-audio id="audio" controls src="${head.phonetics[0].audio}">
                    <a href="${head.phonetics.sourceUrl}">
                        Download audio
                    </a>
                </audio>
            </figure>
             <i class="fa-solid fa-play"></i>
          </button>
        </section>
            `
            headerWord.innerHTML = html;
    
        for (const mean of head.meanings) {
            console.log(mean)
            let exp1 = "";
            exp1 +=
                `
                 <h2 class="sentenceO">${mean.partOfSpeech}</h2>
                  <h3 class="s-mean">meaning</h3>
                 `
            explanation.innerHTML = exp1;
        }
    }
}


   
// let exp = "";
//                     exp += `
//                      <ul class="meaning-list">
//                          <li>
//                             <p>${dfn.definition}</p>
//                              <p class="example">${dfn.expamle ? dfn.example : 'no example'}</p>
//                          </li>
//                      </ul>
    
//                      `
//                      console.log(dfn.example)
//                      explanation.innerHTML = exp;




 // let exp = "";
            //     exp += `
            //      <h2 class="sentenceO">${main.partOfSpeech}</h2>
            //      <h3 class="s-mean">meaning</h3>
            //      <ul class="meaning-list">
            //          <li>
            //             <p>${main.definitions}</p>
            //              <p class="example"></p>
            //          </li>
            //          <li>Lorem ipsum dolor sit amet.</li>
            //          <li>Lorem ipsum dolor sit amet.</li>
            //          <li>Lorem ipsum dolor sit amet.</li>
            //          <li>Lorem ipsum dolor sit amet.</li>
            //      </ul>

            //      `