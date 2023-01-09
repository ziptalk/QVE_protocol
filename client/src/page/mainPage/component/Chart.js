import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled, { withTheme } from 'styled-components';
import iconCalendar from "../../../assets/icon-Calendar.png";
const ButtonDay = styled.button`
position: absolute;
top: 0px;
bottom: 0px;
left: 0px;
right: 83%;
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

const DayWeekSplit = styled.div`
position: absolute;
left: 16%;
top: 2.5px;
color: white;
background-color: transparent;
`;

const ButtonWeek = styled.button`
position: absolute;
top: 0px;
right: 66.26%;
left: 16.2%;
bottom: 0px;
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
position: absolute;
left: 32.73%;
top: 2.5px;
color: white;
background-color: transparent;
`;

const ButtonMonth = styled.button`
position: absolute;
top: 0px;
right: 50.09%;
left: 33%;
bottom: 0px;
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
const MonthYearSplit = styled.div`
position: absolute;
left: 48.9%;
top: 2.5px;
color: white;
background-color: transparent;
`;
const Button1Year = styled.button`
position: absolute;
top: 0px;
right: 34.82%;
left: 49.2%;
bottom: 0px;
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
position: absolute;
left: 64.17%;
top: 2.5px;
color: white;
background-color: transparent;
`;

const ButtonYtd = styled.button`
position: absolute;
top: 0px;
right: 18%;
left: 64.5%;
bottom: 0px;
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
position: absolute;
left: 81%;
top: 2.5px;
color: white;
background-color: transparent;
`;

const ButtonAll = styled.button`
position: absolute;
top: 0px;
left: 82%;
right: 0px;
bottom: 0px;
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

const ButtonContainer = styled.div`
position: absolute;
width: 85%;
left: 7%;
height: 30px;
top: -30px;
border: 1px solid #B7B8CD;
border-radius: 6px;
box-sizing: border-box;
`;

function getKeyByValue(object, value) {
    return object[value];
  }

function LineChart ({balanceList, pnlArray}){
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
    var dataBalance = [];
    var dataBtc = [];
    var time = [];
    for (let i = 0; i < balanceList.length; i++)
     {
        let valueBalance = pnlArray[i];
        let valueBtc = getKeyByValue(balanceList[i], "btc_price");
        let getTime = getKeyByValue(balanceList[i], "created_at");
        dataBalance.push(valueBalance);
        dataBtc.push(valueBtc);
        time.push(getTime);
     }
     let tmpData = [];
     let tmpData1 = [];
     let tmpData2 = [];
     let tmpXdata = [];
    // if(dataBalance){
        // dataBalance.length
        for (let i = 0; i < dataBalance.length; i++) {
            tmpData1.push(
                dataBalance[i]
            )
            tmpData2.push(
                dataBtc[i]
            )
            tmpData.push(
                {
                    x: new Date(time[i]),
                    y: dataBtc[i]
                }
            )
            tmpXdata.push(time[i])
        }

        if (tmpData1 != undefined) {
            for (let i = 0; i < tmpData1.length; i++) {
            }
        }
     let arr = Object.values(tmpData1);
     let min = Math.min(...arr);
     let max = Math.max(...arr);

        const seriesForm = [
            {
                data: tmpData1,
                type: 'line',
                name: 'QVE',
                color: '#4A3CE8',
                legend: {
                    position: 'left',
                    color: "white",
                }
            },
            {
              data: tmpData2,
            type: 'line',
            name: 'BTC',
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
                    max: 3,
                    min: -6,
                    tickAmount: 5,
                },
                {
                    opposite: true,
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        formatter: function(value) {
                            var val = Math.abs(value)
                            if (val >= 1000) {
                              val = (val / 1000).toFixed(0) + ' K'
                            }
                            return val
                          },
                        style: {
                            colors: '#5C5E81',
                        }
                    },
                    tooltip: {
                        enabled: true,
                    },
                    max: 17000,
                    min: 16200,
                    tickAmount: 1,
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
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    labels: {
                        formatter: function(value) {
                            var val = Math.abs(value)
                            if (val >= 1000) {
                              val = (val / 1000).toFixed(0) + ' K'
                            }
                            return val
                          },
                        style: {
                            colors: '#5C5E81',
                        }
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
        ]
          })
        setXaxis(tmpXdata)
    // }
     setDataBalance(dataBalance)
     setTime(time)
     setDataBtc(dataBtc)
     setChangeDataBalance(true)
}, [balanceList])

const setDataRange = (range) => {
switch (range) {
case 'day':
setChartOptions({
...chartOptions,
xaxis: {
...chartOptions.xaxis,
min: new Date().setDate(new Date(time.at(-1)).getDate() - 1),
max: new Date(time.at(-1)).getTime()
}
})
break
case 'week':
setChartOptions({
...chartOptions,
xaxis: {
...chartOptions.xaxis,
//min: new Date().setDate(new Date(time.at(-1)).getDate() - 7),
min: new Date(time.at(0)).getTime(),
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

return (
<div>
<ReactApexChart style={{position: "absolute", width: '100%', height: '100%',top: '20px'}} type="line" options={chartOptions} series={series} 
/>
<div>
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
</div>
</div>
)
}

export default LineChart;