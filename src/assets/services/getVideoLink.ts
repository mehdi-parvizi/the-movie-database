const getVideoLink = (endpoint: string) => {
  const baseUrl = "https://www.youtube.com/embed/";
  return `${baseUrl}${endpoint}`;
};
export default getVideoLink;
