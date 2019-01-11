/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes

function turnHoursToMinutes(movies) {
  return movies.map(function(movie) {
    var hours = 0;
    var minutes = 0;

    if (movie.duration.indexOf("h") !== -1) {
      hours = parseInt(
        movie.duration.slice(0, movie.duration.indexOf("h")),
        10
      );
    }

    if (movie.duration.indexOf("m") !== -1) {
      minutes = parseInt(
        movie.duration.slice(
          movie.duration.indexOf("h") + 1,
          movie.duration.indexOf("m")
        ),
        10
      );
    }

    var minduration = hours * 60 + minutes;

    return {
      title: movie.title,
      year: movie.year,
      director: movie.director,
      duration: minduration,
      genre: movie.genre,
      rate: movie.rate
    };
  });
}

// Get the average of all rates with 2 decimals

function ratesAverage(movies) {
  return parseFloat(
    (
      movies
        .filter(({ rate }) => rate)
        .reduce(function(sum, movie) {
          return sum + parseFloat(movie.rate);
        }, 0) / movies.length
    ).toFixed(2)
  );
}

// Get the average of Drama Movies

function dramaMoviesRate(movies) {
  var dramaMovies = movies.filter(function(movie) {
    return movie.genre.indexOf("Drama") !== -1;
  });
  if (dramaMovies.length === 0) {
    return undefined;
  } else {
    return ratesAverage(dramaMovies);
  }
}

// Order by time duration, in growing order

function orderByDuration(movies) {
  var orderedMovies = movies;
  orderedMovies.sort(function(a, b) {
    if (a.duration > b.duration) {
      return 1;
    } else if (a.duration < b.duration) {
      return -1;
    } else if ((a.duration = b.duration)) {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  });
  return orderedMovies;
}

// How many movies did STEVEN SPIELBERG

function howManyMovies(movies) {
  var dramaMovies = movies.filter(function(movie) {
    return movie.genre.indexOf("Drama") !== -1;
  });

  var spielbergDramaMovies = dramaMovies.filter(function(movie) {
    return movie.director === "Steven Spielberg";
  });

  if (dramaMovies.length === 0) {
    return undefined;
  } else if (spielbergDramaMovies.length === 0) {
    return "Steven Spielberg directed 0 drama movies!";
  } else {
    return (
      "Steven Spielberg directed " +
      spielbergDramaMovies.length +
      " drama movies!"
    );
  }
}

// Order by title and print the first 20 titles

function orderAlphabetically(movies) {
  var orderedMovies = movies;

  orderedMovies.sort(function(a, b) {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
  });

  if (orderedMovies.length >= 20) {
    orderedMovies.splice(20);
  }

  var orderTitles = orderedMovies.map(function(movie) {
    return movie.title;
  });

  return orderTitles;
}

// Best yearly rate average

function bestYearAvg(movies) {
  if (movies.length !== 0) {
    var years = movies.map(function(movie) {
      return movie.year;
    });

    years.sort();

    var yearsFiltered = [];

    years.forEach(function(year, index) {
      if (index === years.indexOf(year)) {
        yearsFiltered.push(year);
      }
    });

    function moviesOfYear(specificYear) {
      return movies.filter(function(movie) {
        return movie.year === specificYear;
      });
    }

    //console.log(moviesOfYear("1972"));

    var avgRatePerYear = yearsFiltered.map(function(oneYear) {
      return {
        year: oneYear,
        avgrate: ratesAverage(moviesOfYear(oneYear))
      };
    });

    //console.log(avgRatePerYear);

    var bestYear = 0;
    var bestAvg = 0;

    avgRatePerYear.forEach(function(elem) {
      if (elem.avgrate > bestAvg) {
        bestYear = elem.year;
        bestAvg = elem.avgrate;
      }
    });

    return (
      "The best year was " + bestYear + " with an average rate of " + bestAvg
    );
  } else {
    return undefined;
  }
}
