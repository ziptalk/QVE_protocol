import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import styled, { withTheme } from "styled-components";

const EContainer = styled.div``;
const ButtonDay = styled.button`
  display: flex;
  align-items: flex-end;
  background-color: transparent;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
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
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  text-align: center;
  border: none;
`;

const WeekMonthSplit = styled.div`
  color: white;
  background-color: transparent;
`;

const ButtonMonth = styled.button`
  background-color: transparent;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
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
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  text-align: center;
  border: none;
`;

const YearYtdSplit = styled.div`
  color: white;
  background-color: transparent;
`;

const ButtonYtd = styled.button`
  background-color: transparent;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
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
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #ffffff;
  text-align: left;
  border: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid #b7b8cd;
  border-radius: 6px;
  box-sizing: border-box;
  height: 30px;
`;

function getKeyByValue(object, value) {
  return object[value];
}

function LineChart({
  balanceList,
  pnlArray,
  secondPort,
  thirdPort,
  selectedOption,
}) {
  const [chartOptionsDay, setChartOptionsDay] = useState("");
  const [chartOptions, setChartOptions] = React.useState({
    xaxis: {
      type: "datetime",
    },
  });
  const [changeDataBalance, setChangeDataBalance] = useState(false);
  const [dataBalance, setDataBalance] = useState([]);
  const [time, setTime] = useState([]);
  const [dataBtc, setDataBtc] = useState([]);
  const [series, setSeries] = useState([
    {
      name: "Data",
      data: [
        {
          x: new Date(),
          y: [],
        },
      ],
    },
  ]);

  const [xaxis, setXaxis] = useState([]);
  useEffect(() => {
    var DataBalance = [];
    var DataBtc = [];
    var Time = [];

    if (selectedOption === "Market Making") {
      for (let i = 0; i < thirdPort.length; i++) {
        let thirdValueBalance = pnlArray[i];
        let thirdValueBtc = getKeyByValue(thirdPort[i], "btc_cr");
        let getThirdTime = getKeyByValue(thirdPort[i], "datetime");
        Time.push(getThirdTime);
        DataBtc.push(thirdValueBtc);
        DataBalance.push(thirdValueBalance);
      }
    }

    if (selectedOption === "Arbitrage") {
      for (let i = 0; i < balanceList.length; i++) {
        let valueBalance = pnlArray[i];
        let FirstValueBtc = getKeyByValue(balanceList[0], "btc_price");
        let valueBtc = getKeyByValue(balanceList[i], "btc_price");
        valueBtc = valueBtc / FirstValueBtc;
        let getTime = getKeyByValue(balanceList[i], "created_at");
        DataBalance.push(valueBalance);
        DataBtc.push(valueBtc);
        Time.push(getTime);
      }
    }

    if (selectedOption === "BTC Hedge") {
      for (let i = 0; i < secondPort.length; i++) {
        let secondValueBalance = pnlArray[i];
        let secondValueBtc = getKeyByValue(secondPort[i], "btc_cr");
        let getSecondTime = getKeyByValue(secondPort[i], "datetime");
        Time.push(getSecondTime);
        DataBalance.push(secondValueBalance);
        DataBtc.push(secondValueBtc);
      }
    }

    if (selectedOption === "Funding Rate") {
      for (let i = 0; i < thirdPort.length; i++) {
        let thirdValueBalance = pnlArray[i];
        let thirdValueBtc = getKeyByValue(thirdPort[i], "btc_cr");
        let getThirdTime = getKeyByValue(thirdPort[i], "datetime");
        Time.push(getThirdTime);
        DataBtc.push(thirdValueBtc);
        DataBalance.push(thirdValueBalance);
      }
    }
    const firstBtcValue = DataBtc[0];
    for (let i = 0; i < DataBtc.length; i++) {
      DataBtc[i] = ((DataBtc[i] - 1) * 100).toFixed(2);
    }
    let tmpData = [];
    let tmpData1 = [];
    let tmpData2 = [];
    let tmpXdata = [];
    // if(dataBalance){
    // dataBalance.length
    for (let i = 0; i < DataBalance.length; i++) {
      tmpData1.push(DataBalance[i]);
      tmpData2.push(DataBtc[i]);
      tmpData.push({
        x: new Date(Time[i]),
        y: DataBtc[i],
      });
      tmpXdata.push(Time[i]);
    }

    if (tmpData1 != undefined) {
      for (let i = 0; i < tmpData1.length; i++) {}
    }
    let min, max;
    let arr1 = Object.values(tmpData1);
    let arr2 = Object.values(tmpData2);
    let min1 = Math.min(...arr1);
    let max1 = Math.max(...arr1);
    let min2 = Math.min(...arr2);
    let max2 = Math.max(...arr2);
    if (min1 > min2) {
      min = min2;
    } else {
      min = min1;
    }

    if (max1 > max2) {
      max = max1;
    } else {
      max = max2;
    }
    max = max + max * 0.2;
    //  min = min + (min * 0.1);
    const seriesForm = [
      {
        data: tmpData1,
        type: "line",
        name: "QVE",
        color: "#4A3CE8",
      },
      {
        data: tmpData2,
        type: "line",
        name: "BTC Index",
        color: "#777777",
      },
    ];
    setSeries(seriesForm);

    if (selectedOption !== "Arbitrage") {
      setChartOptions({
        chart: {
          id: "LineGraph",
          width: "100%",
          height: "100%",
          foreColor: "#B7B8CD",
          toolbar: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
        },
        grid: {
          borderColor: "#5C5E81",
          strokeDashArray: 3,
        },
        legend: {
          position: "top",
          //offsetY: -10,
          offsetX: 0,
        },
        onItemClick: {
          toggleDataSeries: true,
        },
        stroke: {
          show: true,
          curve: "straight",
          lineCap: "butt",
          width: 2,
          dashArray: 0,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
        xaxis: {
          categories: tmpXdata,
          labels: {
            style: {
              colors: "#5C5E81",
            },
          },
          axisTicks: {
            show: false,
          },
          tickAmount: 5,
        },
        yaxis: [
          {
            axisTicks: {
              show: false,
            },
            labels: {
              style: {
                colors: "#5C5E81",
              },
            },
            tooltip: {
              enabled: false,
            },
            max: max,
            min: min,
            tickAmount: 5,
          },
          {
            show: false,
            axisTicks: {
              show: false,
            },
            labels: {
              style: {
                colors: "#5C5E81",
              },
            },
            tooltip: {
              enabled: false,
            },
            max: max,
            min: min,
            tickAmount: 5,
          },
        ],
      });
    } else {
      setChartOptions({
        chart: {
          id: "LineGraph",
          width: "100%",
          height: "100%",
          foreColor: "#B7B8CD",
          toolbar: {
            show: false,
          },
          dataLabels: {
            enabled: false,
          },
        },
        grid: {
          borderColor: "#5C5E81",
          strokeDashArray: 3,
        },
        legend: {
          position: "top",
          //offsetY: -10,
          offsetX: 0,
        },
        onItemClick: {
          toggleDataSeries: true,
        },
        stroke: {
          show: true,
          curve: "straight",
          lineCap: "butt",
          width: 2,
          dashArray: 0,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
        xaxis: {
          categories: tmpXdata,
          labels: {
            style: {
              colors: "#5C5E81",
            },
          },
          axisTicks: {
            show: false,
          },
          tickAmount: 5,
        },
        yaxis: [
          {
            axisTicks: {
              show: false,
            },
            labels: {
              style: {
                colors: "#5C5E81",
              },
            },
            tooltip: {
              enabled: false,
            },
            max: 7,
            min: -1,
            tickAmount: 5,
          },
          {
            axisTicks: {
              show: false,
            },
            labels: {
              style: {
                colors: "#5C5E81",
              },
            },
            tooltip: {
              enabled: false,
            },
            max: max,
            min: min,
            tickAmount: 5,
            opposite: "true",
          },
        ],
      });
    }
    setXaxis(tmpXdata);
    // }
    setDataBalance(DataBalance);
    setTime(Time);
    setDataBtc(DataBtc);
    setChangeDataBalance(true);
  }, [selectedOption]);
  const setDataRange = (range) => {
    switch (range) {
      case "day":
        setChartOptions({
          ...chartOptions,
          xaxis: {
            ...chartOptions.xaxis,
            min: new Date().setDate(new Date(time.at(-1)).getDate() - 1),
            max: new Date(time.at(-1)).getTime(),
          },
        });
        break;
      case "week":
        setChartOptions({
          ...chartOptions,
          xaxis: {
            ...chartOptions.xaxis,
            //min: new Date().setDate(new Date(time.at(-1)).getDate() - 7),
            min: new Date().setDate(new Date(time.at(-1)).getDate() - 7),
            max: new Date(time.at(-1)).getTime(),
          },
        });
        break;
      case "month":
        setChartOptions({
          ...chartOptions,
          xaxis: {
            ...chartOptions.xaxis,
            min: new Date().setDate(new Date(time.at(-1)).getMonth() - 1),
            max: new Date(time.at(-1)).getTime(),
          },
        });
        break;
      case "ytd":
        setChartOptions({
          ...chartOptions,
          xaxis: {
            ...chartOptions.xaxis,
            min: new Date("2023").getTime(),
            max: new Date(time.at(-1)).getTime(),
          },
        });
        break;
      case "1yr":
        setChartOptions({
          ...chartOptions,
          xaxis: {
            ...chartOptions.xaxis,
            min: new Date(time.at(0)).getTime(),
            max: new Date(time.at(-1)).getTime(),
          },
        });
        break;
      case "all":
        setChartOptions({
          ...chartOptions,
          xaxis: {
            min: new Date(time.at(0)).getTime(),
            max: null,
          },
        });
        break;
    }
  };
  //console.log('Date', new Date(time.at(-1)));
  //new Date().setDate(new Date(time.at(-1)).getDate()-1)
  let mp = new Map();
  for (let i = 0; i < pnlArray.length; i++) {
    mp.set(time[i], pnlArray[i]);
  }
  //console.log("MP", mp);
  //console.log("1day", new Date(time.at(-1).getDate()-1));
  const today = new Date();
  const yesterday = new Date(time.at(-1));
  yesterday.setDate(yesterday.getDate() - 1);

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
        {selectedOption === "Arbitrage" ? (
          <>
            <ButtonDay onClick={() => setDataRange("day")}>1D</ButtonDay>
            <DayWeekSplit>|</DayWeekSplit>
            <ButtonWeek onClick={() => setDataRange("week")}>1W</ButtonWeek>
            <WeekMonthSplit>|</WeekMonthSplit>
            <ButtonMonth onClick={() => setDataRange("month")}>1M</ButtonMonth>
            <MonthYearSplit>|</MonthYearSplit>
            <Button1Year onClick={() => setDataRange("1yr")}>1Y</Button1Year>
            <YearYtdSplit>|</YearYtdSplit>
            <ButtonYtd onClick={() => setDataRange("ytd")}>YTD</ButtonYtd>
            <YtdAllSplit>|</YtdAllSplit>
            <ButtonAll onClick={() => setDataRange("all")}>ALL</ButtonAll>
          </>
        ) : (
          <ButtonAll onClick={() => setDataRange("all")}>ALL</ButtonAll>
        )}
      </ButtonContainer>
      <EContainer style={{ height: "11px" }}></EContainer>
      <ReactApexChart
        style={{ display: "flex", margin: "0px 20px 0px 0px" }}
        type="line"
        options={chartOptions}
        series={series}
      />
    </>
  );
}

export default LineChart;
