const genres = {
    1: 'scifi',
    2: 'action',
    3: 'thriller',
    4: 'horror',
    5: 'comedy'
}

const users = [
    {
        id: "1",
        movies: [
            {
                name: "movie abc",
                genre: 2,
                rating: 4.5,
                popularity: 4
            },
            {
                name: "movie def",
                genre: 2,
                rating: 4.5,
                popularity: 5
            },
        ],
        sim_vec: {},
        neighbours: [],
        recommendations: []
    },

    {
        id: "2",
        movies: [
            {
                name: "movie ghi",
                genre: 3,
                rating: 4.5,
                popularity: 3
            },
            {
                name: "movie asdf",
                genre: 2,
                rating: 4.5,
                popularity: 3.5
            },
            {
                name: "movie hgff",
                genre: 1,
                rating: 4.5,
                popularity: 4
            },
            {
                name: "movie lkjh",
                genre: 3,
                rating: 4.5,
                popularity: 5
            }
        ],
        sim_vec: {},
        neighbours: [],
        recommendations: []
    },

    {
        id: "3",
        movies: [
            {
                name: "movie 123543",
                genre: 1,
                rating: 4,
                popularity: 4.5
            },
            {
                name: "movie ewrqq",
                genre: 2,
                rating: 3,
                popularity: 5
            },
            {
                name: "movie 2346",
                genre: 1,
                rating: 2,
                popularity: 3
            },
            {
                name: "movie 654",
                genre: 3,
                rating: 5,
                popularity: 2
            }
        ],
        sim_vec: {},
        neighbours: [],
        recommendations: []
    },

    {
        id: "4",
        movies: [
            {
                name: "movie hhrtery",
                genre: 2,
                rating: 3,
                popularity: 4.5
            },
            {
                name: "movie ewqt",
                genre: 2,
                rating: 5,
                popularity: 5
            },
            {
                name: "movie ytxz",
                genre: 1,
                rating: 4.5,
                popularity: 5
            },
            {
                name: "movie kkhoogja",
                genre: 2,
                rating: 2,
                popularity: 3
            }
        ],
        sim_vec: {},
        neighbours: [],
        recommendations: []
    }
]

module.exports = users;