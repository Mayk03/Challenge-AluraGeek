import { createCard } from "./mostrar-producto.js";
import { obtenerProductos } from "./conexionAPI.js";

// pestaña desplegable.
document.getElementById('toggleBusqueda').addEventListener('click', () => {
    const busquedaSeccion = document.getElementById('busquedaSeccion');
    const toggleBoton = document.getElementById('toggleBusqueda');
    
    busquedaSeccion.classList.toggle('active');
    toggleBoton.classList.toggle('active');
});

// Mostrar productos en el contenedor
const mostrarProductos = (productos) => {
    const contenedor = document.querySelector('[data-producto]');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const tarjeta = createCard(producto);
        contenedor.appendChild(tarjeta);
    });
};

// Función para manejar la búsqueda de productos
const manejarBusqueda = async (evento) => {
    evento.preventDefault();
    
    const busquedaInput = document.getElementById('barraBusqueda');
    const busqueda = busquedaInput.value.trim();
    
    if (busqueda) {
        const productosEncontrados = await obtenerProductos.buscarProductos(busqueda);
        if (productosEncontrados && productosEncontrados.length > 0) {
            mostrarProductos(productosEncontrados);
        } else {
            alert(' ⚠️ No se encontraron productos.');
        }
    } else {
        const todosLosProductos = await obtenerProductos.listaProductos();
        mostrarProductos(todosLosProductos);
    }
};

// Función para limpiar la búsqueda
const manejarLimpiar = () => {
    const busquedaInput = document.getElementById('barraBusqueda');
    busquedaInput.value = '';
    obtenerProductos.listaProductos().then(mostrarProductos);
};
const buscarBtn = document.getElementById('botonEnviar');
buscarBtn.addEventListener('click', manejarBusqueda);

const limpiarBtn = document.getElementById('botonLimpiar');
limpiarBtn.addEventListener('click', manejarLimpiar);

const busquedaInput = document.getElementById('barraBusqueda');
busquedaInput.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        manejarBusqueda(evento);
    }
});