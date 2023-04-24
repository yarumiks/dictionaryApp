
const fontSelect = document.querySelector("[data-font-theme]")

function SetFont(theme) {
    if (theme === "Poppins") {
        document.body.classList.remove("theme--Roboto")
        document.body.classList.remove("theme--Open-Sans")
        if (!document.body.classList.contains("theme--Poppins")) {
            document.body.classList.add("theme--Poppins")
            document.body.style.fontFamily = 'Poppins'
        }
        localStorage.setItem("font-theme", theme);
    }
    else if (theme === "Roboto") {
        document.body.classList.remove("theme--Poppins")
        document.body.classList.remove("theme--Open-Sans")
        if (!document.body.classList.contains("theme--Roboto")) {
            document.body.classList.add("theme--Roboto")
            document.body.style.fontFamily = 'Roboto'
        }
        localStorage.setItem("font-theme", theme);
    } 
    else if (theme === "Open Sans") {
        document.body.classList.remove("theme--Poppins")
        document.body.classList.remove("theme--Roboto")
        if (!document.body.classList.contains("theme--Open-Sans")) {
            document.body.classList.add("theme--Open-Sans")
            document.body.style.fontFamily = 'Open Sans'
        }
        localStorage.setItem("font-theme", theme);
    }
}

const initialTheme = localStorage.getItem("font-theme") || "Roboto";
SetFont(initialTheme)

fontSelect.value = initialTheme;

fontSelect.addEventListener("change", (evt)=>{
    SetFont(evt.target.value);
})

