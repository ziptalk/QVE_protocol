import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled, { withTheme } from 'styled-components';
import iconCalendar from "../../../assets/icon-Calendar.png";

const EContainer = styled.div`

`;
const ButtonDay = styled.button`
display: flex;
align-items: flex-end;
background-color: transparent;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
color: #FFFFFF;
text-align: right;
border: none;
float: right;
`;

const DayWeekSplit = styled.div`

color: white;
background-color: transparent;
`;

const ButtonWeek = styled.button`

background-color: transparent;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
color: #FFFFFF;
text-align: center;
border: none;
`;

const WeekMonthSplit = styled.div`

color: white;
background-color: transparent;
`;

const ButtonMonth = styled.button`

background-color: transparent;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
color: #FFFFFF;
text-align: center;
border: none;
float: center;
`;
const MonthYearSplit = styled.div`

color: white;
background-color: transparent;
`;
const Button1Year = styled.button`
background-color: transparent;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
color: #FFFFFF;
text-align: center;
border: none;
`;

const YearYtdSplit = styled.div`

color: white;
background-color: transparent;
`;

const ButtonYtd = styled.button`

background-color: transparent;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
color: #FFFFFF;
text-align: center;
border: none;
`;

const YtdAllSplit = styled.div`
color: white;
background-color: transparent;
font-size: 20px;
display: flex;
justify-content: flex-start;
`;

const ButtonAll = styled.button`
background-color: transparent;
font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
color: #FFFFFF;
text-align:left;
border: none;
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
margin-left: 20px;
margin-right: 20px;
border: 1px solid #B7B8CD;
border-radius: 6px;
box-sizing: border-box;
`;

function getKeyByValue(object, value) {
    return object[value];
  }

function LineChart ({balanceList, pnlArray, secondPort, thirdPort, selectedOption}){
const [chartOptionsDay, setChartOptionsDay] = useState('');
const [chartOptions, setChartOptions] = React.useState({
xaxis: {
type: 'datetime'
}
})
const [changeDataBalance, setChangeDataBalance] = useState(false)
const [dataBalance, setDataBalance] = useState([]);
const [time, setTime]  = useState([])
const [dataBtc, setDataBtc] = useState([])
const [series, setSeries] = useState([{
    name: 'Data',
    data: [{
       x: new Date(),
    y: []
    }]
}])

const [xaxis, setXaxis] = useState([])
useEffect(()=>{
    var DataBalance = [];
    var DataBtc = [];
    var Time = [];
    if (selectedOption === 'Portfolio 01') {
        DataBalance = [];
        Time = [];
        for (let i = 0; i < balanceList.length; i++)
         {
            let valueBalance = pnlArray[i];
            let valueBtc = getKeyByValue(balanceList[i], "btc_price");
            let getTime = getKeyByValue(balanceList[i], "created_at");
            DataBalance.push(valueBalance);
            DataBtc.push(valueBtc);
            Time.push(getTime);
         }
        } 
        
        if (selectedOption === 'Portfolio 02') {
            DataBalance = [];
            Time = [];
            for (let i = 0; i < secondPort.length; i++) {
                let secondValueBalance = pnlArray[i];
                let getSecondTime = getKeyByValue(secondPort[i], 'datetime')
                Time.push(getSecondTime);
                DataBalance.push(secondValueBalance);
            }
        }

        if (selectedOption === 'Portfolio 03') {
            DataBalance = [];
            Time = [];
            for (let i = 0; i < thirdPort.length; i++) {
                let thirdValueBalance = pnlArray[i];
                let getThirdTime = getKeyByValue(thirdPort[i], 'datetime');
                Time.push(getThirdTime);
                DataBalance.push(thirdValueBalance);
            }
        }
     const firstBtcValue = DataBtc[0];
     //console.log('balanceList', balanceList);
     for (let i = 0; i < balanceList.length; i++) {
        DataBtc[i] = (((DataBtc[i] / firstBtcValue) - 1 ) * 100).toFixed(2);
     }
     let tmpData = [];
     let tmpData1 = [];
     let tmpData2 = [];
     let tmpXdata = [];
    // if(dataBalance){
        // dataBalance.length
        for (let i = 0; i < DataBalance.length; i++) {
            tmpData1.push(
                DataBalance[i]
            )
            tmpData2.push(
                DataBtc[i]
            )
            tmpData.push(
                {
                    x: new Date(Time[i]),
                    y: DataBtc[i]
                }
            )
            tmpXdata.push(Time[i])
        }

        if (tmpData1 != undefined) {
            for (let i = 0; i < tmpData1.length; i++) {
            }
        }
     let arr = Object.values(tmpData2);
     let min = Math.min(...arr);
     let max = Math.max(...arr);

        const seriesForm = [
            {
                data: tmpData1,
                type: 'line',
                name: 'QVE',
                color: '#4A3CE8',
            },
            {
              data: tmpData2,
            type: 'line',
            name: 'BTC Index',
            color: '#777777'
            }
          ]
        setSeries(
        
          seriesForm
          )
          setChartOptions({
            
            chart: {
                id: 'LineGraph',
                width: '100%',
                height: '100%',
                foreColor: '#B7B8CD',
                toolbar: {
                  show: false
                },
                dataLabels: {
                    enabled: false
                },
              },
              grid: {
                borderColor: '#5C5E81',
                strokeDashArray: 3,
              },
              legend: {
                position: 'top',
                //offsetY: -10,
                offsetX: 0 
              },
              onItemClick: {
                toggleDataSeries: true
            },
            stroke: {
                show: true,
                curve: 'straight',
                lineCap: 'butt',
                width: 2,
                dashArray: 0,      
            },
            onItemHover: {
                highlightDataSeries: true
            },
            xaxis: {
            categories: tmpXdata,
            labels: {
                style: {
                    colors: '#5C5E81',
                }
            },
            axisTicks: {
                show: false,
            },
            },
            yaxis: 
            [
                {
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        style: {
                            colors: '#4A3CE8',
                        }
                    },
                    tooltip: {
                        enabled: false
                    },
                    max: max,
                    min: min,
                    tickAmount: 5,
                },
                {
                    tooltip: {
                        enabled: true,
                    },
                    show: false,

                },
        ]
          })

          setChartOptionsDay({
            chart: {
                id: 'LineGraph',
                toolbar: {
                  show: false
                },
                dataLabels: {
                    enabled: false
                },
              },
              legend: {
                position: 'top',
              },
              onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            },
            xaxis: [{
                axisTicks: {
                    show: false,
                },
            categories: tmpXdata,
            labels: {
                style: {
                    colors: '#5C5E81',
                }
            },
            },
        ],
            yaxis: 
            [
                {
                    axisTicks: {
                        show: true,
                    },
                    labels: {
                        style: {
                            colors: '#4A3CE8',
                        }
                    },
                    tooltip: {
                        enabled: true
                    },
                },
                {
                   
                    labels: {
                        
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
        ]
          })
        setXaxis(tmpXdata)
    // }
     setDataBalance(DataBalance)
     setTime(Time)
     setDataBtc(DataBtc)
     setChangeDataBalance(true)
}, [selectedOption  ])

const setDataRange = (range) => {
switch (range) {
case 'day':
setChartOptions({
...chartOptions,
xaxis: {
...chartOptions.xaxis,
min: new Date().setDate(new Date(time.at(-1)).getDate()-1),
max: new Date(time.at(-1)).getTime(),
}
})
break
case 'week':
setChartOptions({
...chartOptions,
xaxis: {
...chartOptions.xaxis,
//min: new Date().setDate(new Date(time.at(-1)).getDate() - 7),
min: new Date().setDate(new Date(time.at(-1)).getDate() - 7),
max: new Date(time.at(-1)).getTime()
}
})
break
case 'month':
setChartOptions({
...chartOptions,
xaxis: {
...chartOptions.xaxis,
min: new Date().setDate(new Date(time.at(-1)).getMonth() - 1),
max: new Date(time.at(-1)).getTime()
}
})
break
case 'ytd':
setChartOptions({
...chartOptions,
xaxis: {
...chartOptions.xaxis,
min: new Date("2023").getTime(),
max: new Date(time.at(-1)).getTime()
}
})
break
case '1yr':
    setChartOptions({
        ...chartOptions,
        xaxis: {
        ...chartOptions.xaxis,
        min: new Date(time.at(0)).getTime(),
        max: new Date(time.at(-1)).getTime()
        }
        })
        break
case 'all':
setChartOptions({
...chartOptions,
xaxis: {
min: new Date(time.at(0)).getTime(),
max: null
}
})
break
}
}
//console.log('Date', new Date(time.at(-1)));
//new Date().setDate(new Date(time.at(-1)).getDate()-1)
let mp = new Map();
for (let i = 0; i < pnlArray.length; i++) {
    mp.set(time[i], pnlArray[i]);
}
//console.log("MP", mp);
//console.log("1day", new Date(time.at(-1).getDate()-1));
const today = new Date()
const yesterday = new Date(time.at(-1));
yesterday.setDate(yesterday.getDate() - 1)

//console.log(today.toDateString());
//console.log(yesterday.toDateString());

// //console.log(mp.values());
// console.log('TimeLength', time.length);
// console.log('DataLength', dataBalance.length);
// console.log('DataBTcLength', dataBtc.length);
// console.log('selectPortfolio', selectedOption);
return (
<>
<ButtonContainer>
<ButtonDay onClick={() => setDataRange('day')}>1D</ButtonDay>
<DayWeekSplit>|</DayWeekSplit>
<ButtonWeek onClick={() => setDataRange('week')}>1W</ButtonWeek>
<WeekMonthSplit>|</WeekMonthSplit>
<ButtonMonth onClick={() => setDataRange('month')}>1M</ButtonMonth>
<MonthYearSplit>|</MonthYearSplit>
<Button1Year onClick={() => setDataRange('1yr')}>1Y</Button1Year>
<YearYtdSplit>|</YearYtdSplit>
<ButtonYtd onClick={() => setDataRange('ytd')}>YTD</ButtonYtd>
<YtdAllSplit>|</YtdAllSplit>
<ButtonAll onClick={() => setDataRange('all')}>ALL</ButtonAll>
</ButtonContainer>
<EContainer style={{height: '11px'}}></EContainer>
<ReactApexChart style={{display: 'flex', margin: '0px 20px 0px 0px'}} type="line" options={chartOptions} series={series} 
/>
</>


)
}

export default LineChart;