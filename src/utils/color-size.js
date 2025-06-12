export const colorsArray = (data) => {
  return Object.values(
    data?.variants
      ?.map((v) => v.attributes.color)
      .reduce((acc, obj) => {
        acc[obj.name] = obj;
        return acc;
      }, {}) || {}
  );
};

export const sizesArray = (data) => {
  return [...new Set(data?.variants?.map((v) => v.attributes.size.name))];
};

export const sizeArray = (variants) => {
  return variants
    ? [...new Set(variants.map((v) => v.attributes.size.name))]
    : [];
};

export const colorObjects = (variants) => {
  return variants
    ? Array.from(
        new Map(
          variants.map((v) => [
            v.attributes.color.swatch,
            {
              colorCode: v.attributes.color.swatch,
              colorName: v.attributes.color.name,
            },
          ])
        ).values()
      )
    : [];
};
