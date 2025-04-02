import { Input } from '@/shared/ui/Inputs/Input';
import { Button } from '@/shared/ui/Buttons/Button';
import Logo from '@/shared/assets/Logo.svg';
import { useJoinChatForm } from '../hooks/useJoinChatForm';

type AuthFormProps = {
  onJoin: (name: string, room: string) => void;
};

export const JoinChatForm = ({ onJoin }: AuthFormProps) => {
  const { formData, errors, handleChange, handleSubmit } =
    useJoinChatForm(onJoin);

  return (
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
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
