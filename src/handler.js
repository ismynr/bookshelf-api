const { nanoid } = require('nanoid');
const {
  storeModel,
  allModel,
  showModel,
  updateModel,
  destroyModel,
} = require('./model');
const {
  storeResponse,
  allResponse,
  showResponse,
  updateResponse,
  destroyResponse,
} = require('./response');

/**
 * Menambah buku baru
 *
 * @param {*} request
 * @param {*} h
 * @returns
 */
const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  return storeResponse(h, {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  }, storeModel);
};

/**
 * Mendapatkan semua buku dengan filter query
 *
 * @param {*} request
 * @returns
 */
const getAllBooksHandler = (request) => {
  const { query } = request;

  return allResponse(allModel(query));
};

/**
 * Menampilkan buku berdasarkan id
 *
 * @param {*} request
 * @param {*} h
 * @returns
 */
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  return showResponse(h, showModel(bookId)[0]);
};

/**
 * Mengubah value pada buku berdasarkan
 *
 * @param {*} request
 * @param {*} h
 * @returns
 */
const editNoteByIdHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const { bookId } = request.params;
  const updatedAt = new Date().toISOString();

  return updateResponse(h, {
    id: bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  }, updateModel);
};

/**
 * Menghapus data buku dari array
 *
 * @param {*} request
 * @param {*} h
 * @returns
 */
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  return destroyResponse(h, destroyModel(bookId));
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editNoteByIdHandler,
  deleteBookByIdHandler,
};
