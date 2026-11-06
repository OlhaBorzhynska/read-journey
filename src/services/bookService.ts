import { api } from "./api";

import type {
  AddBookRequest,
  BookDetails,
  RecommendedBooksParams,
  RecommendedBooksResponse,
  UserBook,
  ReadingStatus,
  DeleteBookResponse,
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
