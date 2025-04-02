import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const JoinChatPage = lazy(
  () => import('../pages/JoinChatPage/ui/JoinChatPage'),
);
const ChatRoomPage = lazy(
  () => import('../pages/ChatRoomPage/ui/ChatRoomPage'),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<></>}>
        <JoinChatPage />
      </Suspense>
    ),
  },
  {
    path: '/chat/:roomId',
    element: (
      <Suspense fallback={<></>}>
        <ChatRoomPage />
      </Suspense>
    ),
  },
]);
