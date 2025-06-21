import axios from "axios";

export const saveCartToBackend = async (userId, items) => {
    return await axios.post("/api/cart/save", { userId, items });
};

export const getCartFromBackend = async (userId) => {
    const res = await axios.get(`/api/cart/${userId}`);
    return res.data.items;
};
