const { Qualification, Product } = require("../db");

const qualifyProduct = async (arrQualification) => {
  for (const qualification of arrQualification) {
    const exists = await Qualification.findByPk(qualification.idProduct);
    
    if (exists) {
      const sum = exists.sum + qualification.points;
      const amount = exists.amount + 1;
      qualification.comment && exists.comment.push(qualification.comment)
      await Qualification.update(
        {
          sum: sum,
          amount: amount,
          comment: exists.comment,
        },
        { where: { id: qualification.idProduct } }
      );
    } else {
      await Qualification.create({
        id: qualification.idProduct,
        sum: qualification.points,
        amount: 1,
        comment: qualification.comment ? [qualification.comment] : [] ,
      });
    }

    const rating = await Qualification.findByPk(qualification.idProduct);
    const average = Math.ceil(rating.sum / rating.amount);

    await Product.update(
      { qualification: average },
      { where: { id: qualification.idProduct } }
    );
  }
};

const qualificationComment = async (idProduct) => {
  const comment = await Qualification.findByPk(idProduct);
  return comment;
};

module.exports = { qualifyProduct , qualificationComment };
