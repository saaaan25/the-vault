import { Playlist } from "@/types"

 export function ordenarPorTitulo(arr: Playlist[]): Playlist[] {
    return arr.sort((a, b) => a.name.localeCompare(b.name))
}

export function busquedaBinaria(arr: Playlist[], palabra: string): number | null {
    let izquierda = 0;
    let derecha = arr.length - 1;

    while (izquierda <= derecha) {
        const medio = Math.floor((izquierda + derecha) / 2);
        const comparacion = arr[medio].name.localeCompare(palabra);

        if (comparacion === 0) {
            return arr[medio].id; // Palabra encontrada, devuelve el id
        } else if (comparacion < 0) {
            izquierda = medio + 1; // Buscar en la mitad derecha
        } else {
            derecha = medio - 1; // Buscar en la mitad izquierda
        }
    }

    return null; // Palabra no encontrada
}

/*
// Ejemplo de uso:
const playlists: Playlist[] = [
    { name: "Banana" },
    { name: "Apple" },
    { name: "Date" },
    { name: "Fig" },
    { name: "Cherry" },
    { name: "Grape" }
];

const palabraABuscar = "Cherry";

// Ordenar el arreglo
const playlistsOrdenadas = ordenarPorTitulo(playlists);

// Realizar la búsqueda binaria
const indice = busquedaBinaria(playlistsOrdenadas, palabraABuscar);

if (indice !== null) {
    console.log(`Palabra encontrada en el índice: ${indice}`);
} else {
    console.log("Palabra no encontrada");
}
*/