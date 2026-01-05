'use strict';
import client from '../db/db.js';
import { DataTypes } from 'sequelize';

const Room = client.define(
  'Rooms',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    members: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: 'rooms',
    timestamps: false,
  },
);

export default Room;
