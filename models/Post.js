import { Sequelize } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const Post = sequelize.define('Post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagePath: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  creator: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Post.belongsTo(User, {
  foreignKey: 'creator',
  as: 'posts',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  references: {
    model: User,
    key: 'id',
  },
});

export default Post;
