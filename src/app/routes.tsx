import { createBrowserRouter } from 'react-router-dom';

import { Home } from '../pages/JoinChatPage';
import { ChatRoom } from '../pages/ChatRoomPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chat/:roomId',
    element: <ChatRoom />,
  },
]);
