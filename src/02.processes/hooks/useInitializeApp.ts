import socket from "@/07.shared/api/socket";
import { useValidateHash } from "@/07.shared/lib/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const useInitializeApp = () => {
  // const { data: player } = useGetPlayerQuery();
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const isHashValid = useValidateHash();
  const t = useTranslations("game");

  useEffect(() => {
    const getAsyncData = async () => {
      // const ipApi = await serviceApi.getIp();
      // window.ipApi = ipApi;
      socket.connect();
      setIsAppLoaded(true);
    };

    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.setHeaderColor("#d21a07");
    window.Telegram.WebApp.setBackgroundColor("#1f1f1f");

    getAsyncData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAppLoaded, isHashValid };
};

export default useInitializeApp;
