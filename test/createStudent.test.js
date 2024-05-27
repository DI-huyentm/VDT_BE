const { createStudent } = require('../controllers/studentController.js'); // Adjust the path accordingly
const { Student } = require('../models/index');

jest.mock('../models/index', () => ({
  Student: {
    create: jest.fn(),
  },
}));

describe('createStudent', () => {
  it('should create a new student successfully', async () => {
    const mockNewStudent = { id: 1, name: 'John Doe', gender: 'male', school: 'ABC School' };

    Student.create.mockResolvedValueOnce(mockNewStudent);

    const req = { body: { name: 'John Doe', gender: 'male', school: 'ABC School' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createStudent(req, res);

    expect(Student.create).toHaveBeenCalledWith({
      name: req.body.name,
      gender: req.body.gender,
      school: req.body.school,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: { student: mockNewStudent },
    });
  });

});
