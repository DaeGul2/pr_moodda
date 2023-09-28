import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Paper, Box, Fab, Stack, Button } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { getGames, updateGame, deleteGame, createGame, deleteMatch } from '../api/gameAPI';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const delGame = (gameId) => {
  try {
    deleteGame(gameId).then(res => console.log(res)).catch(e => alert(e));
    alert('삭제되었습니다.');
    return;
  }
  catch (error) {
    alert(error);
  }
}

const delMatch = (gameId, matchId) => {
  try {
    deleteMatch(gameId, matchId).then(res => console.log(res)).catch(e => alert(e))
    alert('삭제되었습니다.');
    return;
  }
  catch (error) {
    alert(error);
  }
}

function GameAdmin() {
  const [gameType, setGameType] = useState(2);
  const [games, setGames] = useState(null);
  useEffect(() => {
    getGames(1, 10, gameType).then((res) => {
      setGames(res.data.games);
      console.log(res.data.games)

    })
  }, [games])
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">대전타입 선택</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel onClick={() => { console.log() }} value="female" control={<Radio />} label="시작 전" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box >
      <br />
      <Fab color="primary" aria-label="add">
        대전<AddIcon />
      </Fab>
      {
        games ? <>
          {games.map((game, index) => {
            return (
              <Card className='mb-5' key={game._id}>
                <Stack direction={'col'} spacing={2}>
                  <span><h2>{game.memo}</h2></span>
                  <span>
                    <Fab onClick={() => { delGame(game._id) }} color="error" aria-label="delete">
                      삭제
                    </Fab>
                  </span>
                </Stack>
                <p>
                  {game.game_type === 'nvm' ? '단체전' : '개인전'}
                </p>

                {/* {--- 1 대전당 게임 리스트 ---} */}
                {game.games.map((subGame, idx) => {
                  return (
                    <div className='mb-5' key={subGame._id}>
                      <p>게임상태 : {subGame.result}</p>
                      <Card className='gameCard'>
                        <Grid container spacing={2}>
                          <Grid item xs={5.5}>
                            <Item>
                              <p>배당 : {subGame.home.rate}</p>
                              <p> 홈 : {subGame.home.player_name}{`(${subGame.home.player_tear}, ${subGame.home.player_uni})`}</p>
                            </Item>
                          </Grid>
                          <Grid item xs={1}  display="flex" justifyContent="center" alignItems="center" >
                            <h2>vs</h2>
                          </Grid>
                          <Grid item xs={5.5}>
                            <Item>
                              <p>배당 : {subGame.away.rate}</p>
                              <p> 어웨이 : {subGame.away.player_name}{`(${subGame.away.player_tear}, ${subGame.away.player_uni})`}</p>
                            </Item>
                          </Grid>

                        </Grid>
                        <Button onClick={() => { delMatch(game._id, subGame._id) }} variant='outlined' color="error" aria-label="delete">
                          삭제
                        </Button>
                        <Button onClick={() => { delGame(game._id) }} variant='outlined' color="success" aria-label="delete">
                          수정
                        </Button>
                      </Card>
                    </div>
                  )
                })}

              </Card>

            )
          })}
        </> : <>..Loading..</>
      }
    </>
  )
}

export default GameAdmin