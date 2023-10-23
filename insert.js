const Movie = require('./models/Movie');
const Cinema = require('./models/Cinema');
const User = require('./models/User');
const request = require('request');

async function insert() {
    let options = {upsert: true, new: true, setDefaultsOnInsert: true};
    Movie.deleteMany({}, () => {});
    // Movies
    let cityComplexMovies = [];
    let voxMovies = [];
    let lasSalinasMovies = [];
    const genresUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=0e4106ed69120f9ad3575cf6678638a1&language=en-US";
    request.get(genresUrl, (genresError, genresResponse, genresBody) => {
        const genres = JSON.parse(genresBody).genres;
        const moviesUrl = "https://api.themoviedb.org/3/discover/movie?api_key=0e4106ed69120f9ad3575cf6678638a1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
        request.get(moviesUrl, async (moviesError, moviesResponse, moviesBody) => {
            let movies = JSON.parse(moviesBody).results;
            for (let i = 0; i < movies.length; i++) {
                const filtered = genres.filter((genre) => genre.id === movies[i].genre_ids[0]);
                const genre = filtered.length > 0 ? filtered[0].name : 'Unknown genre';
                const randomTime = Math.floor(Math.random() * (11) + 1)
                const pm = Math.random() >= 0.5;
                const timeString = `${randomTime}:00 ${pm ? 'PM' : 'AM'}`;
                const movie = await Movie.findOneAndUpdate(
                    {name: movies[i].title},
                    {
                        name: movies[i].title,
                        genre, time: timeString,
                        description: movies[i].overview,
                        posterPath: movies[i].poster_path
                    },
                    options
                );
                const randomCinema = Math.random();
                // console.log(randomCinema);
                if (randomCinema < 0.33) {
                    // console.log('hi');
                    cityComplexMovies.push(movie);
                } else if (randomCinema < 0.66) {
                    // console.log('hii');
                    voxMovies.push(movie);
                } else {
                    // console.log('hiii');
                    lasSalinasMovies.push(movie);
                }
            }
            // Cinemas
            const cityComplex = await Cinema.findOneAndUpdate(
                {name: 'City complex'},
                {name: 'City complex', movies: cityComplexMovies},
                options);
            const voxCityCenter = await Cinema.findOneAndUpdate(
                {name: 'Vox city center'},
                {name: 'Vox city center', movies: voxMovies},
                options);
            const lasSalinas = await Cinema.findOneAndUpdate(
                {name: 'Las Salinas'},
                {name: 'Las Salinas', movies: lasSalinasMovies},
                options);
        
            // Users
            const abdo = await User.findOneAndUpdate(
                {username: 'Abdo'},
                {username: 'Abdo', password: '1234', address: 'Ashraf Kabbarah, 1030 Tripoli'},
                options);
        });
    });
    
}

module.exports = insert;