import { comprovaJugada } from "../controller/controller.js";

export function initView() {
  document.addEventListener("DOMContentLoaded", () => {
    definirDraggables()
    definirDroppables()
  })

}


// --------------------------------------------------------------------
// DRAG AND DROP
// --------------------------------------------------------------------

function definirDraggables() {
  // Definim les Cartes del jugador com a Draggables
  const items = document.querySelectorAll('.cartes .card');

  // attach the dragstart event handler
  items.forEach((item) => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
  });
}

//dragStart
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  this.style.opacity = '0.4';
}

//dragEnd
function dragEnd(e) {
  this.style.opacity = '1';
}

function definirDroppables() {
  // Definim les Cartes de la pila com a Droppables
  const items = document.querySelectorAll('.pila .card');

  // attach the dragstart event handler
  items.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', drop);
  });
}

//dragOver
function dragOver(e) {
  e.preventDefault();

  //Ressaltem les cartes com a zona drop
  if (e.target.classList.contains("card")) {
    e.target.classList.add('drag-over');
  }
}

// drop
function drop(e) {
  e.stopPropagation(); // stops the browser from redirecting.

  //Treiem el ressaltat de la carta com a zona drop
  e.target.classList.remove('drag-over');

  // Get the draggable element
  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);

  const valueCartaOrigen = draggable.dataset.value;
  const colourCartaOrigen = draggable.dataset.colour;

  // Get the droppable element
  let droppable = e.target;

  //Si fem drop sobre un element que no és la carta, busquem la l'element para que sigui carta
  while (!droppable.classList.contains("card")) {
    droppable = droppable.parentElement;
  }

  const valueCartaDesti = droppable.dataset.value;
  const colourCartaDesti = droppable.dataset.colour;

  const jugadaValida = comprovaJugada(valueCartaOrigen, colourCartaOrigen, valueCartaDesti, colourCartaDesti);

  if (jugadaValida) {
    console.log("Jugada vàlida")

    //Eliminem la carta que hem arrastrat a la pila de les cartes del jugador
    draggable.parentElement.removeChild(draggable)

    //Eliminen la carta de la pila sobre la que hem arrestrat la carta
    droppable.remove();

    //Afegim la carta que hem arrastrat a la pila
    draggable.draggable = false;
    document.getElementById('pila').appendChild(draggable);

    //Definim la nova carta de la pila com a droppable
    definirDroppables();
  }
  else {
    console.log("Jugada no vàlida")
  }
}


