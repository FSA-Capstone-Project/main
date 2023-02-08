import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { useEffect, useState } from 'react';
import LiquidFillGauge from 'react-liquid-gauge';
import { auth, db, app } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from '@mui/material';
import "./Guage.css";

const LiquidGuage = (props) => {

    const [prog, setProg] = useState(0);
    const [goal, setGoal] = useState(0);
    const [percentDone, setPercentDone] = useState(0)
    const today = new Date();

    useEffect(()=>{
        getData()
    },[])

    const getData = async () => {
      const docRef = doc(
        db,
        "users",
        `${auth.currentUser.email}`,
        "habits",
        `Water`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let habitProgress = docSnap.data().progress;
        let goal = docSnap.data().goal;
        setProg(habitProgress);
        setGoal(goal);
        setPercentDone((prog / goal) * 100)
      }
    };


    const handleAdd = async (number) => {
        setProg(number + 1)
        const docRef = app
        .firestore()
        .collection("users")
        .doc(`${auth.currentUser.email}`)
        .collection("habits")
        .doc(`Water`)
        await docRef.update({progress: prog});
      };

    const startColor = '#7df9ff'; // cornflowerblue
    const endColor = '#2087f7'; // crimson#ADD8E6


        const radius = 120;
        const interpolate = interpolateRgb(startColor, endColor);
        const fillColor = interpolate(prog / goal);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }]


        return (
            <div>
                <LiquidFillGauge
                    style={{ margin: '0 auto'}}
                    width={radius * 2}
                    height={radius * 2}
                    value={(Math.round((prog/goal) * 100))} //
                    percent="%"
                    textSize={1}
                    textOffsetX={0}
                    textOffsetY={0}
                    textRenderer={(props) => {
                        const value = Math.round(props.value);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {
                            fontSize: textPixels
                        };
                        const percentStyle = {
                            fontSize: textPixels * 0.6
                        };

                        return (
                            <tspan>
                                <tspan className="value" style={valueStyle}>{value}</tspan>
                                <tspan style={percentStyle}>{props.percent}</tspan>
                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={1}
                    gradient
                    gradientStops={gradientStops}
                    circleStyle={{
                        fill: fillColor
                    }}
                    waveStyle={{
                        fill: fillColor
                    }}
                    textStyle={{
                        fill: color('#444').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                />
                <div
                    style={{
                        display:'flex',
                        margin: '20px auto',
                        width: 120,
                        justifyContent:"center"
                    }}
                >
                <Button className='addWater'
                    sx={{
                        color:'black',
                        backgroundColor:fillColor,
                    }}
                    onClick={()=>handleAdd(prog)}
                    variant="contained"
                    >Add Water</Button>
                </div>
               
            </div>
        );
    }

export default LiquidGuage
