module.exports = {
  up: (queryInterface) => queryInterface.sequelize.query(
    `
    ALTER TABLE public."Parcelas" ALTER COLUMN "saldo" TYPE integer USING "saldo"::integer;
  `,
  ),

  down: (queryInterface) => queryInterface.sequelize.query(
    `
    ALTER TABLE public."Parcelas" ALTER COLUMN "saldo" TYPE varchar USING "saldo"::varchar;
    `,
  ),
};
