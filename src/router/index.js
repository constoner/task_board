import createRouter from "router5";
import browserPluginFactory from "router5-plugin-browser";

export const ROUTEPAGES = {
  boards: "boards",
  cards: "cards",
};

const routes = [
  { name: ROUTEPAGES.boards, path: "/task_board" },
  { name: ROUTEPAGES.cards, path: "/task_board/board_:boardID" },
];

export const initialize = () => {
  const router = createRouter(routes, { defaultRoute: ROUTEPAGES.boards });

  router.usePlugin(browserPluginFactory());

  router.start();
  return router;
};

