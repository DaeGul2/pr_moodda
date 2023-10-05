import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import { Grid, Modal, Paper, Fab, Stack, Button, Box, ButtonGroup, Pagination } from '@mui/material'
import { styled } from '@mui/material/styles';
import { getGames, updateMatch, deleteGame, deleteMatch } from '../api/gameAPI';
import dayjs from 'dayjs';







function formatDate(inputDate) {
    const formattedDate = dayjs(inputDate).format('YYYY-MM-DD HH:mm');
    return formattedDate;
}

/**-----커스텀 스타일-------------- */
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const HoverablePaper = styled(Paper)(({ theme, isBettingEnabled }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    transition: 'background-color 0.3s', // hover 효과를 위한 배경색 전환
    backgroundColor: isBettingEnabled ? '#e0e0e0' : 'inherit', // active 상태에 따라 배경색 변경
    '&:hover': {
        backgroundColor: isBettingEnabled ? '#e0e0e0' : '#f0f0f0', // hover 시 배경색 변경
    },
}));
/*----------------------*/


function Betting({ checkedBettings, setCheckedBettings }) {

    /**--베팅 Modal창--- */
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false) };
    /*------------------*/




    /**------game 불러오기------ */
    const [games, setGames] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    useEffect(() => {
        getGames(1, 10).then((res) => {
            setGames(res.data.games);
            setTotalPlayerPage(res.totalPages);
        })
    }, [isChanged])
    /**------------ */



    /** -- 베팅 체크 --*/

    const [isActive, setIsActive] = useState(false);
    /** --------------*/


    /**--- 베팅리스트 핸들링 ---- */

    const validateCheck = (match_id) => {
        const foundBetting = checkedBettings.find((betting) => betting.match_id === match_id);

        // foundBetting은 일치하는 요소 또는 undefined일 수 있음
        return foundBetting;
    }

    // 베팅 리스트에 추가하는 작업 여기에 쓰면됨.
    const handleAddBettingClick = (info) => {
        // 새로운 베팅 정보 객체 생성
        if (validateCheck(info.match_id)) {
            alert('이미 존재하는 경기입니다.')
            return;
        }
        const newBet = {
            match_id: info.match_id,
            selected_team: info.selected_team,
            player_name: info.player_name,
            rate: info.rate,
            opponent: info.opponent
        };

        // 기존의 checkedBettings 배열과 새로운 베팅 정보를 합친 새 배열 생성
        const updatedBettings = [...checkedBettings, newBet];
        console.log(updatedBettings)

        // setCheckedBettings 함수를 사용하여 새로운 배열로 업데이트
        setCheckedBettings(updatedBettings);
        alert('추가되었습니다.');
    }

    const handleDeleteBettingClick = (index) => {

    }

    /**--------------------- */


    /**페이지네이션 */
    const [perPage, setPerPage] = useState(10);
    const [totalPlayerPage, setTotalPlayerPage] = useState(100);
    const [currentPlayerPage, setCurrentPlayerPage] = useState(1);
    const handleChange = (event, value) => {
        setCurrentPlayerPage(value);
    };
    /*---*/




    return (
        <Paper className='p-3'>

            {
                games ? <>
                    {games.map((game, index) => {
                        return (
                            <Card className='mb-5' key={game._id}>
                                <Stack className='p-2' direction={'column'} spacing={2}>
                                    <span><h2>{game.memo}</h2></span>
                                    <hr />
                                </Stack>
                                <span>
                                    {game.game_type === 'nvm' ? '단체전' : '개인전'}
                                </span>


                                {/* {--- 1 대전당 게임 리스트 ---} */}
                                {game.games.map((subGame, idx) => {
                                    const isBettingEnabled = subGame.result === 2;

                                    return (
                                        <Paper elevation={5} key={subGame._id}>
                                            <div className='mb-5' >
                                                <span>{isBettingEnabled ? <Chip label="시작 전" color="success" /> : subGame.result === 1 ? <Chip label="진행중" color="warning" /> : <Chip label="종료" color="error" />}</span>
                                                <span>{formatDate(subGame.createdAt) + " 생성됨"}</span>

                                                <Card className='gameCard'>
                                                    <Grid container spacing={2}>

                                                        <Grid item xs={5.5}>
                                                            <HoverablePaper
                                                                onClick={() => {
                                                                    if (isBettingEnabled) {
                                                                        handleAddBettingClick({
                                                                            match_id: subGame._id,
                                                                            selected_team: "home",
                                                                            opponent: subGame.away.player_name,
                                                                            player_name: subGame.home.player_name,
                                                                            rate: subGame.home.rate,
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                {!isBettingEnabled ? (
                                                                    <p style={{ color: 'red', fontWeight: 'bold' }}>베팅불가</p>
                                                                ) : (
                                                                    <p style={{ color: 'green', fontWeight: 'bold' }}>베팅가능</p>
                                                                )}
                                                                <p>배당 : {subGame.home.rate}</p>
                                                                <p> 홈 : {subGame.home.player_name}{`(${subGame.home.player_tear}, ${subGame.home.player_uni})`}</p>
                                                            </HoverablePaper>

                                                        </Grid>

                                                        <Grid item xs={1} display="flex" justifyContent="center" alignItems="center" >
                                                            <h2>vs</h2>
                                                        </Grid>
                                                        <Grid item xs={5.5}>

                                                            <HoverablePaper isBettingEnabled={!isBettingEnabled} onClick={() => { 
                                                                 if (isBettingEnabled) {
                                                                handleAddBettingClick({ match_id: subGame._id, selected_team: "away", opponent: subGame.home.player_name, player_name: subGame.away.player_name, rate: subGame.away.rate }) }}}>
                                                                {!isBettingEnabled ? <p style={{ color: 'red', fontWeight: 'bold' }}>베팅불가</p> : <p style={{ color: 'green', fontWeight: 'bold' }}>베팅가능</p>}
                                                                <p>배당 : {subGame.away.rate}</p>
                                                                <p> 어웨이 : {subGame.away.player_name}{`(${subGame.away.player_tear}, ${subGame.away.player_uni})`}</p>
                                                            </HoverablePaper>
                                                        </Grid>
                                                    </Grid>
                                                    <Button onClick={handleOpen} disabled={!isBettingEnabled}>베팅</Button>
                                                </Card>
                                            </div>
                                        </Paper>
                                    )
                                })}

                            </Card>

                        )
                    })}
                    <Stack spacing={2}>
                        <Pagination count={totalPlayerPage} page={currentPlayerPage} onChange={handleChange} />
                    </Stack>
                </> : <>..Loading..</>
            }
        </Paper>
    )
}

export default Betting