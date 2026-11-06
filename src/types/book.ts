export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
}

export interface RecommendedBook extends Book {
  recommend: boolean;
}

export interface RecommendedBooksResponse {
  results: RecommendedBook[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface BookProgress {
  startPage: number;
  startReading: string;
  finishPage: number;
  finishReading: string;
  speed: number;
  status: string;
}

export interface TimeLeftToRead {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface BookDetails extends Book {
  status: ReadingStatus;
  owner: string;
  progress: BookProgress[];
  timeLeftToRead?: TimeLeftToRead;
}

export interface UserBook extends Book {
  status: ReadingStatus;
  owner: string;
  progress: BookProgress[];
}

export interface AddBookRequest {
  title: string;
  author: string;
  totalPages: number;
}

export interface RecommendedBooksParams {
  title?: string;
  author?: string;
  page?: number;
  limit?: number;
}

export type ReadingStatus = "unread" | "in-progress" | "done";

export interface DeleteBookResponse {
  message: string;
  id: string;
}
