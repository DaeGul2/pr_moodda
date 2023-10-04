import React, { useState, useEffect } from 'react'
import { Pagination, Card, Container, Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Title from './DashBoard/Title';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TextField from '@mui/material/TextField';

function BettingList({ checkedBettings, setCheckedBettings }) {
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
    }, [betPoints])
    return (
        <div>
            {checkedBettings ?
                <>
                    <Container>
                        <Card className="mt-3 pt-3">
                            <Title>베팅<ShoppingCartIcon></ShoppingCartIcon></Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Pick</TableCell>
                                        <TableCell>vs 상대방</TableCell>
                                        <TableCell>배당</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {checkedBettings.map((row, index) => {
                                        return (
                                            <TableRow key={row.match_id}>
                                                <TableCell>{row.player_name}<CheckCircleIcon></CheckCircleIcon></TableCell>
                                                <TableCell>{row.opponent}</TableCell>
                                                <TableCell>{row.rate}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Card>
                        <span>배 당 : {finalRate}배</span> <p>예상 당첨금액 : {predict}</p>

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
                    </Container>



                </>


                : <>베팅리스트가 비었습니다.</>}
        </div>
    )
}

export default BettingList