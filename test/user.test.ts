import request from 'supertest';
import App from '../src/App';
import userModel from '../src/models/User.model';

const app = new App().app;

describe('TEST USER ROUTES', () => {
  const bodyReq = {
    userName: 'irenne',
    userEmail: 'irenne@gmail.com',
    password: 'akucintayesus',
    passConfirm: 'akucintayesus',
  };

  test('Test Connection!', async () => {
    const res = await request(app).get('/');
    expect(res.body).toBe('connection ok!');
  });

  test('CREATE USER', async () => {
    const mockCreateUser = jest.fn(() => bodyReq);
    jest.spyOn(userModel, 'create').mockImplementation(() => mockCreateUser());

    const res = await request(app).post('/api/user/').send(bodyReq);
    expect(res.body).toHaveProperty('msg');
    expect(res.body).toHaveProperty('data');
  });
});
