module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING(100),
      required: true,
    },
  },
  {
    tableName: 'Categories',
  });
  return Category;
};
