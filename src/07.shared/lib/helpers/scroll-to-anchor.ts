export const scrollToAnchor = (anchorName: string, offset = 0) => {
  if (anchorName) {
    // Знайти якорь
    const anchorElement = document.querySelector(`#${anchorName}`);
    // Якщо прив'язка, відповідна ідентифікатору, існує, перейти до прив'язки
    if (anchorElement) {
      const elementPosition = anchorElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }
};
