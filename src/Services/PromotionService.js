import axios from 'axios';

const API_URL = 'https://your-api-endpoint/promotions';

class PromotionService {
    getAllPromotions() {
        return axios.get(API_URL);
    }

    getPromotionById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    createPromotion(promotion) {
        return axios.post(API_URL, promotion);
    }

    updatePromotion(id, promotion) {
        return axios.put(`${API_URL}/${id}`, promotion);
    }

    deletePromotion(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new PromotionService();
