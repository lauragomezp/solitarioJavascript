/*
la primera carta cliqueada debe de tener exactamente un número menos
y ser de un color distinto a la segunda carta cliqueada
*/

var carta
var mazo =  []
var barajado = []
var pilas = []


function empezarJuego() {
    mazo = crearMazo()
    barajado = desordenarMazo(mazo)
    servirMazo(barajado)
    colocarCartasMazo(barajado)
    console.log(barajado)
}

function servirMazo(barajado){
    /*
    crea 7 pilas (1, 2, 3, 4, 5, 6, 7)
    quita una carta del mazo barajado
    y la agrega a una pila
    */

    for (let i=0; i<7; i++){
        pilas.push([])
        for (let j=0; j<i+1; j++){
            const primeraCartaBarajado = barajado[barajado.length-1]
            barajado.pop()
            pilas[i].push(primeraCartaBarajado)
        }
    }

    colocarCartas(pilas)

    console.log(pilas)
}

function crearMazo() {

    /*
    Crea un mazo de 52 cartas y las baraja
    */

    const tipos = ["treboles", "corazones", "picas", "diamantes"]
    const color = {
        corazones: "rojo",
        diamantes: "rojo",
        treboles: "negro",
        picas: "negro"
    }

    for (let i = 1; i <= 13; i++) {
        for (let j = 0; j < tipos.length; j++) {

            const carta = {
                numero: i,
                color: color[tipos[j]],
                tipo: tipos[j],
                img: "img/"+i+"_de_"+tipos[j]+".png",
                bocaArriba: false
            }
            mazo.push(carta)

        }
    }

    console.log(mazo)

    return mazo

}

function desordenarMazo(mazo){

    n = mazo.length-1
    let aux;
    while (n > 0){

        r = Math.floor(Math.random()*n+1)
        aux = mazo[r]
        mazo[r] = mazo[n]
        mazo[n] = aux
        n-=1

    }

    return mazo

}

function colocarCartas(pilas){
    /*
    colocar las cartas en las pilas
    construir un elemento html con ellas
    guardarlas en el div
    */
    for (let i=0; i<pilas.length; i++){
        const pila = document.getElementById("pila-"+i)
        for (let j = 0; j<pilas[i].length; j++){
            const carta = pilas[i][j]
            const ultimaCartaPila = j === pilas[i].length-1
            if (ultimaCartaPila){
                carta.bocaArriba = true
            }
           cartaHTML = crearCartaHTML(carta);
           cartaHTML.classList.add("cartaMesa")
           cartaHTML.style.bottom = j*120+"px"
           pila.appendChild(cartaHTML)
        }
    }

}

function colocarCartasMazo(barajado){

    const divMazoBarajado = document.getElementById("mazoBarajado")

    for (let i=0; i<barajado.length; i++){
        carta=barajado[i]
        cartaHTML = crearCartaHTML(carta);
        divMazoBarajado.appendChild(cartaHTML);
        cartaHTML.classList.add("cartaMazoBarajado")
    }

}

function crearCartaHTML(carta){

    const cartaHTML= document.createElement("div")
    const imagen = document.createElement("img")
    if (carta.bocaArriba){
        imagen.src = carta.img
    }else{
        imagen.src = "img/dorso.png"
    }

    cartaHTML.appendChild(imagen)

    cartaHTML.onclick=jugada(carta, cartaHTML)

    cartaHTML.draggable="true";

    //https://www.freecodecamp.org/espanol/news/centrar-en-html-div-con-css/

    return cartaHTML;

}

/*
Cuando un usuario hace click a una carta 
saber si puede moverla y moverla
*/

function jugada(carta, cartaHTML){

    isCartaJugable = carta.bocaArriba
    cartaJugable = carta

    if (!isCartaJugable){

    }else{
        cartaHTML.addEventListener('dragstart',DragEvent)
        cartaHTML.style.border="solid 8px red"
        for (let i = 0; i<pilas.length; i++){
            if (pilas[i].bocaArriba && cartaJugable.numero == pilas[i].numero-1 && cartaJugable.color != pilas[i].color){
                cartaDestino = pilas[i]
                cartaHTML.style.border="solid 8px green"
                cartaHTML.addEventListener('dragenter', dragEnter)
                cartaHTML.addEventListener('dragover', dragOver);
                cartaHTML.addEventListener('dragleave', dragLeave);
                cartaHTML.addEventListener('drop', drop);
            }
        }
    }

}

function DragEvent(e){
    console.log("Drag starts")
    e.dataTransfer.setData("text/plain", e.target.id)
}

/*function cartaValida(cartaDestino, cartaJugable, cartaHTML){

    if (cartaJugable.dataset.numero == cartaDestino.dataset.numero-1 
        && cartaDestino.dataset.color !== cartaJugable.dataset.color){
            cartaHTML.addEventListener('dragenter', dragEnter)
            cartaHTML.addEventListener('dragover', dragOver);
            cartaHTML.addEventListener('dragleave', dragLeave);
            cartaHTML.addEventListener('drop', drop);
            return cartaHTML
        }

}

function dragEnter(e) {
}

function dragOver(e) {
}

function dragLeave(e) {
}*/

function drop(e) {
    
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    e.target.appendChild(draggable);

    
}
