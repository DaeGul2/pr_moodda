import { HOST_PORT, GET_PLAYERS } from '../config';
import axios from 'axios';

export const getPlayers = async (crntPage,perPage,updown) => {
    try {
        const response = await axios.get(`${HOST_PORT}${GET_PLAYERS}?page=${crntPage}&perpage=${perPage}&updown=${updown}`);
        return response.data;
        
    }
    catch (error) {
        throw new Error('player 정보 가져오는 중 오류 발생');
    }
}