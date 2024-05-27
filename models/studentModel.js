module.exports = (sequelize, DataTypes, Model) => {
  class Student extends Model {}
  Student.init({
    name: DataTypes.STRING,
    gender: {
      type: DataTypes.STRING,
      defaultValue: null // Set default value to null
    },
    school: {
      type: DataTypes.STRING,
      defaultValue: null // Set default value to null
    }
  }, {
    sequelize,
    modelName: 'Student',
    timestamps: false // Disable createdAt and updatedAt fields
  });

  return Student;
};
  