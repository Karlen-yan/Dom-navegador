// Obtener elementos del DOM
const modoCasilla = document.querySelector("#modoCasilla");
const modoFila = document.querySelector("#modoFila");
const modoCol = document.querySelector("#modoCol");
const casillas = document.querySelectorAll(".casilla");
const nodePath = document.querySelector("#nodePath");

// Modo inicial

let modoSeleccionado = "casilla"; 

// Función para obtener la ruta de un elemento en el DOM
function obtenerRuta(elemento) {
  let ruta = "";

  while (elemento && elemento.nodeType === Node.ELEMENT_NODE) {
    const nombre = elemento.nodeName.toLowerCase();
    const clases = elemento.className ? `.${elemento.className}` : "";
    ruta = `${nombre}${clases} > ${ruta}`;
    elemento = elemento.parentNode;
  }

  return ruta.substring(0, ruta.length - 3);
}

// Función para seleccionar una casilla
function seleccionarCasilla(casilla) {
  // Deseleccionar casillas si no estamos en modo de selección de casillas
  if (modoSeleccionado !== casilla) {
    casillas.forEach((c) => c.classList.remove("casillaSel"));
  }

  casilla.classList.add("casillaSel"); // Seleccionar la casilla clicada
  nodePath.textContent = obtenerRuta(casilla); // Mostrar ruta en el #nodePath
}

// Función para seleccionar una fila completa
function seleccionarFila(fila) {
  // Deseleccionar casillas si no estamos en modo de selección de filas
  if (modoSeleccionado !== fila) {
    casillas.forEach((c) => c.classList.remove("casillaSel"));
  }

  fila.querySelectorAll(".casilla").forEach((c) => c.classList.add("casillaSel"));
  nodePath.textContent = obtenerRuta(fila); // Mostrar ruta en el #nodePath
}

// Función para seleccionar una columna completa
function seleccionarColumna(columna) {
  // Deseleccionar casillas si no estamos en modo de selección de columnas
  if (modoSeleccionado !== columna) {
    casillas.forEach((c) => c.classList.remove("casillaSel"));
  }

  const index = [...columna.parentElement.children].indexOf(columna);

  casillas.forEach((c, i) => {
    if (i % 8 === index) {
      c.classList.add("casillaSel");
    }
  });

  nodePath.textContent = `columna ${index + 1}`; 
}

// Event listener para clicar en una casilla
casillas.forEach((casilla) => {
  casilla.addEventListener("click", () => {
    if (modoSeleccionado === "casilla") {
      seleccionarCasilla(casilla);
    } else if (modoSeleccionado === "fila") {
      seleccionarFila(casilla.parentElement);
    } else if (modoSeleccionado === "columna") {
      seleccionarColumna(casilla);
    }
  });
});

// Event listener para cambiar el modo de selección
modoCasilla.addEventListener("click", () => {
  modoSeleccionado = "casilla";
});

modoFila.addEventListener("click", () => {
  modoSeleccionado = "fila";
});

modoCol.addEventListener("click", () => {
  modoSeleccionado = "columna";
});


// Event listener para clicar en una casilla
casillas.forEach((casilla) => {
  casilla.addEventListener("click", () => {
    if (modoSeleccionado === "casilla") {
      seleccionarCasilla(casilla);
      player.currentPosition = casilla;
    } else if (modoSeleccionado === "fila") {
      seleccionarFila(casilla.parentElement);
    } else if (modoSeleccionado === "columna") {
      seleccionarColumna(casilla);
    }
  });
});
// // Definir el objeto player
const player = {
  currentPosition: null, 
  // Función para mover la casilla seleccionada hacia arriba
// Función para mover la casilla seleccionada hacia arriba
moveUp: function() {
  const currentRow = this.currentPosition.parentElement;
  const previousRow = currentRow.previousElementSibling;
  if (previousRow) {
    const targetCellIndex = Array.prototype.indexOf.call(currentRow.children, this.currentPosition);
    const targetCell = previousRow.children[targetCellIndex];
    this.currentPosition.classList.remove("casillaSel");
    targetCell.classList.add("casillaSel");
    this.currentPosition = targetCell;
    nodePath.textContent = obtenerRuta(this.currentPosition); 
  }
},

// Función para mover la casilla seleccionada hacia abajo
moveDown: function() {
  const currentRow = this.currentPosition.parentElement;
  const nextRow = currentRow.nextElementSibling;
  if (nextRow) {
    const targetCellIndex = Array.prototype.indexOf.call(currentRow.children, this.currentPosition);
    const targetCell = nextRow.children[targetCellIndex];
    this.currentPosition.classList.remove("casillaSel");
    targetCell.classList.add("casillaSel");
    this.currentPosition = targetCell;
    nodePath.textContent = obtenerRuta(this.currentPosition);
  }
},


  // Función para mover la casilla seleccionada hacia la izquierda
  moveLeft: function() {
    const previousCell = this.currentPosition.previousElementSibling;
    if (previousCell) {
      this.currentPosition.classList.remove("casillaSel");
      previousCell.classList.add("casillaSel");
      this.currentPosition = previousCell;
      nodePath.textContent = obtenerRuta(this.currentPosition); 
    }
  },

  // Función para mover la casilla seleccionada hacia la derecha
  moveRight: function() {
    const nextCell = this.currentPosition.nextElementSibling;
    if (nextCell) {
      this.currentPosition.classList.remove("casillaSel");
      nextCell.classList.add("casillaSel");
      this.currentPosition = nextCell;
      nodePath.textContent = obtenerRuta(this.currentPosition); 
    }
  }
};

// Event listener para mover la casilla seleccionada con las teclas de dirección
document.addEventListener("keydown", (event) => {

  const key = event.key;
  if (key === "ArrowUp") {
    // Move the player up
    player.moveUp();
  } else if (key === "ArrowDown") {
    // Move the player down
    player.moveDown();
  } else if (key === "ArrowLeft") {
    // Move the player left
    player.moveLeft();
  } else if (key === "ArrowRight") {
    // Move the player right
    player.moveRight();
  }

});