"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  infiniteScrollCode,
  infiniteScrollControllerCode,
  useInfiniteScrollPaginationCode,
} from "./component-string";

const Code = () => {
  console.log(infiniteScrollCode);
  return (
    <div className="text-black">
      <h2 className="text-2xl bg-gray-200">
        /src/infinite-scroll/lib/infinite-scroll.controller.ts
      </h2>
      <SyntaxHighlighter language="jsx" style={oneDark}>
        {infiniteScrollControllerCode}
      </SyntaxHighlighter>

      <h2 className="text-2xl bg-gray-200">
        /src/infinite-scroll/lib/infinite-scroll.controller.ts
      </h2>
      <SyntaxHighlighter language="jsx" style={oneDark}>
        {useInfiniteScrollPaginationCode}
      </SyntaxHighlighter>

      <SyntaxHighlighter language="jsx" style={oneDark}>
        {infiniteScrollCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
