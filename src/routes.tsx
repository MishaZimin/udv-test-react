// import { createBrowserRouter } from "react-router-dom";

// import {Home} from "./pages/Home";
// import Chat
// // import { AuthGuard } from './components/AuthGuard';

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/chat",
//     element: <Chat />,
//   },
// ]);
import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { ChatRoom } from "./pages/ChatRoom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <ChatRoom />,
  },
]);
