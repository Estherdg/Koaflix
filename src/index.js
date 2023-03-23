import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore/lite";

// import "dotenv/config";

const firebaseConfig = {
  apiKey: "AIzaSyCa8j_Q1dqN5ZcvHEsSDAWBp_XZsW9Fbog",
  authDomain: "test-eoifront.firebaseapp.com",
  projectId: "test-eoifront",
};
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
  // Accedemos al div modal que será el que nos muestre la info más detallada de la peli.
  const btn = document.querySelector(".info");
  const modal = document.querySelector(".modal");
  const moreInfo = document.createElement("div");

  modal.appendChild(moreInfo);
  const close = document.querySelector(".close");

  btn.addEventListener("click", function () {
    window.alert("");
    // modal.style.display = "block";
    moreInfo.innerHTML = `<div class="more-info"><h2 class="tittle-modal">${doc.id}</h2>
    <p class="description">${doc.data().plot}</p> <p class="actors">${
      doc.data().actors
    }</p> <p class="director">${doc.data().director}</p>
    <p class="genres">${doc.data().genres}</p> <p class="year">${doc.data().year}</p>
    </div>`;
  });

  close.addEventListener("click", function () {
    modal.style.display = "none";
  });
});
