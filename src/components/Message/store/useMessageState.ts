import { atom, useAtom } from 'jotai';

type MenuState = {
  isOpen: boolean;
  position: { x: number; y: number };
  senderName: string | null;
  messageText: string | null;
  messageId: string | null;
};

const messageMenuStateAtom = atom<MenuState>({
  isOpen: false,
  position: { x: 0, y: 0 },
  senderName: null,
  messageText: null,
  messageId: null,
});

export const useMessageState = () => {
  const [state, setState] = useAtom(messageMenuStateAtom);

  return {
    isContextActive: state.isOpen,
    menuPosition: state.position,
    senderName: state.senderName,
    messageText: state.messageText,
    messageId: state.messageId,
    openMenu: (
      position: { x: number; y: number },
      senderName: string,
      messageText: string,
      messageId: string,
    ) => {
      setState({
        ...state,
        isOpen: true,
        position,
        senderName,
        messageText,
        messageId,
      });
    },
    closeMenu: () => setState((prev) => ({ ...prev, isOpen: false })),
    setReplyingMessageInfo: (
      name: string | null,
      text: string | null,
      id: string | null,
    ) => {
      setState((prev) => ({
        ...prev,
        senderName: name,
        messageText: text,
        messageId: id,
      }));
    },
  };
};
