const { getStudentsByName } = require('../controllers/studentController.js'); // Adjust the path accordingly
const { Student } = require('../models/index');
const { Op } = require('sequelize');

jest.mock('../models/index', () => ({
  Student: {
    findAll: jest.fn(),
  },
}));

describe('getStudentsByName', () => {
  it('should return students successfully when found', async () => {
    const mockStudents = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];

    Student.findAll.mockResolvedValueOnce(mockStudents);

    const req = { query: { name: 'Doe' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getStudentsByName(req, res);

    expect(Student.findAll).toHaveBeenCalledWith({
      where: { name: { [Op.like]: '%Doe%' } },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      results: mockStudents.length,
      data: { students: mockStudents },
    });
  });

  it('should return a failure message when no students found with the given name', async () => {
    Student.findAll.mockResolvedValueOnce([]);

    const req = { query: { name: 'Nonexistent' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getStudentsByName(req, res);

    expect(Student.findAll).toHaveBeenCalledWith({
      where: { name: { [Op.like]: '%Nonexistent%' } },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'No students found with that name',
    });
  });

});
