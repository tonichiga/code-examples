import { Overlay } from "../lib";
import { Telegram } from "./telegram";

declare global {
  interface Window {
    Telegram: Telegram;
    ipApi: IpApi | null;
    overlay: Overlay;
  }

  namespace NodeJS {
    interface ProcessEnv {
      /** Authorization token for the bot. This is used to validate the hash's authenticity. */
      BOT_TOKEN: string;
    }
  }
}

export type PitstopDataType = {
  days: number;
  coins: number;
  rewards: {
    title: string;
    reward: number;
    disabled?: boolean;
    id: number;
  }[];
};

export type AnimationDurationVariables =
  | "--animation-road"
  | "--animation-trees"
  | "--animation-sky"
  | "--animation-speed-particles"
  | "--animation-fence";

export type TDropdownData = {
  id: string;
  value: string;
};

export type GarageCategoryDataType = {
  id: number;
  title: string;
  description: string;
  profitAmount: number;
  lvl: string;
  price: number;
  image: string;
  rare?: boolean;
  disabled?: boolean;
};

export type GarageDataType = {
  [key: string]: GarageCategoryDataType[];
};
