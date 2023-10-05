import { BETTINGS, HOST_PORT } from '../config';
import axios from 'axios';

export const createBetting = async (user_id, points,newBetting) => {

    try {
        const response = await axios.post(`${HOST_PORT}${BETTINGS}?user_id=${user_id}&points=${points}`,newBetting);
        return response;

    }
    catch (e) {
        throw new Error(`베팅하는 중 오류 발생 `)
    }


}
