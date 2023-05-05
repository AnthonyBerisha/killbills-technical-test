import { DataTypes, Model, type Optional } from "sequelize";
import sequelizeConnection from "../config";

interface TokenAttributes {
  id: number;
  token: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface TokenInput extends Optional<TokenAttributes, "id"> {}
export interface TokenOutput extends Required<TokenAttributes> {}

class Token
  extends Model<TokenAttributes, TokenInput>
  implements TokenAttributes
{
  public id!: number;
  public token!: string;
  public email!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
}

Token.init(
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
);

export default Token;
