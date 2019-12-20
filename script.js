document.addEventListener("DOMContentLoaded", start);


let filter = "ler";
let indhold;
const template = document.querySelector("template");
const dest = document.querySelector("#grid");
const dest2 = document.querySelector("#press");
const dest3 = document.querySelector(".cvtekst");

let loader = document.querySelector("body").classList.add("fadeIn");


function start() {

    window.addEventListener("load", (loader) =>

        {
            console.log('page is fully loaded');
            const filtrer = document.querySelectorAll(".filter");
            filtrer.forEach(knap => knap.addEventListener("click", filtrerBilleder));


            hentMenu();
            hentFooter();
            hentPresse();
            hentCv();
            hentGalleri();

        })



}


async function hentMenu() {


    const voresMenu = await fetch("menu.html");
    let denHentede = await voresMenu.text();
    document.querySelector("nav").innerHTML = denHentede;
    console.log("nav");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);

    let menubtn = document.querySelectorAll("#menu .dropdown-content a");

    menubtn.forEach(valgt => valgt.addEventListener("click", () => {

        let valgt = document.querySelector(".valgt");

        valgt.classList.remove("valgt");

        this.classList.add("valgt");


    }));


}

//function styleHeader() {
//    console.log("click")
//
//    let valgt = document.querySelector(".valgt");
//
//    valgt.classList.remove("valgt");
//
//    this.classList.add("valgt");
//}




async function hentFooter() {

    const voresMenu = await fetch("footer.html");
    let denHentede = await voresMenu.text();
    document.querySelector("footer").innerHTML = denHentede;


}

async function hentPresse() {

    //Henter vores Json fra WP
    const url = "http://malikgrosos.com/charlottekrogh/wordpress/wp-json/wp/v2/presse?per_page=100"
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
    const site = "https://www.malikgrosos.com/charlottekrogh/"

    const json = "wordpress/wp-json/wp/v2/vaerker?per_page=100"

    const url = `${site}` + `${json}`;

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

    let valgt = document.querySelector(".valgt");

    valgt.classList.remove("valgt");

    filter = this.dataset.filter;

    this.classList.add("valgt");


    visIndhold();

}

function visIndhold() {


    dest.innerHTML = ""; //fjerne alt indhold fra destinations variabel

    indhold.forEach(vaerk => { //for hver objekt i vores Array skal det næste gælde
        console.log(vaerk.kategori[0]);


        if (vaerk.kategori[0] == filter || filter == "ler") { //Kun hvis filter er det samme som kategori ELLERS er filter = alle.
            const klon = template.cloneNode(true).content; //kloner template

            klon.querySelector("img").src = vaerk.billede.guid; //lader klonet selector være = Jsondata
            //            klon.querySelector(".aarstal").innerHTML = vaerk.aar;
            klon.querySelector(".kategori").innerHTML = vaerk.kategori[0];
            klon.querySelector(".id").innerHTML = vaerk.id[0];
            klon.querySelector("img").addEventListener("click", () => {


                visDetalje(vaerk);

            })

            dest.appendChild(klon); //indsætter klon i vores destinations variabel.

        }


    })

}


function visPresse() {

    indhold.forEach(vaerk => {

        const klon = template.cloneNode(true).content;

        klon.querySelector("img").src = vaerk.article.guid;
        //        klon.querySelector(".titel").textContent = vaerk.titel;
        klon.querySelector("a").href = vaerk.url;


        dest2.appendChild(klon);

    })
}

function husetAsnaes(vaerk) {
    console.log("huset i asnæs")

    location.href = urlLink;
    link.target = '_blank';
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

    document.querySelector("#menu").classList.toggle("hidden");


    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {

        document.querySelector(".dropbtn").textContent = "☰";
        console.log("closed")

    } else {

        console.log("open");
        document.querySelector(".dropbtn").textContent = "X";

    }
}
