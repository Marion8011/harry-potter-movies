export interface MovieForList {
  id: string;
  title: string;
  duration: number;
  budget: string;
  release_date: string;
}

export interface Movie extends MovieForList {
  box_office: string;
  cinematographers: string[];
  poster: string;
  producers: string[];
  summary: string;
}
