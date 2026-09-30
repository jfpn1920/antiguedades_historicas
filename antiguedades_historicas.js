//-------------------------------------------//
//--|funcionalidad_antiguedades_historicas|--//
//-------------------------------------------//
const tarjetas = document.querySelectorAll(".tarjeta_antiguedad");
const botones_favorito = document.querySelectorAll(".boton_favorito");
const botones_detalles = document.querySelectorAll(".boton_detalles");
const filtro_epoca = document.getElementById("filtro_epoca");
const total_favoritos = document.getElementById("total_favoritos");
const mensaje_filtro = document.getElementById("mensaje_filtro");
//---------------------------------------------//
//--|favoritos_guardados_usando_localstorage|--//
//---------------------------------------------//
let favoritos = JSON.parse(localStorage.getItem("antiguedades_favoritas")) || [];
function guardar_favoritos() {
    localStorage.setItem("antiguedades_favoritas", JSON.stringify(favoritos));
}
//---------------------------------//
//--|actualizar_contador_y_icono|--//
//---------------------------------//
function actualizar_contador() {
    total_favoritos.textContent = favoritos.length;
}
function actualizar_icono(boton, activo) {
    const icono = boton.querySelector("i");
    if (activo) {
        boton.classList.add("activo");
        icono.classList.remove("fa-regular");
        icono.classList.add("fa-solid");
    } else {
        boton.classList.remove("activo");
        icono.classList.remove("fa-solid");
        icono.classList.add("fa-regular");
    }
}
//----------------------//
//--|cargar_favoritos|--//
//----------------------//
function cargar_favoritos() {
    tarjetas.forEach(
        function(tarjeta) {
            const id = tarjeta.dataset.id;
            const boton = tarjeta.querySelector(".boton_favorito");
            const activo = favoritos.includes(id);
            actualizar_icono(boton, activo);
        }
    );
    actualizar_contador();
}
//----------------------//
//--|evento_favoritos|--//
//----------------------//
botones_favorito.forEach(
    function(boton) {
        boton.addEventListener(
            "click",
            function() {
                const tarjeta = boton.closest(".tarjeta_antiguedad");
                const id = tarjeta.dataset.id;
                const posicion = favoritos.indexOf(id);
                if (posicion === -1) {
                    favoritos.push(id);
                    actualizar_icono(boton, true);
                } else {
                    favoritos.splice(posicion, 1);
                    actualizar_icono(boton, false);
                }
                guardar_favoritos();
                actualizar_contador();
            }
        );
    }
);
//----------------------//
//--|mostrar_detalles|--//
//----------------------//
botones_detalles.forEach(
    function(boton) {
        boton.addEventListener(
            "click",
            function() {
                const tarjeta = boton.closest(".tarjeta_antiguedad");
                const detalles = tarjeta.querySelector(".detalles_antiguedad");
                const visible = detalles.classList.toggle("mostrar");
                if (visible) {
                    boton.innerHTML = `
                        <i class="fa-solid fa-chevron-up"></i>
                        Ocultar detalles
                    `;
                } else {
                    boton.innerHTML = `
                        <i class="fa-solid fa-circle-info"></i>
                        Ver detalles
                    `;
                }
            }
        );
    }
);
//-------------------------------------//
//--|filtrar_epocas_por_localstorage|--//
//-------------------------------------//
filtro_epoca.addEventListener(
    "change",
    function() {
        const seleccion = filtro_epoca.value;
        let visibles = 0;
        tarjetas.forEach(
            function(tarjeta) {
                const epoca = tarjeta.dataset.epoca;
                if (seleccion === "todos" || seleccion === epoca) {
                    tarjeta.style.display = "block";
                    visibles++;
                } else {
                    tarjeta.style.display = "none";
                }
            }
        );
        if (visibles === 0) {
            mensaje_filtro.style.display = "block";
        } else {
            mensaje_filtro.style.display = "none";
        }
        localStorage.setItem("antiguedades_filtro", seleccion);
    }
);
//------------------------------------------//
//--|recuperar_filtro_usando_localstorage|--//
//------------------------------------------//
function recuperar_filtro() {
    const filtro_guardado = localStorage.getItem("antiguedades_filtro");
    if (filtro_guardado) {
        filtro_epoca.value = filtro_guardado;
        filtro_epoca.dispatchEvent(new Event("change"));
    }
}
cargar_favoritos();
recuperar_filtro();