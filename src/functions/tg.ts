import { Telegram } from "@twa-dev/types";

declare global {
  interface Window {
    Telegram: Telegram;
  }
}

const tg = window.Telegram.WebApp;

export const useTgProcessing = () => {
  tg.expand()
  tg.enableClosingConfirmation();
  tg.BackButton.offClick(() => {});
  tg.BackButton.hide();
  tg.MainButton.offClick(() => {});
};
export default tg;
