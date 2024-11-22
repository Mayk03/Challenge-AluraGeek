import { obtenerProductos } from "./conexionAPI.js";

const contenedorProducto = document.querySelector('[data-producto]');
const agregarProducto = document.querySelector('[data-agregar]');

// Función para crear una tarjeta de producto
export function createCard({ id, nombre, precio, imagen }) {
    const card = document.createElement('div');
    card.classList.add('card_container');
    card.innerHTML = `
        <div class="card_image">
            <img src="${imagen}" alt="${nombre}" class="imagen-expandible">
        </div>
        <div class="card_info">
            <p class="nombre">${nombre}</p>
            <p class="precio">$${precio},00</p>
            <button class="boton_delate" data-id="${id}">
                <img src="/img/borrar(1).png" alt="Eliminar producto">
                <span class="tooltip">Eliminar</span>
            </button>
        </div>
    `;
    const botonEliminar = card.querySelector('.boton_delate');
    botonEliminar.addEventListener('click', () => eliminarProducto(id, card));
    return card;
}

// Función para mostrar los productos
const mostrarProducto = async () => {
    try {
        const productos = await obtenerProductos.listaProductos();
        productos.forEach(producto => {
            const cardContainer = createCard(producto);
            contenedorProducto.appendChild(cardContainer);
        });

    } catch (error) {
        console.log(error);
        contenedorProducto.innerHTML = "<h2 class='mensaje-error'> ⚠️ No se pudieron cargar los productos</h2>";
    }
};

// agregar un producto
agregarProducto.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    
    let nombre = document.querySelector("[data-nombre]").value;
    let precio = document.querySelector("[data-precio]").value;
    let imagen = document.querySelector("[data-imagen]").value;
    
    nombre = capitalizarPalabras(nombre);

    if (!/^(\d+(\.\d{1,2})?)?$/.test(precio)) {
        alert("⚠️ El precio debe contener solo numeros.");
        return; 
    }

    if (imagen.endsWith("dl=0")) {
        imagen = imagen.replace("dl=0", "raw=1");
    }
    const regexImagen = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}\/.*\.(jpg|jpeg|png|gif|bmp|webp)(\?[^#]*)?$/i;
    if (!regexImagen.test(imagen)) {
        alert("⚠️ La URL de la imagen no es válida. Debe ser una URL válida de imagen (ej. .jpg, .png, .gif).");
        return;
    }
    
    try {
        const nuevoProducto = await obtenerProductos.agregarProductos(nombre, precio, imagen);
        const nuevaTarjeta = createCard(nuevoProducto);
        contenedorProducto.appendChild(nuevaTarjeta);

    } catch (error) {
        console.log(error);
    }
    agregarProducto.reset();
});

function capitalizarPalabras(texto) {
    return texto
        .toLowerCase()
        .split(" ")
        .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
        .join(" ");
}

// Función para eliminar el producto desde la API
const eliminarProducto = async (id, card) => {
    try {
        const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.');
        if (!confirmacion) {
            return;
        }
        const respuesta = await fetch(`https://673e96f7a9bc276ec4b4ecfd.mockapi.io/productos/${id}`, {
            method: 'DELETE',
        });
        if (!respuesta.ok) {
            throw new Error('Error al eliminar el producto');
        }
        card.remove();
        alert('Producto eliminado con éxito ✅');
    } catch (error) {
        alert('🚫 Error al eliminar el producto', error);
    }
};


mostrarProducto();