const config = {
  mongodb: {
    url: 'mongodb+srv://test:PjXjuvi6pSRud5k@cluster0.qqsty.mongodb.net/test?authSource=admin',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
};

module.exports = config;
