document.addEventListener("DOMContentLoaded", start);

const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("url");

let filter = "alle";
let indhold;
const template = document.querySelector("template");
const dest = document.querySelector("#grid");
const dest2 = document.querySelector("#press");
const dest3 = document.querySelector("#cv");


function start() {

    hentMenu();
    hentFooter();
    hentGalleri();
    hentPresse();
    hentCv();

    const filtrer = document.querySelectorAll(".filter");
    filtrer.forEach(knap => knap.addEventListener("click", filtrerBilleder));




}


async function hentMenu() {

    const voresMenu = await fetch("menu.html");
    let denHentede = await voresMenu.text();
    document.querySelector("nav").innerHTML = denHentede;
    console.log("nav");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);

}


async function hentFooter() {

    const voresMenu = await fetch("footer.html");
    let denHentede = await voresMenu.text();
    document.querySelector("footer").innerHTML = denHentede;


}

async function hentPresse() {

    //Henter vores Json fra WP
    const url = "http://malikgrosos.com/charlottekrogh/wordpress/wp-json/wp/v2/press?per_page=100"
    //Henter datafilen
    const minJson = await fetch(url);
    //Den hentede data skal tolkes som json
    indhold = await minJson.json();
    //Vi kalder funktionen der viser data i DOM
    visPresse();
    console.log(hentPresse);
}

async function hentCv() {

    //Henter vores Json fra WP
    const url = "http://malikgrosos.com/charlottekrogh/wordpress/wp-json/wp/v2/cv?per_page=100"
    //Henter datafilen
    const minJson = await fetch(url);
    //Den hentede data skal tolkes som json
    indhold = await minJson.json();
    //Vi kalder funktionen der viser data i DOM
    visCv();
    console.log(hentCv);
}

async function hentGalleri() {

    //Henter vores Json fra WP
    const url = "http://malikgrosos.com/charlottekrogh/wordpress/wp-json/wp/v2/vaerk?per_page=100"
    //Henter datafilen
    const minJson = await fetch(url);
    //Den hentede data skal tolkes som json
    indhold = await minJson.json();
    //Vi kalder funktionen der viser data i DOM
    visIndhold();
    console.log(hentGalleri);
}


function filtrerBilleder() {

    //Sæt variable filter til aktuel værdi

    //    let valgt = document.querySelector(".valgt");

    //    valgt.classList.remove("valgt");

    filter = this.dataset.filter;

    //    this.classList.add("valgt");

    visIndhold();

}

function visIndhold() {


    dest.innerHTML = "";

    indhold.forEach(vaerk => {
        console.log(filter);


        if (vaerk.aar == filter || filter == "alle") { // Filtrere kategorier og kunstnernavn

            const klon = template.cloneNode(true).content;

            klon.querySelector("img").src = vaerk.billede.guid;
            klon.querySelector(".aarstal").innerHTML = vaerk.aar;
            klon.querySelector("img").addEventListener("click", () => {


                visDetalje(vaerk);


            })

            dest.appendChild(klon);

        }


    })
}


function visPresse() {

    indhold.forEach(vaerk => {

        const klon = template.cloneNode(true).content;

        klon.querySelector("img").src = vaerk.article.guid;
        klon.querySelector(".titel").textContent = vaerk.titel;
        klon.querySelector("a").href = vaerk.url;

        dest2.appendChild(klon);

    })
}

function husetAsnaes(vaerk) {
    console.log("huset i asnæs")

    location.href = urlLink;
}


function visCv() {

    indhold.forEach(vaerk => {

        const klon = template.cloneNode(true).content;

        klon.querySelector(".cv").innerHTML = vaerk.cv;

        dest3.appendChild(klon);

    })
}



function visDetalje(vaerk) {
    console.log(visDetalje);


    location.href = `detalje.html?id=${vaerk.id}`;

}

function toggleMenu() {
    console.log("click menu");

    document.querySelector(".dropdown-content").classList.toggle("hidden");


    let erSkjult = document.querySelector(".dropdown-content").classList.contains("hidden");

    if (erSkjult == true) {

        document.querySelector(".dropdown-content").style.display = "none";

    } else {

        document.querySelector(".dropdown-content").style.display = "block";

    }
}


$(window).load(function () {
    $(".se-pre-con").fadeOut("slow");;
});
