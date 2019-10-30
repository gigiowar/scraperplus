module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      required: true,
    },
    description: {
      type: DataTypes.STRING(255),
      required: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      required: true,
    },
    url: {
      type: DataTypes.TEXT,
      required: true,
    },
    image: {
      type: DataTypes.TEXT,
      required: true,
    },
    sizes: {
      type: DataTypes.STRING,
      required: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'Category',
        key: 'id',
      },
    },
  },
  {
    tableName: 'Products',
  });
  return Product;
};
