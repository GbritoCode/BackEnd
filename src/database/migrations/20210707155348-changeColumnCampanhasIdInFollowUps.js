module.exports = {
  up: (queryInterface) => queryInterface.renameColumn('FollowUps', 'CampanhasId', 'CampanhaId'),

  down: (queryInterface) => queryInterface.renameColumn('FollowUps', 'CampanhaId', 'CampanhasId'),
};
