import Sequelize, { Model } from 'sequelize';

class Tip extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        introduction: Sequelize.TEXT,
        file: Sequelize.STRING,
        link: Sequelize.STRING,
        deleted_at: Sequelize.DATE,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.file}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Tip;
