async function clickeame() {
    // Función para generar un tensor de 10x10 con números del 1 al 9
    function generateTensor() {
        const data = [];
        for (let i = 1; i <= 10; i++) {
            const row = [];
            for (let j = 1; j <= 10; j++) {
                row.push(i % 9 + 1);
            }
            data.push(row);
        }
        return tf.tensor2d(data);
    }

    // Generar los dos tensores iniciales
    let tensor1 = generateTensor();
    let tensor2 = generateTensor();

    // Variable para almacenar el tamaño máximo permitido en bytes (3 KB)
    const maxSize = 10 * 1024;

    // Iterar mientras el tamaño del tensor resultante sea menor o igual al tamaño máximo permitido
    let iterations = 0;
    while (tf.memory().numBytes <= maxSize) {
        tensor1 = tensor1.mul(tensor2); // Multiplicar los tensores
        iterations++;

        // Si el número de iteraciones supera un cierto límite, salir del bucle
        if (iterations > 25000) {
            console.log("El tamaño máximo no pudo ser alcanzado después de 25000 iteraciones");
            break;
        }
    }

    // Imprimir el tensor en la consola
    console.log(tensor1.arraySync());
    console.log("Ejecutando app");

    // Liberar memoria de los tensores
    tensor1.dispose();
    tensor2.dispose();
}
