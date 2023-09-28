import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import { Grid, Paper, Box, Fab, Stack, Button } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { getGames, updateGames, deleteGames, createGames } from '../api/gameAPI';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

const deleteGame = (gameId) => {

}

function GameAdmin() {
  const [games, setGames] = useState(null);
  useEffect(() => {
    getGames(1, 10, 2).then((res) => {
      setGames(res.data.games);
      console.log(res.data.games)

    })
  }, [])
  return (
    <>
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
                    <Fab onClick={() => { deleteGame(game._id) }} color="error" aria-label="delete">
                      삭제
                    </Fab>
                  </span>
                </Stack>
                <p>
                  {game.game_type === 'nvm' ? '단체전' : '개인전'}
                </p>
                <hr />
                {/* {--- 1 대전당 게임 리스트 ---} */}
                {game.games.map((subGame, idx) => {
                  return (
                    <div key={subGame._id}>
                      <Card className='gameCard'>
                        <Stack direction="row" spacing={2}>
                          <DemoPaper variant="elevation">
                            <p>배당 : {subGame.home.rate}</p>
                            <p> 홈 : {subGame.home.player_name}{`(${subGame.home.player_tear}, ${subGame.home.player_uni})`}</p>
                          </DemoPaper>
                          <DemoPaper variant="elevation">
                            <p>배당 : {subGame.away.rate}</p>
                            <p> 어웨이 : {subGame.away.player_name}{`(${subGame.away.player_tear}, ${subGame.away.player_uni})`}</p>
                          </DemoPaper>
                          <Button onClick={() => { deleteGame(game._id) }} variant='outlined' color="error" aria-label="delete">
                            삭제
                          </Button>
                          <Button onClick={() => { deleteGame(game._id) }} variant='outlined' color="success" aria-label="delete">
                            수정
                          </Button>
                        </Stack>
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