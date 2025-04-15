
import { Kingdom } from './types';
import { v4 as uuidv4 } from 'uuid';

// Create a new kingdom
export const createKingdom = (name: string, ruler: string): Kingdom => ({
  id: uuidv4(),
  name,
  ruler,
  age: 0,
  lastUpdated: Date.now(),
});
