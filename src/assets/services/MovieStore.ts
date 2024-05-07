import { create } from "zustand";
import Genre from "../entities/Genre";

interface ReqQueryStore {
  searchText: string;
  mediaId: number;
  selectedTitle: string | null;
  selectedType: string | null;
  selectedGenre: Genre | null;
  selectedGenreName: string | null;
  personName: string | null;
  isDrawerOpen: boolean;
  showSearchbar: boolean;
  setShowSearchbar: (stat: boolean) => void;
  setIsDrawerOpen: (stat: boolean) => void;
  setPersonName: (name: string | null) => void;
  setSelectedTitle: (title: string | null) => void;
  setSearchText: (text: string) => void;
  setMediaId: (id: number) => void;
  setSelectedGenre: (genre: Genre | null) => void;
  setSelectedType: (type: string | null) => void;
}

const useMovieStore = create<ReqQueryStore>((set) => ({
  searchText: "",
  mediaId: -1,
  selectedTitle: null,
  selectedType: window.localStorage.getItem("type") || "movie",
  personName: null,
  selectedGenre: null,
  selectedGenreName: null,
  isDrawerOpen: false,
  showSearchbar: false,
  setShowSearchbar: (stat) => set(() => ({ showSearchbar: stat })),
  setIsDrawerOpen: (stat) => set(() => ({ isDrawerOpen: stat })),
  setSelectedGenre: (genre) => set(() => ({ selectedGenre: genre })),
  setPersonName: (name) => set(() => ({ personName: name })),
  setSelectedTitle: (title) => set(() => ({ selectedTitle: title })),
  setSearchText: (text) => set(() => ({ searchText: text })),
  setMediaId: (id) => set(() => ({ mediaId: id })),
  setSelectedType: (type) => set(() => ({ selectedType: type })),
}));
export default useMovieStore;
