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
function UpdateGame({ data, gameId }) {

    useEffect(()=>{
        console.log(data,gameId)
    },[])

    return (
        <>{data?
            <Paper className="m-5">
              
            </Paper>
            : <>Loading...</>}</>

    );
}

export default UpdateGame;
