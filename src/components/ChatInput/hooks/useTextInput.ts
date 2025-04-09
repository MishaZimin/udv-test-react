import { useState } from 'react';

export const useTextInput = (initialValue = '') => {
  const [text, setText] = useState(initialValue);

  return {
    value: text,
    onChange: setText,
    clear: () => setText(''),
    append: (newText: string) => setText((prev) => prev + newText),
  };
};
