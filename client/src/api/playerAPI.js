import { HOST_PORT, PLAYERS } from '../config';
import axios from 'axios';

export const getPlayers = async (crntPage,perPage,updown) => {
    try {
        const response = await axios.get(`${HOST_PORT}${PLAYERS}?page=${crntPage}&perpage=${perPage}&updown=${updown}`);
        return response.data;
        
    }
    catch (error) {
        throw new Error('player 정보 가져오는 중 오류 발생');
    }
}

export const getAllPlayers = async () => {
    try {
        const response = await axios.get(`${HOST_PORT}${PLAYERS}/all`);
        return response.data;
        
    }
    catch (error) {
        throw new Error('player 정보 가져오는 중 오류 발생');
    }
}