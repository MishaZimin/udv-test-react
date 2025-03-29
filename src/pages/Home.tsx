import { useState } from "react";
import { Input } from "@/ui/Inputs/Input";
import { Button } from "@/ui/Buttons/Button";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/svgs/Logo.svg";

export const Home = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    link: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    link: "",
  });

  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", link: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Введите имя";
      isValid = false;
    }

    if (!formData.link.trim()) {
      newErrors.link = "Введите ссылку";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(formData);
      navigate("/chat");
    }
  };

  const handleChat = () => {
    navigate("/chat");
  };

  return (
    <div className="flex h-screen">
      <div className="mx-auto my-auto flex w-full flex-col justify-between gap-[40px] rounded-[16px] bg-none px-[40px] py-[48px] sm:w-[400px] sm:bg-base">
        <img src={Logo} className="w-[160px]" alt="udv logo" />
        <div className="flex flex-col gap-3">
          <Input
            variant={errors.name ? "error" : "default"}
            value={formData.name}
            onChange={handleChange("name")}
            label="Имя"
            errorText={errors.name}
          />
          <Input
            variant={errors.link ? "error" : "default"}
            value={formData.link}
            onChange={handleChange("link")}
            label="Название комнаты"
            errorText={errors.link}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button
            text="Продолжить"
            textColor="light"
            buttonType="primary"
            onClick={handleSubmit}
          />

          <Button
            text="Создать чат"
            textColor="dark"
            buttonType="secondary"
            onClick={handleChat}
          />
        </div>
      </div>
    </div>
  );
};
