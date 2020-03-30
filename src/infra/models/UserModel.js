const { hashPassword } = require('../encryption/hashPassword');

module.exports = {
  name: 'UserModel',
  datasource: 'db',
  definition: function(datasource, DataTypes) {
    const UserModel = datasource.define('UserModel', {
      id : {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      }, 
      email : {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'E-mail already exist'
        },
        allowNull: false
      },
      password : {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName : {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName : {
        type: DataTypes.STRING,
        allowNull: false
      },
      middleName : {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      hooks: {
        beforeCreate: user => {
          user.password = hashPassword(user.password);
        },
        beforeUpdate: user => {
          user.password = hashPassword(user.password);
        },

      },
      tableName: 'users',
      timestamps: true
    });

    /**
     * Examples on how to associate or set relationship with other models
     * 
     *  UserModel.associate = function () {
     *   UserModel.belongsTo(datasource.models.GroupModel, {
     *     foreignKey: 'groupId',
     *     as: 'group',
     *   });
     *  };
     * 
     * refer to sequelize documentation https://sequelize.org/master/manual/associations.html
     */

    return UserModel;
  }
};
  