import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCa8j_Q1dqN5ZcvHEsSDAWBp_XZsW9Fbog",
  authDomain: "test-eoifront.firebaseapp.com",
  projectId: "test-eoifront",
};

async function getMovies() {
  const db = getFirestore(initializeApp(firebaseConfig));

  const getMovies = await getDocs(collection(db, "movies"));
  getMovies.forEach((doc) => {
    // Aquí accedemos al div card y dentro de éste al título y la imagen. Además añadimos un botón para mostrar más info.
    const carta = document.querySelector(".card");
    const padre = document.createElement("div");

    padre.innerHTML = `<div><h2 class="tittle">${doc.id}</h2>
  <img src="${doc.data().posterUrl}" alt="${doc.id}" class="image-movie">
  <button class="info">Info</button>
  </div>`;

    carta.appendChild(padre);

    const btn = document.querySelectorAll(".info");
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", function (e) {
        e.preventDefault();
        modal.classList.add("modal-s");
      });
    };

    const modal = document.querySelector(".modal");
    const moreInfo = document.createElement("div");
    moreInfo.innerHTML = `<div class="more-info">
  <div><button class="close">x</button></div>
  <h2 class="tittle-modal">${doc.id}</h2>
  <p class="description">${doc.data().plot}</p> <p class="actors">${doc.data().actors
      }</p> <p class="director">${doc.data().director}</p>
  <p class="genres">${doc.data().genres}</p> <p class="year">${doc.data().year}</p>
  </div>`;
    modal.appendChild(moreInfo);

    // Accedemos al div modal que será el que nos muestre la info más detallada de la peli.
    const close = document.querySelectorAll(".close");
    for (let j = 0; j < close.length; j++) {
      close[j].addEventListener("click", function () {
        modal.style.display = "none";
      });
    };
  });
};
getMovies();
