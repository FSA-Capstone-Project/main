import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';
import { app, auth, db } from "../../firebase";
import { collection, doc, getDoc } from "firebase/firestore";
 
const LiquidGuage = () => {
    const [value, setValue] = useState(0)
    const [progress, setProgress] = useState(0);
    const [goal, setGoal] = useState(0);
    const [percentDone, setPercentDone] = useState(0);
    const today = new Date();
  
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
        setProgress(habitProgress);
        setGoal(goal);
        setPercentDone(Math.round((progress / goal) * 100));
      }
    };
    getData();

    
    const startColor = '#2087f7'; // cornflowerblue
    const endColor = '#2087f7'; // crimson
 

        const radius = 120;
        const interpolate = interpolateRgb(startColor, endColor);
        const fillColor = interpolate(value / 100);
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
                    style={{ margin: '0 auto' }}
                    width={radius * 2}
                    height={radius * 2}
                    value={percentDone}
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
                    onClick={() => {
                        this.setState({ value: Math.random() * 100 });
                    }}
                />
                <div
                    style={{
                        margin: '20px auto',
                        width: 120
                    }}
                >
                </div>
            </div>
        );
    }

export default LiquidGuage
