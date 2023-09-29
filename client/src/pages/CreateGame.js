import React, { useState, useEffect } from "react";
import { getAllPlayers } from "../api/playerAPI"; // 예를 들어, 선수 데이터를 가져오는 API 함수를 import
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Paper, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import { createGame } from "../api/gameAPI";
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
function CreateGame() {

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

    const [formData, setFormData] = useState({
        game_type: "nvm",
        memo: "",
        games: [initialGame],
    });

    const handleAddGame = () => {
        console.log("클릭됨?")
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
                console.log(players)

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
                <div className="p-5">
                    <h2>대전 추가하기</h2>
                    <hr />
                    <label>
                        Game Type:
                        <InputLabel className="mt-1" id="demo-simple-select-label">일대일, 팀전</InputLabel>
                        <Select
                        className="mt-1"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.game_type}
                            label="게임 타입"
                            onChange={(e) =>
                                setFormData({ ...formData, game_type: e.target.value })
                            }
                        >
                            <MenuItem value={'1v1'}>일대일</MenuItem>
                            <MenuItem value={'nvm'}>팀전</MenuItem>
                          
                        </Select>
                    </label>
                    <br />
                    <label>
                        Memo:
                        <input
                            placeholder="대전에 대해 작성    ex) 대학대전"
                            type="text"
                            value={formData.memo}
                            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                        />
                    </label>
                    <br />
                    <button onClick={handleAddGame}>매치 추가</button>
                    <br />
                    {formData.games.map((game, index) => (
                        <div className="mb-3" key={index}>
                            <Grid container spacing={2}>
                                <Grid item xs={5.5}>
                                    <Item>
                                        <Paper>
                                            <Autocomplete
                                                {...defaultProps}
                                                id="auto-complete"
                                                autoComplete
                                                includeInputInList
                                                onChange={(e, newValue) => { handleGameChange(index, 'home', newValue) }}
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Home" variant="standard" />
                                                )}
                                            />
                                        </Paper>
                                        <TextField className="mt-3"
                                            id="outlined-number"
                                            label="배당"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 0.05, // 숫자 간격 설정
                                                min: 1,     // 최소값 설정
                                            }}
                                            onChange={(e) => {
                                                setFormData((prevData) => {
                                                    const updatedGames = [...prevData.games];
                                                    updatedGames[index]['home']['rate'] = e.target.value;
                                                    return { ...prevData, games: updatedGames };
                                                });
                                            }}
                                        />
                                    </Item>

                                </Grid>
                                <Grid item xs={1} display="flex" justifyContent="center" alignItems="center" >
                                    <h2>vs</h2>
                                </Grid>
                                <Grid item xs={5.5}>
                                    <Item>
                                        <Paper>
                                            <Autocomplete
                                                {...defaultProps}
                                                id="auto-complete"
                                                autoComplete
                                                onChange={(e, newValue) => { handleGameChange(index, 'away', newValue) }}
                                                includeInputInList
                                                renderInput={(params) => (
                                                    <TextField {...params} label="Away" variant="standard" />
                                                )}
                                            />
                                        </Paper>
                                        <TextField className="mt-3"
                                            id="outlined-number"
                                            label="배당"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e) => {
                                                setFormData((prevData) => {
                                                    const updatedGames = [...prevData.games];
                                                    updatedGames[index]['away']['rate'] = e.target.value;
                                                    return { ...prevData, games: updatedGames };
                                                });
                                            }}
                                            inputProps={{
                                                step: 0.05, // 숫자 간격 설정
                                                min: 1,     // 최소값 설정
                                            }}
                                        />

                                    </Item>
                                </Grid>

                            </Grid>
                            {/* 또 다른 홈팀과 어웨이팀 필드들을 추가할 수 있습니다 */}
                        </div>
                    ))}
                    <br />
                    <Button onClick={sendData} variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>

                </div>
            </Paper>
            : <>Loading...</>}</>

    );
}

export default CreateGame;
