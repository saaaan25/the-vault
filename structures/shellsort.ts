import { Playlist } from "@/types";

export function shellsort(arr: Playlist[]): Playlist[] {
    const n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;

            while (j >= gap && arr[j - gap].name.localeCompare(temp.name) > 0) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            arr[j] = temp;
        }

        gap = Math.floor(gap / 2);
    }

    return arr;
}