import { DataTypes, Model, type Optional } from "sequelize";
import sequelizeConnection from "../config";

interface CallAttributes {
  id: number;
  token: string;
  wordCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CallInput extends Optional<CallAttributes, "id"> {}
export interface CallOutput extends Required<CallAttributes> {}

class Call extends Model<CallAttributes, CallInput> implements CallAttributes {
  public id!: number;
  public token!: string;
  public wordCount!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

Call.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    wordCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Call;
