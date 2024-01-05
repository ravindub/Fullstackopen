const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');
const User = require('../models/user');

describe('when there is one user in the DB at the beginning', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('MyPassword', 10);
    const user = new User({
      username: 'root',
      passwordHash
    });

    await user.save();
  });

  test('Successfully add a user with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'Alex',
      name: 'Alex petri',
      password: 'alex123'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('Cannot create a user if the username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'SuperUser',
      password: 'myPassword'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('Cannot create a user if the username or password is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const user = {
      username: 'an',
      name: 'anna',
      password: 'm'
    };

    const result = await api.post('/api/users').send(user).expect(400);

    expect(result.body.error).toContain(
      'Username and Password must be at least 3 characters long'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('Cannot create a user if the username or password is empty', async () => {
    const usersAtStart = await helper.usersInDb();

    const user1 = {
      username: '',
      name: 'anna',
      password: 'pass'
    };

    const user2 = {
      username: 'sara',
      name: 'sara',
      password: ''
    };

    const result1 = await api.post('/api/users').send(user1).expect(400);

    expect(result1.body.error).toContain('Username cannot be empty');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);

    const result2 = await api.post('/api/users').send(user2).expect(400);

    expect(result2.body.error).toContain('Password cannot be empty');

    const usersAtEnd2 = await helper.usersInDb();
    expect(usersAtEnd2).toEqual(usersAtStart);
  });
});
