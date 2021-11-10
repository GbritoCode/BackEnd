// --------------------RECURSO----------------------
// --------------------RECURSO----------------------
// --------------------RECURSO----------------------
// try {
//   const rec = await Recurso.findAll({
//     attributes: ['id', 'colabVlrHr', 'custoPrev'],
//   });

//   // eslint-disable-next-line no-restricted-syntax
//   for (const recurso of rec) {
//     const { id, colabVlrHr, custoPrev } = recurso.dataValues;
//     console.log(id);
//     console.log(colabVlrHr);
//     await Recurso.update({
//       colabVlrHr: colabVlrHr / 100,
//       custoPrev: custoPrev / 100,
//     }, {
//       where: { id },
//     });
//   }

//   console.log(rec);
//   return res.json(rec);
// } catch (err) {
//   console.log(err);
//   return res.json('erro');
// }

// ////////////////////////RECURSO////////////////////////////
// ////////////////////////RECURSO////////////////////////////
// ////////////////////////RECURSO////////////////////////////
