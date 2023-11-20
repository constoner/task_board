import createRouter from "router5";
import browserPluginFactory from "router5-plugin-browser";

export const ROUTEPAGES = {
  boards: "BOARDS",
  cards: "CARDS",
};

const routes = [
  { name: ROUTEPAGES.boards, path: "/task_board" },
  { name: ROUTEPAGES.cards, path: "/board" },
];

export const initialize = () => {
  const router = createRouter(routes);

  router.usePlugin(browserPluginFactory());

  router.start();
  return router;
};

