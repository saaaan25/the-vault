import { Playlist } from "@/types"

export function busquedaBinaria(arr: Playlist[], palabra: string): number | null {
    let izquierda = 0;
    let derecha = arr.length - 1;

    while (izquierda <= derecha) {
        const medio = Math.floor((izquierda + derecha) / 2);
        const comparacion = arr[medio].name.localeCompare(palabra);

        if (comparacion === 0) {
            return arr[medio].id; 
        } else if (comparacion < 0) {
            izquierda = medio + 1; 
        } else {
            derecha = medio - 1; 
        }
    }

    return null; 
}