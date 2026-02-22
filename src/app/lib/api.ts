import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const productApi = {
    getAll: () => api.get('/products').then(res => res.data),
    getOne: (id: string) => api.get(`/products/${id}`).then(res => res.data),
    create: (data: any) => api.post('/products', data).then(res => res.data),
    update: (id: string, data: any) => api.patch(`/products/${id}`, data).then(res => res.data),
    delete: (id: string) => api.delete(`/products/${id}`).then(res => res.data),
};

export default api;
