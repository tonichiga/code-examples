import { useEffect, useRef, useState } from "react";
import { ResponseDataWithPagination } from "../types";
import { useAppDispatch } from "@/07.shared/lib/hooks";
import InfinityScrollController from "../lib/infinite-scroll.controller";

/*
 * useInfiniteScrollQuery is a custom hook that handles infinite scroll pagination.
 * It accepts a query function and options as parameters.
 * The observeElement is the element that will be observed for intersection.
 * When the observeElement is intersected, callback in observe has been called.
 * Callback must return a promise that resolves to a ResponseDataWithPagination.
 */

const useInfiniteScrollQuery = <T>({ queryFn, options = {} }) => {
  const [data, setData] = useState<ResponseDataWithPagination<T>>(null);
  const observeElement = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const infinityScrollController = new InfinityScrollController(
      queryFn,
      observeElement.current,
      options
    );

    infinityScrollController.observe(async (queryFn) => {
      const { data, payload } = await dispatch(queryFn);
      const d = data || payload || { data: [] };

      setData((prev) => ({
        ...prev,
        ...d,
        data: [...(prev?.data || []), ...d?.data],
      }));

      return d;
    });

    return () => {
      infinityScrollController.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, observeElement };
};

export default useInfiniteScrollQuery;
