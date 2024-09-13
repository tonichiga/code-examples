import React from "react";
import UI from "./infinite-scroll"; // Импортируйте ваш компонент
import { LayerProvider } from "@/app/providers";

export default {
  title: "Infinite Scroll", // Заголовок в Storybook
  component: UI,
  //   decorators: [(Story) => <Story />],
};

const Template = (args) => (
  <LayerProvider>
    <UI {...args} />{" "}
  </LayerProvider>
);

export const Default = Template.bind({});
Default.args = {
  // Здесь можно передавать пропсы компоненту
};
