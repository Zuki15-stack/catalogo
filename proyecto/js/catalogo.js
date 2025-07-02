// ✅ Exportar tabla como Excel
function exportarTablaCeramica() {
    const tabla = document.getElementById("tablaCeramica");
    const datos = [];

    for (let i = 0; i < tabla.rows.length; i++) {
        let fila = [];
        for (let j = 0; j < tabla.rows[i].cells.length; j++) {
            fila.push(tabla.rows[i].cells[j].innerText.trim());
        }
        datos.push(fila);
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, "Cerámica");
    XLSX.writeFile(wb, "tabla_ceramica.xlsx");
}

// ✅ Recalcula los totales por fila
function actualizarTotales() {
    const filas = document.querySelectorAll("#tablaCeramica tbody tr");

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll("td");
        let suma = 0;
        for (let i = 2; i < celdas.length - 1; i++) {
            let valor = parseInt(celdas[i].innerText.trim());
            if (!isNaN(valor)) suma += valor;
        }
        celdas[celdas.length - 1].innerText = suma;
    });
}

// ✅ Guarda la tabla completa (estructura + contenido)
function guardarTablaEnLocalStorage() {
    const tabla = document.getElementById("tablaCeramica");
    localStorage.setItem("tablaCeramicaHTML", tabla.innerHTML);
}

// ✅ Restaura la tabla con toda su estructura
function cargarTablaDesdeLocalStorage() {
    const tabla = document.getElementById("tablaCeramica");
    const htmlGuardado = localStorage.getItem("tablaCeramicaHTML");
    if (htmlGuardado) {
        tabla.innerHTML = htmlGuardado;
    }
    conectarEventos();
    actualizarTotales();
}

// ✅ Reconecta eventos después de restaurar HTML
function conectarEventos() {
    const tabla = document.getElementById("tablaCeramica");
    tabla.addEventListener("input", () => {
        actualizarTotales();
        guardarTablaEnLocalStorage();
    });
}

// ✅ Agrega una nueva fila
function agregarFila() {
    const tabla = document.getElementById("tablaCeramica").getElementsByTagName("tbody")[0];
    const columnas = tabla.rows[0].cells.length;
    const nuevaFila = tabla.insertRow();

    for (let i = 0; i < columnas; i++) {
        const celda = nuevaFila.insertCell(i);
        celda.contentEditable = true;
        if (i === 0) {
            celda.innerText = "Nuevo Complejo";
        } else if (i === 1) {
            celda.innerText = "Nueva Variedad";
        } else {
            celda.innerText = "0";
        }
    }

    actualizarTotales();
    guardarTablaEnLocalStorage();
}


// ✅ Agrega una nueva columna
function agregarColumna() {
    const tabla = document.getElementById("tablaCeramica");
    const encabezado1 = tabla.rows[0];
    const encabezado2 = tabla.rows[1];

    const nuevaColumnaNombre = prompt("Nombre de la nueva excavación:", "EXC");
    if (!nuevaColumnaNombre) return;

    // Crear nuevo encabezado (segunda fila, subcategoría de Excavación)
    const nuevaTh = document.createElement("th");
    nuevaTh.contentEditable = true;
    nuevaTh.innerText = nuevaColumnaNombre;
    
    // Insertar ANTES de la última celda ("Total")
    encabezado2.insertBefore(nuevaTh, encabezado2.cells[encabezado2.cells.length - 1]);

    // Aumentar colspan de "Excavación"
    encabezado1.cells[2].colSpan += 1;

    // Insertar celda editable en cada fila del cuerpo antes del total
    const filasCuerpo = tabla.querySelectorAll("tbody tr");
    filasCuerpo.forEach(fila => {
        const nuevaCelda = document.createElement("td");
        nuevaCelda.contentEditable = true;
        nuevaCelda.innerText = "0";
        fila.insertBefore(nuevaCelda, fila.cells[fila.cells.length - 1]); // Antes del total
    });

    actualizarTotales();
    guardarTablaEnLocalStorage();
}


// ✅ Limpia completamente la tabla
function limpiarTabla() {
    if (!confirm("¿Estás seguro de que deseas borrar toda la tabla?")) return;
    localStorage.removeItem("tablaCeramicaHTML");

    const tabla = document.getElementById("tablaCeramica");
    tabla.innerHTML =

  '<thead>' +
    '<tr>' +
      '<th rowspan="2">Complejo</th>' + // NUEVO
      '<th rowspan="2">Tipo-Variedad</th>' +
      '<th colspan="3">Excavación</th>' +
      '<th rowspan="2">Total</th>' +
    '</tr>' +
    '<tr>' +
      '<th contenteditable>ALM</th>' +
      '<th contenteditable>ANA</th>' +
      '<th contenteditable>APA</th>' +
    '</tr>' +
  '</thead>' +
  '<tbody>' +
    '<tr>' +
      '<td contenteditable>Azteca I</td>' + // NUEVO
      '<td contenteditable>Huasteca Negro/Blanco</td>' +
      '<td contenteditable>0</td>' +
      '<td contenteditable>0</td>' +
      '<td contenteditable>0</td>' +
      '<td contenteditable>0</td>' +
    '</tr>' +
    '<tr>' +
      '<td contenteditable>Azteca I</td>' + // NUEVO
      '<td contenteditable>Azteca Naranja</td>' +
      '<td contenteditable>0</td>' +
      '<td contenteditable>0</td>' +
      '<td contenteditable>0</td>' +
      '<td contenteditable>0</td>' +
    '</tr>' +
  '</tbody>';


    conectarEventos();
    actualizarTotales();
}

// ✅ Al cargar el sitio
document.addEventListener("DOMContentLoaded", () => {
    cargarTablaDesdeLocalStorage();
});
