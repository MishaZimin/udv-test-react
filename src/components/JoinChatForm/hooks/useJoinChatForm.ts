import { useState } from 'react';

type FormData = {
  name: string;
  room: string;
};

type FormErrors = {
  name: string;
  room: string;
};

export function useJoinChatForm(onJoin: (name: string, room: string) => void) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    room: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    room: '',
  });

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = { name: '', room: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Введите имя';
      isValid = false;
    }

    if (!formData.room.trim()) {
      newErrors.room = 'Введите название комнаты';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onJoin(formData.name, formData.room);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
}
