"use client"

import React, { useState } from 'react';
import Input from './Input';
import Modal from './Modal';
import { useUser } from '@/hooks/useUser';

interface NameModalProps {
  isOpen: boolean;
  onNameChange?: (newName: string) => void;
  onClose: () => void;
}

const NameModal: React.FC<NameModalProps> = ({ isOpen, onClose, onNameChange }) => {
  const { setName } = useUser();
  const [name, setNameInput] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  const handleNameSubmit = async () => {
    if (name.trim() !== '') {
      await setName(name);
      if (onNameChange) {
        onNameChange(name);
      }
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      title="Cambiar nombre"
      description=""
    >
      <div className="flex flex-col items-center">
        <Input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Ingrese nuevo nombre"
          className="mb-5 w-3/4 text-center"
        />
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
          onClick={handleNameSubmit}
        >
          Aceptar
        </button>
      </div>
    </Modal>
  );
};

export default NameModal;