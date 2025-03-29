import { ButtonIcon } from "@/ui/Buttons/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { MessageInput } from "@/components/MessageInput";
import { Message } from "@/components/Message";
import { useChatStore } from "@/store/chatStore";

export const ChatRoom = () => {
  const navigate = useNavigate();
  const messages = useChatStore((state) => state.messages);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-[724px] flex flex-col h-full border border-graphite/8 rounded-2xl my-8 overflow-hidden">
        <div className="p-4 border-b border-graphite/8">
          <ButtonIcon iconName="Back" onClick={() => navigate(-1)} />
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2 pt-4 pb-12">
          {messages.map((msg) => (
            <Message
              key={msg.id}
              text={msg.text}
              time={msg.time}
              isMine={msg.isMine}
              // isMine={Math.random() < 0.5}
            />
          ))}
        </div>

        <div className="mx-4 pb-4">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};
