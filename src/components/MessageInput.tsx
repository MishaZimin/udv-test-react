import { useState } from 'react';
import { ButtonIcon } from '@/ui/Buttons/ButtonIcon';
import { useChatStore } from '@/store/chatStore';

export const MessageInput = () => {
  const [text, setText] = useState('');
  const addMessage = useChatStore((state) => state.addMessage);

  const sendMessage = () => {
    if (!text.trim()) return;
    addMessage(text, true);
    setText('');
  };

  return (
    <div className="flex  border border-graphite/8 px-2 rounded-xl items-center">
      <input
        className="w-full px-3 pt-2 pb-2.5 rounded-lg focus:outline-none h-[48px]"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <ButtonIcon iconName="Delete" onClick={sendMessage} />
    </div>
  );
};
