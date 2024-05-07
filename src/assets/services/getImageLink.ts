const getImageLink = (url: string) => {
  const baseImageUrl = `https://image.tmdb.org/t/p/original`;
  return `${baseImageUrl}${url}`;
};
export default getImageLink;
