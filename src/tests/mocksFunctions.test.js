import { storage } from "../lib/storage";
import { saveUserName, getUserName } from "../user";

jest.mock('../lib/storage');

describe('MOCK FUNCTIONS ', () => {
  let username = 'john doe';
  
  test('should save username in localStorage', () => {
    saveUserName(username);
    expect(storage.save).toHaveBeenCalledTimes(1);
    expect(storage.save).toHaveBeenCalledWith({ key: 'username', value: username });
  });

  test('should get user name from localStorage', () => {
    storage.get.mockReturnValueOnce(username);

    const result = getUserName();

    expect(result).toBe(username)
    expect(storage.get).toHaveBeenCalledTimes(1);
    expect(storage.get).toHaveBeenCalledWith({ key: 'username' });
  });
});