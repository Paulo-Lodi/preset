// frontend/hooks/useUsers.js
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchUsers = async () => {
    const { data } = await api.get('/users/');
    return data;
};

export const useUsers = () => {
    return useQuery('users', fetchUsers);
};
