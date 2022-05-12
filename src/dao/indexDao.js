const { pool } = require("../../config/database");

exports.selectRestaurants = async function (connection, category) {
  const selectAllRestaurantsQuery = `SELECT title, address, category, videoUrl FROM Restaurants where status = 'A';`;
  const selectCategorizedRestaurantsQuery = `SELECT title, address, category, videoUrl FROM Restaurants where status = 'A' and category = ?;`;

  const Params = [category];

  const Query = category
    ? selectCategorizedRestaurantsQuery
    : selectAllRestaurantsQuery;

  const rows = await connection.query(Query, Params);

  return rows;
};

// ===========================================================================================

// 템플릿 예시
exports.exampleDao_ex = async function (connection, params) {   
  const Query = ``;
  const Params = [];

  const rows = await connection.query(Query, Params);

  return rows;
};