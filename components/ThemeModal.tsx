import React from 'react';
import useColorPalette from '../hooks/useColorPalette';
import { useUser } from "@/hooks/useUser";
import Modal from '../components/Modal';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useUser();
  useColorPalette(theme);

  const colors = [
    { baseColor: 'bg-palette1-custom-color', shades: ['bg-palette1-custom-color-2', 'bg-palette1-custom-color-3', 'bg-palette1-custom-color-4', 'bg-palette1-custom-color-5', 'bg-palette1-custom-color-6'] },
    { baseColor: 'bg-palette2-custom-color', shades: ['bg-palette2-custom-color-2', 'bg-palette2-custom-color-3', 'bg-palette2-custom-color-4', 'bg-palette2-custom-color-5', 'bg-palette2-custom-color-6'] },
    { baseColor: 'bg-palette3-custom-color', shades: ['bg-palette3-custom-color-2', 'bg-palette3-custom-color-3', 'bg-palette3-custom-color-4', 'bg-palette3-custom-color-5', 'bg-palette3-custom-color-6'] },
  ];

  const handleClickColor = (palette: string) => {
    setTheme(palette);
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      title="Personalizar Tema"
      description=''
    >
      <div>
        {colors.map((color, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <button
                className={`
                  border
                  border-black
                  ${color.baseColor}
                  text-white
                  font-bold
                  p-0
                  flex
                  items-center
                  justify-center
                  ml-6
                  w-12 h-12
                  focus:outline-none
                `}
                onClick={() => {
                  handleClickColor(color.baseColor);
                }}
              ></button>
              
              <div style={{ width: '30px' }}></div>
              
              <div className="flex mr-8">
                {color.shades.map((shade, idx) => (
                  <div
                    key={idx}
                    className={`
                      w-12 h-12
                      border
                      border-black
                      ${shade}
                    `}
                    style={{ marginRight: '5px' }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-auto">
          <button
            className={`
              bg-custom-color
              text-black
              py-1
              px-6
              rounded-lg
              inline-flex
              items-center
              focus:outline-none
            `}
            onClick={onClose}
          >
            Aceptar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ThemeModal;
