/* =========================================================
   CARROUSEL TITRES
   ========================================================= */
let index = 0;
const carousel = document.getElementById("carousel");
const groups = document.querySelectorAll(".title-group");

document.getElementById("rightArrow").onclick = () => {
    index = Math.min(index + 1, groups.length - 1);
    carousel.style.transform = `translateX(${-index * 100}%)`;
};

document.getElementById("leftArrow").onclick = () => {
    index = Math.max(index - 1, 0);
    carousel.style.transform = `translateX(${-index * 100}%)`;
};


/* =========================================================
   CHANGEMENT DE SECTION VIA TABS
   ========================================================= */
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        contents.forEach(c => c.classList.remove("active"));
        document.getElementById(tab.dataset.target).classList.add("active");

        window.scrollTo(0, 0);
    });
});


/* =========================================================
   ACCORDEONS (SLIDE + FADE + RE-CALCUL PARENTS)
   ========================================================= */

function toggleAcc(id) {
    const body = document.getElementById(id);
    const arrow = document.getElementById(id + "-arrow");

    if (!body) return;

    const isOpen = body.classList.contains("open");

    if (isOpen) {
        // Fermeture
        body.style.maxHeight = "0px";
        body.style.opacity = "0";
        body.classList.remove("open");

        if (arrow) arrow.style.transform = "rotate(0deg)";
    } else {
        // Ouverture
        body.classList.add("open");

        // Calcul dynamique de la hauteur
        body.style.maxHeight = body.scrollHeight + "px";
        body.style.opacity = "1";

        if (arrow) arrow.style.transform = "rotate(90deg)";
    }

    // Correction ULTRA IMPORTANTE :
    // on remonte l’arborescence et on recalcule les parents ouverts
    let parent = body.parentElement;

    while (parent) {
        if (parent.classList.contains("acc-body") && parent.classList.contains("open")) {
            parent.style.maxHeight = parent.scrollHeight + "px";
        }
        parent = parent.parentElement;
    }
}
