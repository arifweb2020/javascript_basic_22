/**
 * Progress bar component
 * Aithor: Arif
 */
import React from 'react';
import { HeadingTypography, RatingTypography, ProgressBox, ProgressContainer } from './ProgressBar.css'
import { Box, Grid } from "@mui/material";
import RatingBtn from './../average-button/RatingBtn';

let ratings = {
    points: 8,
    colorCode: [
        {
            value: 20,
            color: '#fb6f6f'
        },
        {

            value: 20,
            color: '#ff9c6f'
        },
        {

            value: 20,
            color: '#f8e56e'
        },
        {

            value: 20,
            color: '#95542e'
        },
        {

            value: 20,
            color: '#7a5239'
        }
    ]
}

/**
 * This component is showing rating points and progress bar.
 * @param {*} props 
 * @returns ProgressBar Component
 */
function ProgressBar(props) {
    return (
        <ProgressContainer>
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Box>
                        <HeadingTypography>My FIRST Rating</HeadingTypography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <RatingTypography>{ratings.points}<span>/10</span></RatingTypography>
                        <RatingBtn
                            bgColor={
                                ratings.points <= 2 ? "#FB6F6F" :
                                    ratings.points <= 4 ? "#ff9c6f" :
                                        ratings.points <= 6 ? "#d1451a" :
                                            ratings.points <= 8 ? "#BCCF57" :
                                                ratings.points <= 10 ? "#79D17E" : null

                            }
                            btnText={
                                ratings.points <= 2 ? "POOR" :
                                    ratings.points <= 4 ? "BAD" :
                                        ratings.points <= 6 ? "AVERAGE" :
                                            ratings.points <= 8 ? "GOOD" :
                                                ratings.points <= 10 ? "EXCELLENT" : null
                            }
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}
className={
                        ratings.points === 10 ? "mTop" :
                            ratings.points === 0 ? "mTop" :
                                "bTop"}
				>
                    {
                        ratings.points === 10 ? null :
                            ratings.points === 0 ? null :
                                <div style={{ color: '#fff', 'width': ratings.points + '0%' }} >
                                    <div className="line">
                                        <p>{ratings.points}</p></div>
                                </div>
                    }
                    <ProgressBox>
                        {ratings.colorCode.map((items, i) => {
                            return (
                                <div className="bar" style={{ 'backgroundColor': items.color, 'width': items.value + '%' }} key={i}>
                                </div>
                            )
                        })
                        }
                    </ProgressBox>

                    <div style={{
                        display: "flex", justifyContent: "space-between", color: "#fff", width:
                            "100%"
                    }}>
                        <div style={{fontSize:"9px",fontFamily:"Inter",position:"relative",top:"5px"}}>0</div>
                        <div style={{fontSize:"9px",fontFamily:"Inter",position:"relative",top:"5px"}}>10</div>
                    </div>
                </Grid>
            </Grid>

        </ProgressContainer>
    );
}

export default ProgressBar;

// css

import { Box, Typography } from "@mui/material";
import styled from "styled-components";

export const ProgressContainer = styled(Box)`

.line{
    display:flex;
    justify-content:flex-end;
    border-right: 4px solid #fff;
    height: 25px;
    position: relative;
    top: 20px;
    animation-name: example;
  animation-duration: 6s;
  @keyframes example {
    0% { width: 0; }
    100% { width: 100%; }  
  }

    & p{
        position: relative;
    top: 27px;
    left: 6px;
    font-size:12px;
    }
}
.mTop{
    margin-top:16px;
}
.bTop{
    margin-top:-10px;
}
`
export const HeadingTypography = styled(Typography)`
color: #FFFFFF ;
font-family: Inter !important;
font-size: 12px !important;
font-weight: 600 !important;
letter-spacing: 0 !important;
line-height: 18px !important;
`

export const RatingTypography = styled(Typography)`
    font-size:28px !important;
    font-family: Inter !important;
    color : #fff;
    font-weight: bold !important;
    span{
        opacity: 0.5;
    }
`
export const ProgressBox = styled(Box)`
display: flex;
height: 1rem;
overflow: hidden;
font-size: .75rem;
background-color: #e9ecef;
border-radius: 10px;

`

// new progress bar

<div class="progress">
  <div class="progress-value"></div>
</div>

body {
  justify-content: center;
  align-items: center;
  background: #000;
  display: flex;
  height: 100vh;
  padding: 0;
  margin: 0;
}

.progress {
  background: rgba(255,255,255,0.1);
  justify-content: flex-start;
  border-radius: 100px;
  align-items: center;
  position: relative;
  padding: 0 5px;
  display: flex;
  height: 40px;
  width: 500px;
}

.progress-value {
  animation: load 3s normal forwards;
  box-shadow: 0 10px 40px -10px #fff;
  border-radius: 100px;
  background: #fff;
  height: 30px;
  width: 0;
}

@keyframes load {
  0% { width: 0; }
  100% { width: 68%; }
}
