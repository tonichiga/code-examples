import { JSONPlaceholderPost } from "@/07.shared/types";
import useInfiniteScrollQuery from "../hooks/useInfiniteScrollPagination";
import { infiniteScrollQueryApi } from "../api/inifinity-scroll.api";

const UI = () => {
  const { data: posts, observeElement } =
    useInfiniteScrollQuery<JSONPlaceholderPost>({
      queryFn: infiniteScrollQueryApi.endpoints.getPosts.initiate,
      options: {
        limit: 25,
      },
    });

  return (
    <ul className="flex flex-col gap-2 text-gray-800 p-4">
      {posts?.data.map((el) => (
        <li key={el.id}>{el.title}</li>
      ))}
      <li ref={observeElement}></li>
    </ul>
  );
};

export default UI;
