var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('./gold_medals.sqlite');

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
  const query = "CREATE TABLE Country ( "
              + "name TEXT NOT NULL, "
              + "code TEXT NOT NULL, "
              + "gdp INTEGER, "
              + "population INTEGER "
              + ");"
  return query;
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
  const query = "CREATE TABLE GoldMedal ("
              + "id INTEGER PRIMARY KEY NOT NULL, "
              + "year INTEGER NOT NULL, "
              + "city TEXT NOT NULL, "
              + "season TEXT NOT NULL, "
              + "name TEXT NOT NULL, "
              + "country TEXT NOT NULL, "
              + "gender TEXT NOT NULL, "
              + "sport TEXT NOT NULL, "
              + "discipline TEXT NOT NULL, "
              + "event TEXT NOT NULL"
              + ");"
  return query;
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = (country) => {
  const query = "SELECT COUNT(*) as count FROM GoldMedal "
              + "WHERE country = '" + country + "'"
              + ";"
  return query;
};

/*
Returns a SQL query string that will find the year where the given country
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = (country) => {
  const query = "SELECT year, COUNT(*) as count FROM GoldMedal "
              + "WHERE country = '" + country + "' "
              + "AND season = 'Summer' "
              + "GROUP BY year "
              + "ORDER BY count DESC "
              + "LIMIT 1"
              + ";"
  return query;
};

/*
Returns a SQL query string that will find the year where the given country
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = (country) => {
  const query = "SELECT year, COUNT(*) as count FROM GoldMedal "
              + "WHERE country = '" + country + "' "
              + "AND season = 'Winter' "
              + "GROUP BY year "
              + "ORDER BY count DESC "
              + "LIMIT 1"
              + ";"
  return query;
};

/*
Returns a SQL query string that will find the year where the given country
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = (country) => {
  const query = "SELECT year, COUNT(*) as count FROM GoldMedal "
              + "WHERE country = '" + country + "' "
              + "GROUP BY year "
              + "ORDER BY count DESC "
              + "LIMIT 1"
              + ";"
  return query;
};

/*
Returns a SQL query string that will find the discipline this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = (country) => {
  const query = "SELECT discipline, COUNT(*) as count FROM GoldMedal "
              + "WHERE country = '" + country + "' "
              + "GROUP BY discipline "
              + "ORDER BY count DESC "
              + "LIMIT 1"
              + ";"
  return query;
};

/*
Returns a SQL query string that will find the sport this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = (country) => {
  const query = "SELECT sport, COUNT(*) as count FROM GoldMedal "
              + "WHERE country = '" + country + "' "
              + "GROUP BY sport "
              + "ORDER BY count DESC "
              + "LIMIT 1"
              + ";"
  return query;
};

/*
Returns a SQL query string that will find the event this country has
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = (country) => {
  const query = "SELECT event, COUNT(*) as count FROM GoldMedal "
              + "WHERE country = '" + country + "' "
              + "GROUP BY event "
              + "ORDER BY count DESC "
              + "LIMIT 1"
              + ";"
  return query;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = (country) => {
  const query = "SELECT COUNT(DISTINCT(name)) as count FROM GoldMedal "
              + "WHERE country = '" + country + "' "
              + "AND gender = 'Men'"
              + ";"
  return query;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = (country) => {
  const query = "SELECT COUNT(DISTINCT(name)) as count FROM GoldMedal "
              + "WHERE country = '" + country + "' "
              + "AND gender = 'Women'"
              + ";"
  return query;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = (country) => {
  const query = "SELECT name, COUNT(*) as count FROM GoldMedal "
              + "WHERE country = '" + country + "' "
              + "GROUP BY name "
              + "ORDER BY count DESC "
              + "LIMIT 1"
              + ";"
  return query;
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {
  let query;
  let fieldIsValid;
  let sortIsValid;
  let direction;

  if (field === 'id' || field === 'year' || field === 'city' || field === 'season'
      || field === 'name' || field === 'country' || field === 'gender' ||
      field === 'sport' || field === 'discipline' || field === 'event') {
        fieldIsValid = true;
      } else {
        fieldIsValid = false;
      }

  if (sortAscending === true) {
    sortIsValid = true;
    direction = "ASC";
  } else if (sortAscending === false) {
    sortIsValid = true;
    direction = "DESC";
  } else {
    sortIsValid = false
  }

  if (fieldIsValid && sortIsValid) {
    query = "SELECT * FROM GoldMedal "
          + "WHERE country = '" + country + "' "
          + "ORDER BY " + field + " " + direction
          + ";"
    } else {
      query = "SELECT * FROM GoldMedal "
            + "WHERE country = '" + country + "' "
            + ";"
    }

  return query;
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
  let query;
  let fieldIsValid;
  let sortIsValid;
  let direction;

  if (field === 'id' || field === 'year' || field === 'city' || field === 'season'
      || field === 'name' || field === 'country' || field === 'gender' ||
      field === 'sport' || field === 'discipline' || field === 'event') {
        fieldIsValid = true;
      } else {
        fieldIsValid = false;
      }

  if (sortAscending === true) {
    sortIsValid = true;
    direction = "ASC";
  } else if (sortAscending === false) {
    sortIsValid = true;
    direction = "DESC";
  } else {
    sortIsValid = false
  }

  if (fieldIsValid && sortIsValid) {
    query = "SELECT sport, COUNT(*) as count, "
          + "(COUNT(*) * 100 / (SELECT COUNT(*) FROM GoldMedal "
          + " WHERE country = '" + country + "')) "
          + "as percent FROM GoldMedal "
          + "WHERE country = '" + country + "' "
          + "GROUP BY sport "
          + "ORDER BY " + field + " " + direction
          + ";"
    } else {
      query = "SELECT sport, COUNT(*) as count, "
            + "(COUNT(*) * 100 / (SELECT COUNT(*) FROM GoldMedal "
            + " WHERE country = '" + country + "')) "
            + "as percent FROM GoldMedal "
            + "WHERE country = '" + country + "' "
            + "GROUP BY sport"
            + ";"
    }

  return query;
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports
};
