/**
 * Validasi request
 *
 * @param {Object} h
 * @param {Array} book
 * @param {String} keyMsg
 * @returns
 */
const bookRules = (h, book, keyMsg) => {
  if (book.name === undefined) {
    return h.response({
      status: 'fail',
      message: `Gagal ${keyMsg} buku. Mohon isi nama buku`,
    }).code(400);
  }

  if (book.readPage > book.pageCount) {
    return h.response({
      status: 'fail',
      message: `Gagal ${keyMsg} buku. readPage tidak boleh lebih besar dari pageCount`,
    }).code(400);
  }

  return false;
};

/**
 * Response setelah menyimpan data dengan validasi request
 *
 * @param {Object} h
 * @param {Array} book
 * @param {*} modelCallback
 * @returns
 */
const storeResponse = (h, book, modelCallback) => {
  const checkRules = bookRules(h, book, 'menambahkan');
  if (checkRules) return checkRules;

  if (modelCallback(book)) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: book.id,
      },
    }).code(201);
  }

  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

/**
 * Response untuk menampilkan semua buku difilter berdasarkan id, name, publisher
 *
 * @param {Array} model
 * @returns
 */
const allResponse = (model) => ({
  status: 'success',
  data: {
    books: model.map((value) => ({
      id: value.id,
      name: value.name,
      publisher: value.publisher,
    })),
  },
});

/**
 * Response untuk menampilkan buku berdasarkan id
 *
 * @param {Object} h
 * @param {Array} book
 * @returns
 */
const showResponse = (h, book) => {
  if (book) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

/**
 * Response setelah mengubah buku
 *
 * @param {Object} h
 * @param {Array} book
 * @param {Array} modelCallback
 * @returns
 */
const updateResponse = (h, book, modelCallback) => {
  const checkRules = bookRules(h, book, 'memperbarui');
  if (checkRules) return checkRules;

  if (modelCallback(book)) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

/**
 * Response setelah menghapus buku
 *
 * @param {Object} h
 * @param {Array} book
 * @returns
 */
const destroyResponse = (h, book) => {
  if (book) {
    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = {
  bookRules,
  storeResponse,
  allResponse,
  showResponse,
  updateResponse,
  destroyResponse,
};
