let amigos = [];
let confettiTimeout;

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!nombre || !nombreRegex.test(nombre)) {
        alert("Por favor, ingresa un nombre válido (sin números ni caracteres especiales).");
        input.value = "";
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        input.value = "";
        return;
    }

    amigos.push(nombre);
    actualizarListaAmigos();
    input.value = "";
}

function agregarDesdeExcel() {
    const textarea = document.getElementById("amigosExcel");
    const nombres = textarea.value
        .split("\n")  
        .map(nombre => nombre.trim())  
        .filter(nombre => nombre !== "");

    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    nombres.forEach(nombre => {
        if (nombreRegex.test(nombre) && !amigos.includes(nombre)) {
            amigos.push(nombre);
        }
    });

    actualizarListaAmigos();
    textarea.value = "";
}

function actualizarListaAmigos() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debes agregar al menos 2 amigos para realizar el sorteo.");
        return;
    }

    const indice = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indice];
    document.getElementById("resultado").textContent = `El amigo secreto es: ${amigoSorteado}`;

    amigos.splice(indice, 1);
    actualizarListaAmigos();
    lanzarConfetti();
}

function reiniciarJuego() {
    amigos = [];
    document.getElementById("resultado").textContent = "";
    actualizarListaAmigos();
    limpiarConfetti();
}

function lanzarConfetti() {
    limpiarConfetti();
    const body = document.body;

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = Math.random() * window.innerHeight + "px";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDelay = `${Math.random()}s`;
        body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 2000);
    }
}

function limpiarConfetti() {
    const confettis = document.querySelectorAll(".confetti");
    confettis.forEach(confetti => confetti.remove());
}

function agregarFooter() {
    const footer = document.createElement("footer");
    footer.textContent = "© Copyright";
    footer.style.textAlign = "center";
    footer.style.fontSize = "14px";
    footer.style.color = "#666";
    footer.style.padding = "10px 0";
    footer.style.backgroundColor = "#f9f9f9";
    document.body.appendChild(footer);
}

// Llamar a esta función cuando cargue la página
window.addEventListener("load", agregarFooter);

// Detectar la tecla "Enter" en el campo de texto
const input = document.getElementById("amigo");
input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        agregarAmigo();
    }
});

