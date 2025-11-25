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
   SECTIONS (TABS)
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
   ACCORDÉONS — SYSTÈME AUTO-HEIGHT ANIMÉ (AUCUN CONTENU TRONQUÉ)
   ========================================================= */

function toggleAcc(id) {
    const body = document.getElementById(id);
    const arrow = document.getElementById(id + "-arrow");

    if (!body) return;

    const isOpening = !body.classList.contains("open");

    if (isOpening) {
        openAccordion(body, arrow);
    } else {
        closeAccordion(body, arrow);
    }

    // IMPORTANT : recalcul dynamique pour tous les parents
    updateParentHeights(body);
}

/* --- Fonction d'ouverture --- */
function openAccordion(body, arrow) {
    body.classList.add("open");

    // Étape 1 : fixer hauteur actuelle (0 → auto simulé)
    body.style.maxHeight = "0px";
    body.style.opacity = "0";

    // Étape 2 : forcer un reflow
    void body.offsetHeight;

    // Étape 3 : animer vers la vraie hauteur
    const fullHeight = body.scrollHeight + "px";

    body.style.maxHeight = fullHeight;
    body.style.opacity = "1";

    if (arrow) arrow.style.transform = "rotate(90deg)";
}

/* --- Fonction de fermeture --- */
function closeAccordion(body, arrow) {
    const fullHeight = body.scrollHeight + "px";

    // Fixer la hauteur actuelle avant de l'animer
    body.style.maxHeight = fullHeight;
    body.style.opacity = "1";

    // Reflow
    void body.offsetHeight;

    // Puis animer vers 0
    body.style.maxHeight = "0px";
    body.style.opacity = "0";

    body.classList.remove("open");

    if (arrow) arrow.style.transform = "rotate(0deg)";
}

/* --- Mise à jour automatique des hauteurs parents --- */
function updateParentHeights(body) {
    let parent = body.parentElement;

    while (parent) {
        if (parent.classList && parent.classList.contains("acc-body") && parent.classList.contains("open")) {
            parent.style.maxHeight = parent.scrollHeight + "px";
        }
        parent = parent.parentElement;
    }
}
