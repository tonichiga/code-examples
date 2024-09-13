const svgMaker = (name: string, classname?: string) => {
  return (
    <svg className={classname} xmlnsXlink="http://www.w3.org/1999/xlink">
      <use
        href={`/images/sprite.svg#${name}`}
        // xlink:href={`/images/sprite.svg#${name}`}
        // xlinkHref={`/images/sprite.svg#${name}`}
      ></use>
    </svg>
  );
};

export default svgMaker;
