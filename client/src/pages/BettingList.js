import React, { useState, useEffect } from 'react'
import { Pagination, Badge, Card, Container, Table, TableBody, TableCell, TableHead, TableRow, Stack, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Title from './DashBoard/Title';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { createBetting } from '../api/bettingAPI';

function BettingList({ checkedBettings, setCheckedBettings }) {
    const [userInfo, setUserInfo] = useState({user_id:"65133996f7f3bbbdea977b19",points:30000});
    const [isChanged, setIsChanged] = useState(false);
    const [finalRate, setFinalRate] = useState(1);
    const [predict, setPredict] = useState('');
    const [betPoints,setBetPoints] = useState(0);
    useEffect(() => {
        let totalRate = 1; // 초기값을 1로 설정하여 누적 곱을 계산하기 위함

        for (const betting of checkedBettings) {
            const rate = parseFloat(betting.rate); // rate 속성을 숫자로 변환
            if (!isNaN(rate)) {
                // 변환한 값이 유효한 숫자인 경우에만 누적 곱에 곱함
                totalRate *= rate;
            }
        }
        const formattedTotalRate = totalRate.toFixed(2);

        // 문자열을 다시 숫자로 변환
        setFinalRate( parseFloat(formattedTotalRate));
        setPredict(finalRate*betPoints)

    }, [betPoints, isChanged])

    function removeCheckedBettingByMatchId(matchId) {
        // checkedBettings 배열에서 match_id가 matchId인 요소의 인덱스를 찾습니다.
        const index = checkedBettings.findIndex((betting) => betting.match_id === matchId);
      
        // 요소를 찾았다면 해당 요소를 삭제합니다.
        if (index !== -1) {
          checkedBettings.splice(index, 1);
          setIsChanged(!isChanged);
        }
      
        // 변경된 배열을 반환합니다.
        return checkedBettings;
      }




    /*--베팅 등록 API-*/
      const createBet = async ()=>{
        if(betPoints<1000){
            alert('기본 1000포인트 이상 베팅해야합니다.');
            return;
        }
        if(betPoints>userInfo.points){
            alert('보유하고 있는 포인트보다 많은 금액을 베팅할 수 없습니다.');
            return;
        }
        
        const newBet = {
            sub_bettings : checkedBettings,
            predict: predict
        }
        
        try{
            const response = await createBetting(userInfo.user_id, betPoints, newBet);
            alert('베팅 완료');
            setCheckedBettings([]);
            setPredict('');
            setBetPoints(0);
            setIsChanged(!isChanged);
            setFinalRate(1);

        }
        catch(e){alert(e)}


      }


    /*------------------------*/

    return (
        <div>
            {checkedBettings.length>0 ?
                <>
                    <Container>
                        <Card className="mt-3 pt-3">
                            <Title>베팅<ShoppingCartIcon></ShoppingCartIcon> </Title>
                            <span style={{fontWeight:'bold',color:'blue'}}>보유 : {userInfo.points}p</span>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pick</TableCell>
                                        <TableCell>vs 상대방</TableCell>
                                        <TableCell>배당</TableCell>
                                        <TableCell>삭제</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {checkedBettings.map((row, index) => {
                                        return (
                                            <TableRow key={row.match_id}>
                                                <TableCell>{row.player_name}<CheckCircleIcon></CheckCircleIcon></TableCell>
                                                <TableCell>{row.opponent}</TableCell>
                                                <TableCell>{row.rate}</TableCell>
                                                <TableCell><Button color='error' onClick={()=>{removeCheckedBettingByMatchId(row.match_id)}}><DeleteForeverSharpIcon></DeleteForeverSharpIcon></Button></TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Card>
                        <span>배 당 : {finalRate}배</span> <p>예상 당첨금액 : {Math.round(predict)}p</p>

                        <TextField
                            id="outlined-number"
                            label="Number"
                            type="number"
                            value={betPoints}
                            onChange={(e)=>{setBetPoints(e.target.value)}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                       <Button onClick={()=>{createBet()}} color="success">베팅</Button>
                    </Container>



                </>


                : <>베팅리스트가 비었습니다.</>}
        </div>
    )
}

export default BettingList