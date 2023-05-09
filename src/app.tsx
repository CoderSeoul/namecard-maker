import { useState, useMemo, useRef } from 'react'
import parse from 'html-react-parser'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { CardContent, TextField, Card, CardActions } from '@mui/material'
import Button from '@mui/material/Button'
interface IForm {
  name: string;
  department: string;
  position: string;
  smartphone: string;
  mail: string;
  call: string;
  fax: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}))

const makeHtml = ({
  name,
  department,
  position,
  smartphone,
  mail,
  call,
  fax,
}: IForm) => {
  return `
  <table cellpadding="0" cellspacing="0" style="max-width:800px;vertical-align: -webkit-baseline-middle; ; font-family: NanumSquare,Arial;width:100%;"> <tbody> <tr> <td> <div></div></td><td style="padding: 5px; vertical-align: middle;"> <p style="margin: 0px; font-size: 16px; color:#060403 ; font-weight: bold;">${department}</p><p style="margin: 0px; font-size: 28px; color:#060403 ; letter-spacing: 10; font-weight: 1000; margin-top: 5;"> <small style="margin: 0px; font-size: 16px; color:#060403 ;margin-right:10px;font-weight: bold;">${position}</small> <span>${name}</span> </p><table cellpadding="0" cellspacing="0" style="vertical-align: -webkit-baseline-middle; font-family: NanumSquare,Arial;width:100%;max-width:100vw;"> <tbody> <tr> <td height="20"></td></tr><tr> <td height="5"></td></tr><tr style="position:relative;display:bltable-rowock;width:100%;"> <td height="4" style="width:50%; background: #F16973;"></td><td height="4" style="width:50%; background: #EE2A4E;"></td></tr><tr> <td height="30" width="">15880 군포시군포첨단산업2로22번길5</td></tr></tbody> </table> <table cellpadding="0" cellspacing="0" style="vertical-align: -webkit-baseline-middle; ; font-family: NanumSquare,Arial;display:flex;margin-top:20px;"> <tbody style="width:100%"> <tr style="vertical-align: middle;height:30px;"> <td style="width: 30; vertical-align: middle;"> <table cellpadding="0" cellspacing="0" style="margin: 0 auto; vertical-align: -webkit-baseline-middle; ; font-family: NanumSquare,Arial;"> <tbody style="width:300px;"> <tr> <td style="vertical-align: bottom;"> <span width="30" style="display: block;margin-right: 1.5px;"> <img alt="" style="margin-bottom: -3px;" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlcHHx%2FbtsdRSATlC5%2FEhKv7gr58M4BErpsmHEG41%2Ftfile.svg" alt="smartphone"/> </span> </td></tr></tbody> </table> </td><td style="padding: 0px; color:#060403 ;color:#060403 ; font-size: 16px;"> <span style="margin-left:5px;">${smartphone}</span> </td></tr><tr style="vertical-align: middle;height:30px;"> <td width="30" style="vertical-align: middle;"> <table cellpadding="0" cellspacing="0" style="margin: 0 auto; vertical-align: -webkit-baseline-middle; ; font-family: NanumSquare,Arial;"> <tbody> <tr> <td style="vertical-align: bottom;"> <span width="30" style="display: block;"> <img style=" margin-top: 5px;" alt="" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmoUnu%2FbtsdQJqU5NS%2F84wE1cbVSpxoJK6bfCOmt1%2Ftfile.svg" alt="mail"/> </span> </td></tr></tbody> </table> </td><td style="padding: 0px; color:#060403 ;color:#060403 ; font-size: 16px;"> <span style="margin-left:5px;">${mail}</span> </td></tr><tr style="vertical-align: middle;height:30px;"> <td width="30" style="vertical-align: middle;"> <table cellpadding="0" cellspacing="0" style="margin: 0 auto; vertical-align: -webkit-baseline-middle; ; font-family: NanumSquare,Arial;"> <tbody> <tr> <td style="vertical-align: bottom"> <span width="30" style="display: block;"> <img style=" margin-bottom: -1px; " alt="" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbDzsJD%2FbtsdOMh7XDR%2FbFLAUf2CqibnAMZz5FoOU1%2Ftfile.svg" alt="call"/> </span> </td></tr></tbody> </table> </td><td style="padding: 0px; color:#060403 ;color:#060403 ; font-size: 16px;"> <span style="margin-left:5px;">${call}</span> </td></tr><tr style="vertical-align: middle;height:30px;"> <td width="30" style="vertical-align: middle;"> <table cellpadding="0" cellspacing="0" style="margin: 0 auto; vertical-align: -webkit-baseline-middle; ; font-family: NanumSquare,Arial;"> <tbody> <tr> <td style="vertical-align: bottom"> <span width="30" style="display: block;"> <img style="margin-top:2px;" alt="" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcKpbEl%2FbtsdRhnnEiL%2FLa40OtxxpZUxTpzfGXfq6k%2Ftfile.svg" alt="fax"/> </span> </td></tr></tbody> </table> </td><td style="padding: 0px; color:#060403 ;color:#060403 ; font-size: 16px;"> <span style="margin-left:5px;">${fax}</span> </td></tr></tbody> <tbody style="width:30%"> <tr style="float:right;"> <td> <img alt="" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FVVMW2%2FbtsdQfKlxXy%2FgQBaE5fkCve7NEdHi4PAs0%2Fimg.png" alt="alt_text" class="center-on-narrow" style="width: 100%; max-width: 142px; height: auto; font-family: sans-serif; font-size: 15px; line-height: 20px; color: #555555;margin-right: 20px;"/> </td></tr></tbody> </table> </td></tr></tbody> </table>
   `
}

export function App () {
  const [info, setInfo] = useState<IForm>({
    name: '홍길동',
    department: '미래기획부/혁신기획팀',
    position: '대리',
    smartphone: '010-****-****',
    mail: 'gunpouc@gunpouc.or.kr',
    call: '031-390-7600',
    fax: '031-390-7670',
  })
  const [html, setHtml] = useState(makeHtml(info))

  const handleEdit = () => {
    setHtml(makeHtml(info))
  }
  const handleInputChange = (key: string, value: string) => {
    setInfo((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const tt = useMemo(() => <Item>{parse(html)}</Item>, [html])
  return (
    <Box sx={{ flexGrow: 1, pt: 5, padding: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          {' '}
          <TextField
            label='이름'
            fullWidth
            onChange={(event) => {
              handleInputChange('name', event.target.value)
            }}
            value={info.name}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            label='부서'
            fullWidth
            onChange={(event) => {
              handleInputChange('department', event.target.value)
            }}
            value={info.department}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            label='직급'
            fullWidth
            onChange={(event) => {
              handleInputChange('position', event.target.value)
            }}
            value={info.position}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label='휴대폰번호'
            fullWidth
            onChange={(event) => {
              handleInputChange('smartphone', event.target.value)
            }}
            value={info.smartphone}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label='이메일'
            fullWidth
            onChange={(event) => {
              handleInputChange('mail', event.target.value)
            }}
            value={info.mail}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label='팩스'
            fullWidth
            onChange={(event) => {
              handleInputChange('fax', event.target.value)
            }}
            value={info.fax}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label='전화번호'
            fullWidth
            onChange={(event) => {
              handleInputChange('call', event.target.value)
            }}
            value={info.fax}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' onClick={handleEdit} sx={{ width: '30%', minWidth: 200, float: 'right' }}>
            입력정보 반영하기
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ padding: 1, bgcolor: '#060403' }}>
              {tt}
            </CardContent>
            <CardActions>
              위의 검은영역을 모두 드래그해서 복사하세요.
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
