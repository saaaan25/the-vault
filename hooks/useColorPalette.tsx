import { useEffect } from 'react';

export const selectedUserPalette=(palette:string | null)=> {
  useColorPalette(palette);
}

export const useColorPalette = (palette: string | null) => {
  useEffect(() => {
    const root = document.documentElement;
    switch (palette) {
      case 'bg-palette1-custom-color': case null:
        root.style.setProperty('--custom-color-6', '#FF9F9F');
        root.style.setProperty('--custom-color-2', '#F3E6DE');
        root.style.setProperty('--custom-color-4', '#F6DCDE');
        root.style.setProperty('--custom-color-3', '#EFCED0');
        root.style.setProperty('--custom-color-5', '#DDACAF');
        root.style.setProperty('--custom-color', '#F0B2B7');
        root.style.setProperty('--modal-background', "url('/images/modalbg-pink.png')");
        break;
      case 'bg-palette2-custom-color':
        root.style.setProperty('--custom-color-6', '#FFC368');
        root.style.setProperty('--custom-color-2', '#FFE0B0');
        root.style.setProperty('--custom-color-4', '#F6D7A9');
        root.style.setProperty('--custom-color-3', '#F4C98B');
        root.style.setProperty('--custom-color-5', '#EDB769');
        root.style.setProperty('--custom-color', '#FFB648');
        root.style.setProperty('--modal-background', "url('/images/modalbg-orange.png')");
        break;
      case 'bg-palette3-custom-color':
        root.style.setProperty('--custom-color-6', '#6C80C8');
        root.style.setProperty('--custom-color-2', '#DFE2ED');
        root.style.setProperty('--custom-color-4', '#CDD0DF');
        root.style.setProperty('--custom-color-3', '#BBC3E1');
        root.style.setProperty('--custom-color-5', '#929DC6');
        root.style.setProperty('--custom-color', '#6576B6');
        root.style.setProperty('--modal-background', "url('/images/modalbg-blue.png')");
        break;
    }
    
  }, [palette]);
};

export default useColorPalette;
