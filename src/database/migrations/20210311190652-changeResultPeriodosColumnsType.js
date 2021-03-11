module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(
    `
    ALTER TABLE public."ResultPeriodos" ALTER COLUMN "totalHrs" TYPE integer USING "totalHrs"::integer;

   ALTER TABLE public."ResultPeriodos" ALTER COLUMN "totalDesp" TYPE integer USING "totalDesp"::integer;

    ALTER TABLE public."ResultPeriodos" ALTER COLUMN "totalReceb" TYPE integer USING "totalReceb"::integer;
  `,
  ),

  down: (queryInterface) => queryInterface.sequelize.query(
    `ALTER TABLE public."ResultPeriodos" ALTER COLUMN "totalHrs" TYPE varchar USING "totalHrs"::varchar;

    ALTER TABLE public."ResultPeriodos" ALTER COLUMN "totalDesp" TYPE varchar USING "totalDesp"::varchar;

    ALTER TABLE public."ResultPeriodos" ALTER COLUMN "totalReceb" TYPE varchar USING "totalReceb"::varchar;`,
  ),
};
