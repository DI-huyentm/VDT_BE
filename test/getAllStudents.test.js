const { getAllStudents } = require('../controllers/studentController.js'); // Adjust the path accordingly
const { Student } = require('../models/index');

jest.mock('../models/index', () => ({
  Student: {
    findAll: jest.fn(),
  },
}));

describe('getAllStudents', () => {
  it('should return all students successfully', async () => {
    const mockStudents = [
      { id: 1, name: 'Student 1' },
      { id: 2, name: 'Student 2' },
    ];

    Student.findAll.mockResolvedValueOnce(mockStudents);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllStudents(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      results: mockStudents.length,
      data: { students: mockStudents },
    });
  });

});
