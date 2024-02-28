/*
la primera carta cliqueada debe de tener exactamente un número menos
y ser de un color distinto a la segunda carta cliqueada
*/


function empezarJuego(){
    alert("hola")
}

const mazo = []
const tipos = ["treboles", "corazones", "picas", "diamantes"]
const color = {
    corazones: "rojo",
    diamantes: "rojo",
    treboles: "negro",
    picas: "negro"
}

for (let i=1; i<=13; i++){
    for (let j=0; j<tipos.length; j++){

        const carta = {
            numero: i,
            color: color[tipos[j]],
            tipo: tipos[j]
            img: 
        }
        mazo.push(carta)

    }
}

console.log(mazo)
