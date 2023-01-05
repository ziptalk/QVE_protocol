import React, { useState, useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components';
import iconCalendar from "../../../assets/icon-Calendar.png";
const ButtonDay = styled.button`
position: absolute;
top: 0px;
bottom: 0px;
left: 0px;
right: 84.73%;
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
left: 13.17%;
top: 2.5px;
color: white;
background-color: transparent;
`;

const ButtonWeek = styled.button`
position: absolute;
top: 0px;
right: 68.26%;
left: 15%;
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
left: 31.73%;
top: 2.5px;
color: white;
background-color: transparent;
`;

const ButtonMonth = styled.button`
position: absolute;
top: 0px;
right: 52.09%;
left: 31.73%;
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
left: 47.9%;
top: 2.5px;
color: white;
background-color: transparent;
`;
const Button1Year = styled.button`
position: absolute;
top: 0px;
right: 36.82%;
left: 47.90%;
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
left: 63.17%;
top: 2.5px;
color: white;
background-color: transparent;
`;

const ButtonYtd = styled.button`
position: absolute;
top: 0px;
right: 17.96%;
left: 63.17%;
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
left: 82%;
top: 2.5px;
color: white;
background-color: transparent;
`;

const ButtonAll = styled.button`
position: absolute;
top: 0px;
left: 80%;
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
width: 100%;
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
console.log("pnlArray", pnlArray);
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
            xaxis: {
            categories: tmpXdata,
            labels: {
                style: {
                    colors: '#5C5E81',
                }
            },
            },
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
                    max: 3,
                    min: -6,
                    tickAmount: 5,
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
                    max: 20000,
                    min: 10000,
                    tickAmount: 5,
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
            xaxis: {
            categories: tmpXdata,
            labels: {
                style: {
                    colors: '#5C5E81',
                }
            },
            },
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
                    max: 2,
                    min: 1.7,
                    tickAmount: 5,
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
                    max: 20000,
                    min: 10000,
                    tickAmount: 2,
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

return (
<div>
<ReactApexChart type="line" options={chartOptions} series={series} 
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