import { api } from "./api";

import type {
  AddBookRequest,
  BookDetails,
  RecommendedBooksParams,
  RecommendedBooksResponse,
  UserBook,
  ReadingStatus,
  DeleteBookResponse,
  ReadingRequest,
  DeleteReadingParams,
} from "../types/book";

export const getRecommendedBooks = async (
  params: RecommendedBooksParams = {},
): Promise<RecommendedBooksResponse> => {
  const { data } = await api.get<RecommendedBooksResponse>("/books/recommend", {
    params,
  });

  return data;
};

export const getBookById = async (id: string): Promise<BookDetails> => {
  const { data } = await api.get<BookDetails>(`/books/${id}`);

  return data;
};

export const addRecommendedBook = async (id: string): Promise<UserBook> => {
  const { data } = await api.post<UserBook>(`/books/add/${id}`);

  return data;
};

export const addBookToLibrary = async (
  book: AddBookRequest,
): Promise<UserBook> => {
  const { data } = await api.post<UserBook>("/books/add", book);

  return data;
};

export const getOwnBooks = async (
  status?: ReadingStatus,
): Promise<UserBook[]> => {
  const { data } = await api.get<UserBook[]>("/books/own", {
    params: status ? { status } : {},
  });

  return data;
};

export const deleteBook = async (id: string): Promise<DeleteBookResponse> => {
  const { data } = await api.delete<DeleteBookResponse>(`/books/remove/${id}`);

  return data;
};

export const startReading = async (
  readingData: ReadingRequest,
): Promise<BookDetails> => {
  const { data } = await api.post<BookDetails>(
    "/books/reading/start",
    readingData,
  );

  return data;
};

export const finishReading = async (
  readingData: ReadingRequest,
): Promise<BookDetails> => {
  const { data } = await api.post<BookDetails>(
    "/books/reading/finish",
    readingData,
  );

  return data;
};

export const deleteReading = async ({
  bookId,
  readingId,
}: DeleteReadingParams): Promise<BookDetails> => {
  const { data } = await api.delete<BookDetails>("/books/reading", {
    params: { bookId, readingId },
  });

  return data;
};
