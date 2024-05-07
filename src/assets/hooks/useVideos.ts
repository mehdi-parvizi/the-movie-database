import axios from "axios";

// const videoInfo = axios.create({
//   method: "GET",
//   baseURL: "https://www.googleapis.com/youtube/v3/",
//   headers: {
//     Authorization: "Bearer AIzaSyDM9iEsoUMYnCUSvlvNQrpAp2miPpGQdzw",
//   },
//   params: {
//     part: "id",
//     id: "PLl99DlL6b4",
//   },
// });

// const useVideos = () => {
//   videoInfo.get("/videos").then((res) => res.data);
// };

interface VideoDetails {
  key: string;
  published_at: string;
  id: string;
}

const useVideos = () => {
  const apiKey = import.meta.env.VITE_API_KEY_YOUTUBE;
  const videoId = "PLl99DlL6b4";
  return axios
    .get<VideoDetails>(
      `https://www.googleapis.com/youtube/v3/videos?part=player&id=${videoId}&key=${apiKey}`
    )
    .then((res) => res.data);
};

export default useVideos;
