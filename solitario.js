/*
la primera carta cliqueada debe de tener exactamente un número menos
y ser de un color distinto a la segunda carta cliqueada
*/

function empezarJuego() {
    const mazo = crearMazo()
    const  barajado = desordenarMazo(mazo)
    servirMazo(barajado)
    console.log(barajado)
}

function servirMazo(barajado){
    /*
    crea 7 pilas (1, 2, 3, 4, 5, 6, 7)
    quita una carta del mazo barajado
    y la agrega a una pila
    */

    const pilas = []

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

    const mazo = []
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
                bocaAbajo: true
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

            const cartaHTML= document.createElement("div")
            const imagen = document.createElement("img")

            const ultimaCartaPila = j === pilas[i].length-1

            if (ultimaCartaPila){
                carta.bocaAbajo = false;
            }

            if (carta.bocaAbajo){
                imagen.src = "img/dorso.png"
            }else{
                imagen.src = carta.img
            }
            
            cartaHTML.classList.add("carta")
            cartaHTML.style.bottom = j*120+"px"
            cartaHTML.appendChild(imagen)
            pila.appendChild(cartaHTML)
        }
    }

}

