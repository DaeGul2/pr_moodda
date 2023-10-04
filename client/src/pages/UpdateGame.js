import React, { useState, useEffect } from "react";
import { getAllPlayers } from "../api/playerAPI"; // 예를 들어, 선수 데이터를 가져오는 API 함수를 import
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import { updateMatch } from "../api/gameAPI";
import Button from '@mui/material/Button';





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function UpdateGame({ data, gameId, matchId,playerInfo,rateInfo }) {
    const [players, setPlayers] = useState([]);
    const [formData, setFormData] = useState(data || {})
    useEffect(() => {
        getAllPlayers()
            .then((data) => {

                // 가져온 선수 데이터를 players 상태에 설정
                setPlayers(data);
                

            })
            .catch((error) => {
                console.error("선수 데이터를 가져오는 중 오류 발생:", error);
            });
        console.log("formData", formData,playerInfo,rateInfo)
    }, [])

    

    const defaultProps = {
        options: players,
        getOptionLabel: (option) => `${option.player_name}-${option.player_tpz}(${option.player_tear} - ${option.player_uni})`,
    };

    const update = () => {
        updateMatch(gameId, matchId, formData)
            .then((res) => {
                alert('수정되었습니다.')
            }).catch((e) => { alert(e) })
    }

    const handleGameChange = (team, newValue) => {
        if (newValue) {
            setFormData((prevData) => {
                const updatedGames = { ...prevData };
                updatedGames[team]['_id'] = newValue._id;
                updatedGames[team]['sex'] = newValue.sex;
                updatedGames[team]['player_name'] = newValue.player_name;
                updatedGames[team]['player_tpz'] = newValue.player_tpz;
                updatedGames[team]['player_uni'] = newValue.player_uni;
                updatedGames[team]['player_tear'] = newValue.player_tear;

                return { ...updatedGames };
            });
            console.log(formData)
        }
    };

    return (
        <>{data ?
            <Paper className="m-5">
                <Grid container spacing={2}>
                    <Grid item xs={5.5}>
                        <Paper>
                            <Autocomplete
                                {...defaultProps}
                                id="auto-complete"
                                autoComplete
                                includeInputInList
                                onChange={(e, newValue) => { handleGameChange('home', newValue) }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Home" variant="standard" />
                                )}
                            />
                        </Paper>
                        <TextField className="mt-3"
                            id="outlined-number"
                            label="배당"
                            type="number"
                            defaultValue={1}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 0.05, // 숫자 간격 설정
                                min: 1,     // 최소값 설정
                            }}
                            onChange={(e) => {
                                setFormData((prevData) => {
                                    const updatedGames = { ...prevData };
                                    updatedGames.home.rate = e.target.value; // away 필드의 rate 값을 업데이트
                                    return { ...prevData, home: updatedGames.away }; // away 필드만 업데이트된 값으로 설정
                                });
                            }}
                        />
                    </Grid>
                    <Grid item xs={1} display="flex" justifyContent="center" alignItems="center" >
                        <h2>vs</h2>
                    </Grid>
                    <Grid item xs={5.5} >
                        <Paper>
                            <Autocomplete
                                {...defaultProps}
                                id="auto-complete"
                                autoComplete
                                includeInputInList
                                onChange={(e, newValue) => { handleGameChange('away', newValue) }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Away" variant="standard" />
                                )}
                            />
                        </Paper>
                        <TextField className="mt-3"
                            id="outlined-number"
                            label="배당"
                            type="number"
                            defaultValue={1}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 0.05, // 숫자 간격 설정
                                min: 1,     // 최소값 설정
                            }}
                            onChange={(e) => {
                                setFormData((prevData) => {
                                    const updatedGames = { ...prevData };
                                    updatedGames.away.rate = e.target.value; // away 필드의 rate 값을 업데이트
                                    return { ...prevData, away: updatedGames.away }; // away 필드만 업데이트된 값으로 설정
                                });

                            }}
                        />
                    </Grid>
                </Grid>
                <Button onClick={update}>수정</Button>
            </Paper>
            : <>Loading...</>}</>

    );
}

export default UpdateGame;
