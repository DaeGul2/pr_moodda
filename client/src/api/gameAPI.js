import { GAMES, HOST_PORT } from '../config';
import axios from 'axios';

//type  0 종료 1 진행중 2 진행 전
export const getGames = async (page, perPage, type) => {
    try {
        const games = await axios.get(`${HOST_PORT}${GAMES}?page=${page}&perPage=${perPage}&type=${type}`);
        return games;
    }
    catch (e) {
        throw new Error('games 정보 가져오는 중 오류 발생');
    }
}

export const createGame = async (newGame) => {
    try {
        const response = await axios.post(`${HOST_PORT}${GAMES}`, newGame);
        return response;
    }
    catch (e) {
        throw new Error('games 정보 생성 중 오류 발생');
    }

}

export const updateGame = async (gameId, newGame) => {
    try {
        const response = await axios.put(`${HOST_PORT}${GAMES}/${gameId}`, newGame)
        return response;
    }
    catch (e) {
        throw new Error('games 업데이트 중 오류 발생');
    }
}

export const deleteGame = async (gameId) => {
    try {
        const response = await axios.delete(`${HOST_PORT}${GAMES}/${gameId}`)
        return response;
    }
    catch (e) {
        throw new Error('games 업데이트 중 오류 발생');
    }
}

export const deleteMatch = async (gameId,matchId) => {
    try {
        const response = await axios.delete(`${HOST_PORT}${GAMES}/?gameId=${gameId}&matchId=${matchId}`)
        return response;
    }
    catch (e) {
        throw new Error('games 업데이트 중 오류 발생');
    }
}