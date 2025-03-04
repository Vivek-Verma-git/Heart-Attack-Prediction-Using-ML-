import { User } from '../types';

// Simulating a database of users since we don't have a backend
let users: User[] = [];

export const auth = {
  register: (email: string, password: string, name: string): User => {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = { id: Date.now().toString(), email, name };
    users.push({ ...user, password });
    return user;
  },

  login: (email: string, password: string): User => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return user;
  },

  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }
};