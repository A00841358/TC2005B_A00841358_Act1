const btnEntrar = document.getElementById('btnEntrar');
const check1 = document.getElementById('extraCheck');
const check2 = document.getElementById('terms');      
const userInp = document.getElementById('username');
const passInp = document.getElementById('password');
const mensajeAdmin = document.getElementById('administrador');
const listaPaises = document.getElementById('paises');
const listaRegiones = document.getElementById('regiones');

let datosPaises = [];

function validarTodo() {
    const loginOk = userInp.value !== "" && passInp.value !== "";
    const selectsOk = listaPaises.value !== "" && listaRegiones.value !== "";
    const checksOk = check1.checked && check2.checked;

    if (loginOk && selectsOk && checksOk) {
        btnEntrar.disabled = false;
    } else {
        btnEntrar.disabled = true;
    }
}

userInp.oninput = validarTodo;
passInp.oninput = validarTodo;
check1.onclick = validarTodo;
check2.onclick = validarTodo;
listaRegiones.onchange = validarTodo;

btnEntrar.onclick = function(evento) {
    evento.preventDefault();
    if (userInp.value === "1234" && passInp.value === "1234") {
        alert("¡Bienvenido!");
        window.location.href = "../profile/index.html";
    } else {
        alert("Algo salio mal.");
    }
};

async function cargarPaises() {
    const respuesta = await fetch('../Scripts/data.json');
    datosPaises = await respuesta.json();

    datosPaises.forEach((pais, indice) => {
        let opcion = document.createElement('option');
        opcion.value = indice;
        opcion.text = pais.countryName;
        listaPaises.appendChild(opcion);
    });
}

listaPaises.onchange = function() {
    listaRegiones.innerHTML = '<option value="">-Selecciona una region-</option>';
    const indiceElegido = listaPaises.value;
    if (indiceElegido !== "") {
        const regiones = datosPaises[indiceElegido].regions;
        
        regiones.forEach(region => {
            let opcion = document.createElement('option');
            opcion.value = region.shortCode;
            opcion.text = region.name;
            listaRegiones.appendChild(opcion);
        });
        listaRegiones.disabled = false;
    } else {
        listaRegiones.disabled = true;
    }
    validarTodo();
};
cargarPaises();