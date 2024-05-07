import Media from "./Media";

export default interface Person {
  original_name: string;
  media_type: "person";
  known_for_department: string;
  id: number;
  profile_path: string;
  known_for: Media[];
}
