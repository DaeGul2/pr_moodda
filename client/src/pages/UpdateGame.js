import React, { useState, useEffect } from "react";
import { getAllPlayers } from "../api/playerAPI"; // 예를 들어, 선수 데이터를 가져오는 API 함수를 import
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import { createGame, updateGame } from "../api/gameAPI";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function UpdateGame({data,gameId}) {

    const initialGame = {
        home: {
            _id: "",
            player_name: "",
            player_uni: "",
            player_tear: "",
            player_tpz: "",
            sex: "",
            rate: 1.0,
        },
        away: {
            _id: "",
            player_name: "",
            player_uni: "",
            player_tear: "",
            player_tpz: "",
            sex: "",
            rate: 1.0,
        },
    };

    const [formData, setFormData] = useState({data});

    const handleAddGame = () => {
        
        setFormData({
            ...formData,
            games: [...formData.games, initialGame],
        });
    };

    const handleGameChange = (index, team, newValue) => {
        if (newValue) {
            setFormData((prevData) => {
                const updatedGames = [...prevData.games];
                updatedGames[index][team]['_id'] = newValue._id;
                updatedGames[index][team]['sex'] = newValue.sex;
                updatedGames[index][team]['player_name'] = newValue.player_name;
                updatedGames[index][team]['player_tpz'] = newValue.player_tpz;
                updatedGames[index][team]['player_uni'] = newValue.player_uni;
                updatedGames[index][team]['player_tear'] = newValue.player_tear;

                return { ...prevData, games: updatedGames };
            });
            console.log(formData)
        }
    };

    const [players, setPlayers] = useState(null);
    const [gameType, setGameType] = useState("1v1");

    useEffect(() => {
        // 선수 데이터를 비동기적으로 가져옴 (예: getPlayers 함수 사용)
        getAllPlayers()
            .then((data) => {

                // 가져온 선수 데이터를 players 상태에 설정
                setPlayers(data);
                console.log(formData,gameId)

            })
            .catch((error) => {
                console.error("선수 데이터를 가져오는 중 오류 발생:", error);
            });
    }, []);

    const defaultProps = {
        options: players,
        getOptionLabel: (option) => `${option.player_name}-${option.player_tpz}(${option.player_tear} - ${option.player_uni})`,
    };

    const sendData = () => {
        createGame(formData);
    }

    return (
        <>{players ?
            <Paper className="m-5">
                
              
            </Paper>
            : <>Loading...</>}</>

    );
}

export default UpdateGame;
