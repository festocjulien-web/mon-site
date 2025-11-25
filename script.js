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
   ACCORDÉONS — VERSION SIMPLE (AUCUN TRONQUAGE)
   ========================================================= */
function toggleAcc(id) {
    const body = document.getElementById(id);
    const arrow = document.getElementById(id + "-arrow");

    if (!body) return;

    const isVisible = body.style.display === "block";

    if (isVisible) {
        body.style.display = "none";
        if (arrow) arrow.style.transform = "rotate(0deg)";
    } else {
        body.style.display = "block";
        if (arrow) arrow.style.transform = "rotate(90deg)";
    }
}
