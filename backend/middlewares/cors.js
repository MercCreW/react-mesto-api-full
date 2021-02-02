module.exports.corsConfig = {
  origin: [
    'https://iskandarov-project.students.nomoreparties.xyz',
    'http://iskandarov-project.students.nomoreparties.xyz',
    'https://www.iskandarov-project.students.nomoreparties.xyz',
    'http://www.iskandarov-project.students.nomoreparties.xyz',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Origin', 'Referer', 'Accept', 'Authorization'],
  credentials: true,
};
