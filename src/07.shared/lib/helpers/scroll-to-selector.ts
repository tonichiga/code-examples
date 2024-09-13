interface ScrollTo {
  selector?: string;
  element?: HTMLElement;
}

export const scrollTo = ({ selector, element }: ScrollTo) => {
  let e = element;

  if (!e) {
    e = document.querySelector(selector);
  }
  e?.scrollTo(0, 0);
};

export default scrollTo;
