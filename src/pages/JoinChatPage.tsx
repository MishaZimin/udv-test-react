import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/shared/ui/Inputs/Input';
import { Button } from '@/shared/ui/Buttons/Button';
import Logo from '@/shared/assets/svgs/Logo.svg';

export const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    room: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    room: '',
  });

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', room: '' };

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

  const handleJoin = () => {
    if (validateForm()) {
      const roomId = formData.room.toLowerCase().replace(/\s+/g, '-');
      sessionStorage.setItem('currentUser', formData.name);
      navigate(`/chat/${roomId}`);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="mx-auto my-auto flex w-full flex-col justify-between gap-[40px] rounded-[16px] bg-none px-[40px] py-[48px] sm:w-[400px] sm:bg-base">
        <img src={Logo} className="w-[160px]" alt="udv logo" />
        <div className="flex flex-col gap-3">
          <Input
            variant={errors.name ? 'error' : 'default'}
            value={formData.name}
            onChange={handleChange('name')}
            label="Имя"
            errorText={errors.name}
          />
          <Input
            variant={errors.room ? 'error' : 'default'}
            value={formData.room}
            onChange={handleChange('room')}
            label="Название комнаты"
            errorText={errors.room}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            text="Продолжить"
            textColor="light"
            buttonType="primary"
            onClick={handleJoin}
          />
        </div>
      </div>
    </div>
  );
};
