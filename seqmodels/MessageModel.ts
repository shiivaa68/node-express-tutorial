import { DataTypes, Model,Optional } from "sequelize";
import Lesson from './LessonModel';
import sequelize from '../dbseq'
class Message extends Model {
  public id!: number;
  public sender!: string;
  public text!: string;
  public lesson_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lessons',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: true,
  }
);

// Define relationship
Lesson.hasMany(Message, { foreignKey: 'lesson_id' });
Message.belongsTo(Lesson, { foreignKey: 'lesson_id' });

export default Message;