


document.addEventListener("DOMContentLoaded", start);


     let filter = "alle";
     let indhold;
     let template = document.querySelector("template");
     let dest = document.querySelector("#grid");
     let dest2 = document.querySelector("#press");




     function start() {
         console.log(start);
         hentMenu();
         hentFooter();
         hentGalleri();
         hentPresse();
         const filtrer = document.querySelectorAll(".filter");
         filtrer.forEach(knap => knap.addEventListener("click", filtrerBilleder));


     }

     async function hentMenu() {

         const voresMenu = await fetch("menu.html");
         let denHentede = await voresMenu.text();
         document.querySelector("nav").innerHTML = denHentede;
         console.log("nav");
         //            document.querySelector("#menuknap").addEventListener("click", toggleMenu);

     }


     async function hentFooter() {

         const voresMenu = await fetch("footer.html");
         let denHentede = await voresMenu.text();
         document.querySelector("footer").innerHTML = denHentede;
         //            document.querySelector("#menuknap").addEventListener("click", toggleMenu);

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
         console.log(filter);

         visIndhold();

     }

     function visIndhold() {

         dest.innerHTML = "";

         indhold.forEach(vaerk => {
             console.log(filter);

             if (vaerk.aar == filter || filter == "alle") { // Filtrere kategorier og kunstnernavn

                 const klon = template.cloneNode(true).content;

                 klon.querySelector("img").src = vaerk.billede.guid;
//                 klon.querySelector(".aarstal").textContent = vaerk.aar;




                 dest.appendChild(klon);

             }
         })


     }   function visPresse() {

         dest2.innerHTML = "";

         indhold.forEach(vaerk => {
             console.log(filter);

             if (vaerk.aar == filter || filter == "alle") { // Filtrere kategorier og kunstnernavn

                 const klon = template.cloneNode(true).content;

                 klon.querySelector("img").src = vaerk.article.guid;
                 klon.querySelector(".titel").textContent = vaerk.titel;

                 dest2.appendChild(klon);

             }
         })


     }


