"use client";

import { logger } from "@/07.shared/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";

const useValidateHash = () => {
  const params = useSearchParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const validateHash = async () => {
      const payload = {} as any;

      try {
        window.Telegram.WebApp.ready();
        const tgHash = window.Telegram.WebApp.initData;
        const isPremium = window.Telegram.WebApp.initDataUnsafe.user.is_premium;
        const referral = params.get("referral");
        payload.hash = tgHash;
        console.log("tgHash", tgHash);
        payload.isPremium = !!isPremium;

        if (referral) {
          payload.referral = referral;
        }
      } catch (error) {
        logger("Hash validate error", error);
      }
    };

    validateHash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // return isSuccess;
};

export default useValidateHash;
