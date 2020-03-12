import {Sequelize,Model} from 'sequelize';

class Currency extends Model{
  static init(sequelize){
    super.init({
      name:Sequelize.STRING,
      rate:Sequelize.DOUBLE
    },{
      sequelize
    })
    return this;
  }
}

export default Currency;
