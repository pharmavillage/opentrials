'use strict';

const opentrialsApi = require('../config').opentrialsApi;
const decorateFDADocument = require('../presenters/fda_document');
const generateESQueryString = require('../helpers/generate-es-query-string');

function searchFDADocuments(query, page, perPage, filters) {
  const searchQuery = {
    q: generateESQueryString(query, filters),
    page,
    per_page: perPage,
  };

  return opentrialsApi
    .then((client) => client.search.searchFDADocuments(searchQuery))
    .then((response) => {
      const data = response.obj;
      data.items = data.items.map((doc) => decorateFDADocument(doc));
      return data;
    });
}

module.exports = {
  search: searchFDADocuments,
};
