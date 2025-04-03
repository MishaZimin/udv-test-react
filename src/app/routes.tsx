import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Spiner } from '@/shared/ui/Spiner/Spiner';

const JoinChatPage = lazy(
  () => import('../pages/JoinChatPage/ui/JoinChatPage'),
);
const ChatRoomPage = lazy(
  () => import('../pages/ChatRoomPage/ui/ChatRoomPage'),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <JoinChatPage />,
  },
  {
    path: '/chat/:roomId',
    element: (
      <Suspense fallback={<Spiner />}>
        <ChatRoomPage />
      </Suspense>
    ),
  },
]);
