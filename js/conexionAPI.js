const urlApi = 'https://673e96f7a9bc276ec4b4ecfd.mockapi.io/productos';

const listaProductos = async () => {
    try {
        const respuesta = await fetch(urlApi);
        const datos = await respuesta.json();
        return datos;
        
    } catch (error) {
        console.log('Error en la conexión con la lista de productos', error);
    }
}

const agregarProductos = async (nombre, precio, imagen) => {
    try {
        const respuesta = await fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nombre, precio, imagen})
        });
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.log('Error al agregar el producto', error);
    }
}

const buscarProductos = async (busqueda) => {
    try {
        const respuesta = await fetch(`${urlApi}?nombre=${busqueda}`);
        if (!respuesta.ok) {
            throw new Error(`Error al obtener los productos: ${respuesta.status}`);
        }
        const productos = await respuesta.json();
        return productos;
    } catch (error) {
        console.error('Error al buscar el producto:', error);
    }
};

export const obtenerProductos = {
    listaProductos,
    agregarProductos,
    buscarProductos,
};