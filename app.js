window.onload = function () {
  //turno inicial azul
  var turno = "fichaAzul";
  //condiciones iniciales de fichas azules
  var arrayFichasAzules = localStorage.getItem('fichasAzules');
  var arrayFichasAzules = JSON.parse(arrayFichasAzules);
  if (arrayFichasAzules !== null) {
    for (celda of arrayFichasAzules) {
      document.getElementById(celda).className = "fichaAzul";
    }
  }
  //condiciones iniciales de fichas amarillas
  var arrayFichasAmarillas = localStorage.getItem('fichasAmarillas');
  var arrayFichasAmarillas = JSON.parse(arrayFichasAmarillas);
  if (arrayFichasAmarillas !== null) {
    for (celda of arrayFichasAmarillas) {
      document.getElementById(celda).className = "fichaAmarilla";
    }
  }
  //condiciones iniciales de turno
  if (localStorage.getItem('turno') == "fichaAmarilla") {
    turno = "fichaAmarilla";
    document.getElementById("turno").style.backgroundColor = "#FFD966";
  }
  //establecer un EventListener para cada boton de flecha que agrega fichas
  var botones = document.getElementsByClassName("flecha");
  for (boton of botones) {
    boton.addEventListener("click", function (e) {
      //obtengo la columna sobre la que se hizo click
      if (document.getElementById("resultado").innerHTML == "") {
        var columna = e.target.id.substring(e.target.id.length - 1);
        var i, hueco, celda;
        //verificar en toda la columna la posicion y el color a ocupar 
        for (i = 6; i > 0; i--) {
          var celda = "celda" + columna + i;
          var hueco = document.getElementById(celda);
          if (hueco.className == "hueco") {
            hueco.className = turno;
            //verifico si termino el juego con ganador o empate
            var finHorizontal = verificar(1, i, "horizontal");
            var finVertical = verificar(columna, 1, "vertical");
            /* var finDiagonalAbajo=verificar(columna,i,"diagonalAbajo");
            var finDiagonalArriba=verificar(columna,i,"diagonalArriba"); */
            if (finHorizontal == "azul" || finVertical == "azul" || finHorizontal == "amarillo" || finVertical == "amarillo") {
              document.getElementById("resultado").innerHTML = "GAN&Oacute;!";
              break;
            }
            var huecos = document.getElementsByClassName("hueco");
            if (huecos.length == 0) {
              document.getElementById("resultado").innerHTML = "EMPATE";
              break;
            }
            //cambio el turno y guardo el avance en localstorage
            if (turno == "fichaAzul") {
              turno = "fichaAmarilla";
              document.getElementById("turno").style.backgroundColor = "#FFD966";

              var azules = document.getElementsByClassName("fichaAzul");
              var fichasAzules = [];
              for (ficha of azules) {
                fichasAzules.push(ficha.id)
              }
              localStorage.setItem('fichasAzules', JSON.stringify(fichasAzules));
            }
            else {
              turno = "fichaAzul";
              document.getElementById("turno").style.backgroundColor = "#44546A";
              var amarillas = document.getElementsByClassName("fichaAmarilla");
              var fichasAmarillas = [];
              for (ficha of amarillas) {
                fichasAmarillas.push(ficha.id)
              }
              localStorage.setItem('fichasAmarillas', JSON.stringify(fichasAmarillas));
            }
            localStorage.setItem('turno', turno);
            break;
          }
        }
      }
    });
  }
}

function verificar(columna, fila, sentido) {
  var azul = 0;
  var amarillo = 0;
  var celda;
  var cantidad;
  if (sentido == "vertical") {
    cantidad = 6;
  }
  else {
    cantidad = 7;
  }
  for (var i = 1; i <= cantidad; i++) {
    switch (sentido) {
      case "horizontal":
        celda = "celda" + i + fila;
        break;
      case "vertical":
        celda = "celda" + columna + i;
        break;
      case "diagonalAbajo":
        celda = "celda" + (parseInt(columna) + i - 1) + (parseInt(fila) + i - 1);
        break;
      case "diagonalArriba":

        break;
    }
    if (document.getElementById(celda).className != "hueco") {
      if (document.getElementById(celda).className == "fichaAzul") {
        amarillo = 0;
        azul++;
        if (azul == 4) break;
      }
      else {
        azul = 0;
        amarillo++;
        if (amarillo == 4) break;
      }
    }
    else {
      amarillo = 0;
      azul = 0;
    }
  }
  if (azul == 4) {
    return "azul";
  }
  else if (amarillo == 4) {
    return "amarillo";
  }
  else {
    return "ninguno"
  }
}

function reiniciar() {
  for (var i = 1; i <= 7; i++) {
    for (var j = 1; j <= 6; j++) {
      document.getElementById("celda" + i + j).className = "hueco";
    }
  }
  document.getElementById("resultado").innerHTML = "";
  localStorage.clear();
}