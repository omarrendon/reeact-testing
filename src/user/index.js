import { storage } from "../lib/storage";

export const saveUserName = (userName) => {
  storage.save({ key: 'username', value: userName });
};

export const getUserName = () => {
    return storage.get({ key: 'username' });
};