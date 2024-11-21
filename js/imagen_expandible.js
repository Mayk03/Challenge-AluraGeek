document.addEventListener('DOMContentLoaded', () => {
    const contenedorProducto = document.querySelector('[data-producto]');
    const fondoOscuro = document.querySelector('.fondo-oscuro');

    const toggleImagenExpandida = (imagen) => {
        setTimeout(() => {
            imagen.classList.toggle('expandida');
            fondoOscuro.classList.toggle('activo');
        }, 0);
    };

    const cerrarImagenExpandida = () => {
        const imagenExpandida = document.querySelector('.imagen-expandible.expandida');
        if (imagenExpandida) {
            imagenExpandida.classList.remove('expandida');
        }
        fondoOscuro.classList.remove('activo');
    };

    contenedorProducto.addEventListener('click', (event) => {
        const imagen = event.target.closest('.imagen-expandible');

        if (imagen) {
            toggleImagenExpandida(imagen);
        } else if (event.target === fondoOscuro) {
            cerrarImagenExpandida();
        }
    });
});