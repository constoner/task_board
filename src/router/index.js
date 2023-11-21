import createRouter from "router5";
import browserPluginFactory from "router5-plugin-browser";

export const ROUTEPAGES = {
  boards: "BOARDS",
  cards: "CARDS",
};

const routes = [
  { name: ROUTEPAGES.boards.toLowerCase(), path: "/task_board" },
  { name: ROUTEPAGES.cards.toLowerCase(), path: "/task_board/board" },
];

export const initialize = () => {
  const router = createRouter(routes);

  router.usePlugin(browserPluginFactory());

  router.start();
  return router;
};

