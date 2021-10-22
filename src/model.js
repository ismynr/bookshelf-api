const books = require('./books');

/**
 * Simpan data dengan pengecekan array filter
 *
 * @param {Array} book
 * @returns
 */
const storeModel = (book) => {
  books.push(book);
  const bookFilter = books.filter((b) => b.id === book.id);
  return bookFilter ? book : false;
};

/**
 * Mendapatkan semua data
 *
 * @param {Array} query
 * @returns
 */
const allModel = (query) => {
  const { reading, finished, name } = query;
  const boolConvert = [false, true];

  if (reading) {
    return books.filter((b) => b.reading === boolConvert[reading]);
  } if (finished) {
    return books.filter((b) => b.finished === boolConvert[finished]);
  } if (name) {
    return books.filter((b) => b.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
  }

  return books;
};

/**
 * Mendapatkan data buku dengan filter berdasarkan id
 *
 * @param {String} bookId
 * @returns
 */
const showModel = (bookId) => {
  const book = books.filter((b) => b.id === bookId);

  return book || false;
};

/**
 * Mengubah data buku berdasarkan index pada array buku
 *
 * @param {Array} book
 * @returns
 */
const updateModel = (book) => {
  const index = books.findIndex((b) => b.id === book.id);

  if (index !== -1) {
    Object.keys(books[index]).forEach((key) => {
      if (book[key] !== undefined) {
        books[index][key] = book[key];
      }
    });

    return true;
  }

  return false;
};

/**
 * Menghapus data buku berdasarkan id
 *
 * @param {String} bookId
 * @returns
 */
const destroyModel = (bookId) => {
  const index = books.findIndex((b) => b.id === bookId);

  return (index !== -1)
    ? books.splice(index, 1)
    : false;
};

module.exports = {
  storeModel,
  allModel,
  showModel,
  updateModel,
  destroyModel,
};
