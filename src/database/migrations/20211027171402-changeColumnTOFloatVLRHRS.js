module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(
    `
    ALTER TABLE public."Recursos" ALTER COLUMN "colabVlrHr" TYPE float USING "colabVlrHr"::float;

   ALTER TABLE public."Recursos" ALTER COLUMN "custoPrev" TYPE float USING "custoPrev"::float;`,
  ),

  down: (queryInterface) => queryInterface.sequelize.query(
    `ALTER TABLE public."Recursos" ALTER COLUMN "colabVlrHr" TYPE varchar USING "colabVlrHr"::varchar;

    ALTER TABLE public."Recursos" ALTER COLUMN "custoPrev" TYPE varchar USING "custoPrev"::varchar;`,
  ),
};
