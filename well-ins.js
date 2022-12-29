


  const getUTCnow = () => {
    const endDateLocal = new Date(new Date().toDateString());
    // endDateLocal.setDate(endDateLocal.getDate());
    // const endDateUTC = new Date(
    //   endDateLocal.getUTCFullYear(),
    //   endDateLocal.getUTCMonth(),
    //   endDateLocal.getUTCDate(),
    //   endDateLocal.getUTCHours(),
    //   endDateLocal.getUTCMinutes(),
    //   endDateLocal.getUTCSeconds()
    // );
    return endDateLocal.getTime();
  };

  const getUTCStartDate = (startDay) => {
    var startDateLocal = new Date(new Date().toDateString());
    startDateLocal.setDate(startDateLocal.getDate() - startDay);

    // const startDateUTC = new Date(
    //   startDateLocal.getUTCFullYear(),
    //   startDateLocal.getUTCMonth(),
    //   startDateLocal.getUTCDate(),
    //   startDateLocal.getUTCHours(),
    //   startDateLocal.getUTCMinutes(),
    //   startDateLocal.getUTCSeconds()
    // );
    return startDateLocal.getTime();
  };

  const date = new Date();
  const timeOffset = date.getTimezoneOffset();

  useEffect(() => {
    if (selectedGraphTab === "aa") {
      dispatch(
        setGraphDataAsync({
          StartDatetimeInLong: getUTCStartDate(27), //previously 27
          EndDatetimeInLong: getUTCnow(),
          TimeZoneOffset: -1 * timeOffset,
          PatientID: parseInt(patientId),
        })
      );
    } else {
      dispatch(
        setGraphDataAsync({
          StartDatetimeInLong: getUTCStartDate(13), //previously 13
          EndDatetimeInLong: getUTCnow(),
          TimeZoneOffset: -1 * timeOffset,
          PatientID: parseInt(patientId),
        })
      );
    }
  }, [dispatch, selectedGraphTab, timeOffset, patientId]);


function Arif() {
  const { t } = useTranslation();
  //  const InsulinDoseDTO = useSelector((state) => state?.graphDetails?.data?.InsulinDoseDTO);
  const loader = useSelector((state) => state?.graphDetails?.loading);
  const users = useSelector((state) => state.graphDetails.data);
  const InsulinDoseDTO = useSelector((state) => state?.graphDetails?.data?.InsulinGraphViewList);
  const titrationType = useSelector((state) => state.graphDetails.data.TitrationType);
  const AutomaticAdjustmentList = useSelector((state) => state?.graphDetails?.data?.AutomaticAdjustmentList)
  const convertLongToTime = (time) => {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  //  basal IAP tootltip
  const BasalRegimenTooltip = ({ active, payload, label }) => {
    const [doseDetails, setDoseDetails] = useState({
      BelowDose: payload[0]?.payload?.BelowDose,
      Dose: payload[0]?.payload?.Dose,
      ExcessDose: payload[0]?.payload?.ExcessDose,
      Date: payload[0]?.payload?.Date,
      RecommendedDose: payload[0]?.payload?.RecommendedDose
    });
    useEffect(() => {
      setDoseDetails({
        BelowDose: payload[0]?.payload?.BelowDose,
        Dose: payload[0]?.payload?.Dose,
        ExcessDose: payload[0]?.payload?.ExcessDose,
        Date: payload[0]?.payload?.Date,
        RecommendedDose: payload[0]?.payload?.RecommendedDose
      });
    }, [payload]);

    if (active && payload && payload.length) {
      return (
        <div className="tooltip-main-container" >
          {/* <div className="tooltip-arrow" ></div> */}
          <div className="tooltip-container">
            <div className="tooltip-content-container">
              {/* Item 1 Less Than*/}
              {doseDetails.BelowDose !== 0 && (
                <div className="tooltip-item-container">
                  <div className="tooltip-icon-container">
                    <div className="tooltip-icon-less-than-rec" />
                    <div className="tooltip-number-text">
                      {doseDetails.BelowDose}
                    </div>
                  </div>
                  <div className="tooltip-description-text">
                    {new Date(doseDetails?.Date).toString().slice(4, 15)}
                    <br /> The patient adjusted the dose below the prescribed
                    dose.
                  </div>
                </div>
              )}

              {/* Item 2  More Than*/}
              {doseDetails.ExcessDose !== 0 && (
                <div className="tooltip-item-container">
                  <div className="tooltip-icon-container">
                    <div className="tooltip-icon-more-than-rec"></div>
                    <div className="tooltip-number-text">
                      {doseDetails.ExcessDose}
                    </div>
                  </div>
                  <div className="tooltip-description-text">
                    {new Date(doseDetails?.Date).toString().slice(4, 15)}
                    <br /> The patient adjusted the dose above the prescribed
                    dose.
                  </div>
                </div>
              )}

              {/* Item 3  Insulin Dose*/}
              <div className="tooltip-item-container">
                <div className="tooltip-icon-container">
                  <div className="tooltip-icon-insulin-dose"></div>
                  <div className="tooltip-number-text">{doseDetails.RecommendedDose}</div>
                </div>
                <div className="tooltip-description-text">
                  {doseDetails.BelowDose !== 0 || doseDetails.ExcessDose !== 0 ? null :
                    <>{new Date(doseDetails?.Date).toString().slice(4, 15)}  <br /></>
                  }

                  <> Prescribed basal dose {doseDetails?.RecommendedDose} of</>

                  <> {
                    payload[0]?.payload?.InsulinBrand?.map((ins, index) => {
                      return <>{ins}{index === payload[0]?.payload?.InsulinBrand.length - 1 ? "" :
                        index === payload[0]?.payload?.InsulinBrand.length - 2 ? <> and </> :
                          <>, </>
                      }

                      </>
                    })
                  }
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  //  basal NON IAP tootltip

  const BasalRegimenTooltipNonIAP = ({ active, payload, label }) => {
    const [doseDetails, setDoseDetails] = useState({
      BelowDose: payload[0]?.payload?.BelowDose,
      Dose: payload[0]?.payload?.Dose,
      ExcessDose: payload[0]?.payload?.ExcessDose,
      Date: payload[0]?.payload?.Date,
    });
    useEffect(() => {
      setDoseDetails({
        BelowDose: payload[0]?.payload?.BelowDose,
        Dose: payload[0]?.payload?.Dose,
        Date: payload[0]?.payload?.Date,

      });
    }, [payload]);

    if (active && payload && payload.length) {
      return (
        <div className="tooltip-main-container" >
          {/* <div className="tooltip-arrow" ></div> */}
          <div className="tooltip-container">
            <div className="tooltip-content-container">


              {/* Item 3  Insulin Dose*/}
              <div className="tooltip-item-container">
                <div className="tooltip-icon-container">
                  <div className="tooltip-icon-insulin-dose"></div>
                  <div className="tooltip-number-text">{doseDetails.Dose}</div>
                </div>
                <div className="tooltip-description-text">
                  {new Date(doseDetails?.Date).toString().slice(4, 15)}<br />
                  <> Basal dose {doseDetails.Dose} of </>

                  <> {
                    payload[0]?.payload?.InsulinBrand?.map((ins, index) => {
                      return <>{ins}{index === payload[0]?.payload?.InsulinBrand.length - 1 ? "" :
                        index === payload[0]?.payload?.InsulinBrand.length - 2 ? <> and </> :
                          <>, </>
                      }

                      </>
                    })
                  }
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Bolus IAP Tootip
  const BasalRegimenTooltip2 = ({ active, payload, label }) => {
    const [doseDetails, setDoseDetails] = useState({
      ActivityTypeId: payload[0]?.payload?.ActivityTypeId,
      Date: payload[0]?.payload?.Date,
      Dose: payload[0]?.payload?.Dose,
      RecommendedDose: payload[0]?.payload?.RecommendedDose,
      fillColor: "#949494",
    });
    useEffect(() => {
      setDoseDetails({
        ActivityTypeId: payload[0]?.payload?.ActivityTypeId,
        Date: payload[0]?.payload?.Date,
        Dose: payload[0]?.payload?.Dose,
        RecommendedDose: payload[0]?.payload?.RecommendedDose,
        fillColor: `${payload[0]?.payload?.ActivityTypeId === "Basal" ? "#0000" : ""
          }${payload[0]?.payload?.ActivityTypeId === "Lunch" ? "#267F13" : ""}${payload[0]?.payload?.ActivityTypeId === "Dinner" ? "#EE8322" : ""
          }${payload[0]?.payload?.ActivityTypeId === "Fasting" ? "#000000" : ""}${payload[0]?.payload?.ActivityTypeId === "Breakfast" ? "#2CACDC" : ""
          } ${payload[0]?.payload?.ActivityTypeId === "Just_Checking" ? "#949494" : ""}`,
      });
    }, [payload]);
    useEffect(() => {
      // console.log("doseDetails", doseDetails);
    }, [doseDetails]);
    return (
      <>
      {
        doseDetails?.Dose === 0 ?  null :<div className="tooltip-main-container">
        {/* <div className="tooltip-arrow" /> */}
        <div className="tooltip-container">
          <div className="tooltip-content-container">
            {/* Item 3  Insulin Dose*/}
            <div className="tooltip-item-container">
              <div className="tooltip-icon-container">
                <div
                  className="tooltip-icon-insulin-dose"
                  style={{ background: doseDetails?.fillColor }}
                ></div>
                <div className="tooltip-number-text">{doseDetails?.Dose}</div>
              </div>
              <div className="tooltip-description-text">
                {new Date(doseDetails?.Date).toString().slice(4, 15)}<br />
                {/* Prescribed bolus dose {doseDetails?.Dose} of
                 <> {
                   payload[0]?.payload?.InsulinBrand?.map((ins, index) => {
                     return <>{ins}{index === payload[0]?.payload?.InsulinBrand.length - 1 ? "" :
                       index === payload[0]?.payload?.InsulinBrand.length - 2 ? <> and </> :
                         <>, </>
                     }
  
                     </>
                   })
                 } */}
  
                <> {doseDetails?.Dose} units of</>
                <> {
                  payload[0]?.payload?.InsulinBrand?.map((ins, index) => {
                    return <>{ins}{index === payload[0]?.payload?.InsulinBrand.length - 1 ? "" :
                      index === payload[0]?.payload?.InsulinBrand.length - 2 ? <> and </> :
                        <>, </>
                    }
                    </>
                  })
                }
                </>
                <>
                  {/* {
                  payload[0]?.payload?.ActivityTypeId === "Fasting" ? 
                  <> taken at {payload[0]?.payload?.ActivityTypeId.toLowerCase()} </> :
                  <> taken before {payload[0]?.payload?.ActivityTypeId.toLowerCase()} </>
                 } */}
                  {
                    payload[0]?.payload?.ActivityTypeId === 1 ?
                      <> taken at fasting </> :
                      <> taken before {payload[0]?.payload?.ActivityTypeId.toLowerCase()} </>
                  }
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </>      
    );
  };

  // Bolus NON IAP Tootip
  const BasalRegimenTooltip2NonIAP = ({ active, payload, label }) => {
    const [doseDetails, setDoseDetails] = useState({
      ActivityTypeId: payload[0]?.payload?.ActivityTypeId,
      Date: payload[0]?.payload?.Date,
      Dose: payload[0]?.payload?.Dose,
      RecommendedDose: payload[0]?.payload?.RecommendedDose,
      fillColor: "#949494",
    });
    useEffect(() => {
      setDoseDetails({
        ActivityTypeId: payload[0]?.payload?.ActivityTypeId,
        Date: payload[0]?.payload?.Date,
        Dose: payload[0]?.payload?.Dose,
        RecommendedDose: payload[0]?.payload?.RecommendedDose,
        fillColor: `${payload[0]?.payload?.ActivityTypeId === "BedTime" ? "#F53DC2" : ""
          }${payload[0]?.payload?.ActivityTypeId === "Lunch" ? "#267F13" : ""}${payload[0]?.payload?.ActivityTypeId === "Dinner" ? "#EE8322" : ""
          }${payload[0]?.payload?.ActivityTypeId === "Fasting" ? "#949494" : ""}${payload[0]?.payload?.ActivityTypeId === "Breakfast" ? "#2CACDC" : ""
          } ${payload[0]?.payload?.ActivityTypeId === "Just_Checking" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "Snack" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "After_Exercise" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "Before_Exercise" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "AfterDinner" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "AfterLunch" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "AfterBreakfast" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "As_Needed" ? "#949494" : ""}
             `,
      });
    }, [payload]);
    useEffect(() => {
      // console.log("doseDetails", doseDetails);
    }, [doseDetails]);
    return (
      <>
      {
        doseDetails?.Dose === 0 ?  null : 
        <div className="tooltip-main-container">
        {/* <div className="tooltip-arrow" /> */}
        <div className="tooltip-container">
          <div className="tooltip-content-container">
            {/* Item 3  Insulin Dose*/}
            <div className="tooltip-item-container">
              <div className="tooltip-icon-container">
                <div
                  className="tooltip-icon-insulin-dose"
                  style={{ background: doseDetails?.fillColor }}
                ></div>
                <div className="tooltip-number-text">{doseDetails?.Dose}</div>
              </div>
              <div className="tooltip-description-text">
                {new Date(doseDetails?.Date).toString().slice(4, 15)}<br />
                <>  Bolus dose {doseDetails?.Dose} of </>

                <> {
                  payload[0]?.payload?.InsulinBrand?.map((ins, index) => {
                    return <>{ins}{index === payload[0]?.payload?.InsulinBrand.length - 1 ? "" :
                      index === payload[0]?.payload?.InsulinBrand.length - 2 ? <> and </> :
                        <>, </>
                    }

                    </>
                  })
                }
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </>
      
    );
  };

  // Premixed IAP ToolTip
  const BasalRegimenTooltip3 = ({ active, payload, label }) => {
    const [doseDetails, setDoseDetails] = useState({
      ActivityTypeId: payload[0]?.payload?.ActivityTypeId || [],
      Date: payload[0]?.payload?.Date,
      Dose: payload[0]?.payload?.Dose,
      RecommendedDose: payload[0]?.payload?.RecommendedDose,
      fillColor: "#00000000",
    });
    useEffect(() => {
      setDoseDetails({
        ActivityTypeId: payload[0]?.payload?.ActivityTypeId,
        Date: payload[0]?.payload?.Date,
        Dose: payload[0]?.payload?.Dose,
        RecommendedDose: payload[0]?.payload?.RecommendedDose,
        fillColor: `${payload[0]?.payload?.ActivityTypeId === "BedTime" ? "#EE8322" : ""
          }${payload[0]?.payload?.ActivityTypeId === "Lunch" ? "#2CACDC" : ""}${payload[0]?.payload?.ActivityTypeId === "Dinner" ? "#EE8322" : ""
          }${payload[0]?.payload?.ActivityTypeId === "Fasting" ? "#000000" : ""}${payload[0]?.payload?.ActivityTypeId === "Breakfast" ? "#2CACDC" : ""
          }`,
      });
    }, [payload]);
    useEffect(() => {
      // console.log("doseDetails", doseDetails);
    }, [doseDetails]);
    return (
      <>
      {
        doseDetails?.Dose === 0 ?  null : 
        <div className="tooltip-main-container">
        {/* <div className="tooltip-arrow" /> */}
        <div className="tooltip-container">
          <div className="tooltip-content-container">
            {/* Item 3  Insulin Dose*/}
            <div className="tooltip-item-container">
              <div className="tooltip-icon-container">
                <div
                  className="tooltip-icon-insulin-dose"
                  style={{ background: doseDetails?.fillColor }}
                ></div>
                <div className="tooltip-number-text">{doseDetails?.Dose}</div>
              </div>
              <div className="tooltip-description-text">
                {new Date(doseDetails?.Date).toString().slice(4, 15)}<br />
                {/* Prescribed premixed dose {doseDetails?.Dose} of
                 <> {
                   payload[0]?.payload?.InsulinBrand?.map((ins, index) => {
                     return <>{ins}{index === payload[0]?.payload?.InsulinBrand.length - 1 ? "" :
                       index === payload[0]?.payload?.InsulinBrand.length - 2 ? <> and </> :
                         <>, </>
                     }
 
                     </>
                   })
                 }
                 </> */}
                <> {doseDetails?.Dose} units of </>
                <> {
                  payload[0]?.payload?.InsulinBrand?.map((ins, index) => {
                    return <>{ins}{index === payload[0]?.payload?.InsulinBrand.length - 1 ? "" :
                      index === payload[0]?.payload?.InsulinBrand.length - 2 ? <> and </> :
                        <>, </>
                    }
                    </>
                  })
                }
                </>
                <>
                  {/* {
                  payload[0]?.payload?.ActivityTypeId === "Fasting" ? 
                  <> taken at {payload[0]?.payload?.ActivityTypeId.toLowerCase()} </> :
                  <> taken before {payload[0]?.payload?.ActivityTypeId.toLowerCase()} </>
                 } */}
                  {
                    payload[0]?.payload?.ActivityTypeId === 1 ?
                      <> taken at fasting </> :
                      <> taken before {payload[0]?.payload?.ActivityTypeId.toLowerCase()} </>
                  }
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </>      
    );
  };


  // Premixed NON IAP ToolTip
  const BasalRegimenTooltip3NonIAP = ({ active, payload, label }) => {
    const [doseDetails, setDoseDetails] = useState({
      ActivityTypeId: payload[0]?.payload?.ActivityTypeId,
      Date: payload[0]?.payload?.Date,
      Dose: payload[0]?.payload?.Dose,
      RecommendedDose: payload[0]?.payload?.RecommendedDose,
      fillColor: "#949494",
    });
    useEffect(() => {
      setDoseDetails({
        ActivityTypeId: payload[0]?.payload?.ActivityTypeId,
        Date: payload[0]?.payload?.Date,
        Dose: payload[0]?.payload?.Dose,
        RecommendedDose: payload[0]?.payload?.RecommendedDose,
        fillColor: `${payload[0]?.payload?.ActivityTypeId === "BedTime" ? "#F53DC2" : ""
          }${payload[0]?.payload?.ActivityTypeId === "Lunch" ? "#267F13" : ""}${payload[0]?.payload?.ActivityTypeId === "Dinner" ? "#EE8322" : ""
          }${payload[0]?.payload?.ActivityTypeId === "Fasting" ? "#949494" : ""}${payload[0]?.payload?.ActivityTypeId === "Breakfast" ? "#2CACDC" : ""
          } ${payload[0]?.payload?.ActivityTypeId === "Just_Checking" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "Snack" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "After_Exercise" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "Before_Exercise" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "AfterDinner" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "AfterLunch" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "AfterBreakfast" ? "#949494" : ""}
             ${payload[0]?.payload?.ActivityTypeId === "As_Needed" ? "#949494" : ""}
             `,
      });
    }, [payload]);
    useEffect(() => {
      // console.log("doseDetails", doseDetails);
    }, [doseDetails]);
    return (
      <>
      {
        doseDetails?.Dose === 0 ?  null : 
        <div className="tooltip-main-container">
        {/* <div className="tooltip-arrow" /> */}
        <div className="tooltip-container">
          <div className="tooltip-content-container">
            {/* Item 3  Insulin Dose*/}
            <div className="tooltip-item-container">
              <div className="tooltip-icon-container">
                <div
                  className="tooltip-icon-insulin-dose"
                  style={{ background: doseDetails?.fillColor }}
                ></div>
                <div className="tooltip-number-text">{doseDetails?.Dose}</div>
              </div>
              <div className="tooltip-description-text">
                {new Date(doseDetails?.Date).toString().slice(4, 15)}<br />
                <>Premixed dose {doseDetails?.Dose} of </>

                <> {
                  payload[0]?.payload?.InsulinBrand?.map((ins, index) => {
                    return <>{ins}{index === payload[0]?.payload?.InsulinBrand.length - 1 ? "" :
                      index === payload[0]?.payload?.InsulinBrand.length - 2 ? <> and </> :
                        <>, </>
                    }

                    </>
                  })
                }
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </>      
    );
  };



  const selectedGraphTab = useSelector((state) => state.graphTabs.selectedGraphTab);

  const getTicks = (startDate, endDate, num) => {
    const diffDays = differenceInCalendarDays(endDate, startDate);

    let current = startDate,
      velocity = Math.round(diffDays / (num - 1));

    const ticks = [startDate.getTime()];

    for (let i = 1; i < num - 1; i++) {
      ticks.push(add(current, { days: i * velocity }).getTime());
    }

    ticks.push(endDate.getTime());
    return ticks;
  };



  var SelectedTicks = [];
  const getXaxisTicks = (startDay, totalDays) => {
    var date = new Date(new Date().toDateString());
    date.setDate(date.getDate() - startDay);
    date.setHours(0, 0, 0, 0);

    var date1 = new Date(new Date().toDateString());
    date1.setDate(date1.getDate() + 1);
    date1.setHours(0, 0, 0, 0);
    var totalTicks = getTicks(new Date(date.getTime()), new Date(date1.getTime()), totalDays);
    SelectedTicks = totalTicks;
    return totalTicks;
  }
  var GraphStartDate = new Date(new Date().toDateString());
  var graph_endDate = new Date(new Date().toDateString());
  graph_endDate.setDate(graph_endDate.getDate() + 1);
  graph_endDate.setSeconds(graph_endDate.getSeconds() - 1);
  //graph_endDate.setHours(0, 0, 0, 0);
  var GraphEndDate = graph_endDate;
  const setGraphStartDate = (startDay, totalDays) =>{
    var date = new Date(new Date().toDateString());
    date.setDate(date.getDate() - startDay);
    date.setHours(0, 0, 0, 0);
    GraphStartDate = date;
  }
  
  if(selectedGraphTab === "4weeks")
  {
    setGraphStartDate(27, 30);
  }
  else
  {
    setGraphStartDate(13, 15);
  }  

  const domain = (startDay) => {
    var date = new Date(new Date().toDateString());
    date.setDate(date.getDate() - startDay);
    date.setHours(0, 0, 0, 0);

    var date1 = new Date(new Date().toDateString());
    date1.setDate(date1.getDate() + 1);
    date1.setHours(0, 0, 0, 0);

    return [new Date(date.getTime()), new Date(date1.getTime())];
  }


  const dateFormatter = (date, startDay) => {
    var date1 = new Date(new Date().toDateString());
    date1.setDate(date1.getDate() - startDay);
    date1.setHours(0, 0, 0, 0);

    if (date === date1.getTime()) {
      return format(new Date(date), "dd MMM");
    } else if (new Date(date).getDate() === 1) {
      return format(new Date(date), "dd MMM");
    } else {
      return format(new Date(date), "dd");
    }
  };

  function AxisLabel1(props) {
    const { x, y } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} fill="#787885" font-size="12px" font-weight="bold" >
          <tspan textAnchor="left" x="10" font-family="Inter">
            Insulin
          </tspan>
          <tspan textAnchor="left" x="10" dy="20" font-family="Inter">
            Dose
          </tspan>
          <tspan textAnchor="left" x="10" dy="21" font-family="Inter">
            Unit(s)
          </tspan>
        </text>
      </g>
    );
  }

  const convertLongToDateTime = (DateInMs) => {
    // var newDate = new Date(DateInMs);
    // newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());

    let localDateTime = new Date(DateInMs);
    let UTCDateTime = new Date(localDateTime.getUTCFullYear(), localDateTime.getUTCMonth(), localDateTime.getUTCDate(), localDateTime.getUTCHours(), localDateTime.getUTCMinutes(), localDateTime.getUTCSeconds());
    return UTCDateTime.getTime();
  }


  const convertTo4AM = (DateInMs) => {
    let localDateTime = new Date(DateInMs);
    return localDateTime.setHours(4, 0, 0, 0);
  }
  const convertTo6AM = (DateInMs) => {
    let localDateTime = new Date(DateInMs);
    return localDateTime.setHours(6, 0, 0, 0);
  }
  const convertTo7AM = (DateInMs) => {
    let localDateTime = new Date(DateInMs);
    return localDateTime.setHours(7, 0, 0, 0);
  }
  const convertTo8AM = (DateInMs) => {
    let localDateTime = new Date(DateInMs);
    return localDateTime.setHours(8, 0, 0, 0);
  }
  const convertTo12PM = (DateInMs) => {
    let localDateTime = new Date(DateInMs);
    return localDateTime.setHours(12, 0, 0, 0);
  }

  const convertTo4PM = (DateInMs) => {
    let localDateTime = new Date(DateInMs);
    return localDateTime.setHours(16, 0, 0, 0);
  }
  const convertTo6PM = (DateInMs) => {
    let localDateTime = new Date(DateInMs);
    return localDateTime.setHours(18, 0, 0, 0);
  }
  const convertTo8PM = (DateInMs) => {
    let localDateTime = new Date(DateInMs);
    return localDateTime.setHours(20, 0, 0, 0);
  }

  const FormatActivityList = (activityList, activityList1, activityList2, activityList3) => {
    var dataList = [];
    if (activityList != undefined && activityList.length > 0) {
      for (var i = 0; i < SelectedTicks.length; i++) {
        var tickdt = new Date(SelectedTicks[i]);
        tickdt = tickdt.toString()?.slice(4, 15);
        var isDateExist = false;
        for (var j = 0; j < activityList.length; j++) {
          var actdt = new Date(activityList[j].Date);
          actdt = actdt.toString()?.slice(4, 15);
          if (tickdt == actdt) {
            isDateExist = true;
            break;
          }
        }
        if (activityList1 != undefined && activityList1.length > 0)
        {
        for (var j = 0; j < activityList1.length; j++) {
          var actdt = new Date(activityList1[j].Date);
          actdt = actdt.toString()?.slice(4, 15);
          if (tickdt == actdt) {
            isDateExist = true;
            break;
          }
        }
      }
      if (activityList2 != undefined && activityList2.length > 0)
      {
        for (var j = 0; j < activityList2.length; j++) {
          var actdt = new Date(activityList2[j].Date);
          actdt = actdt.toString()?.slice(4, 15);
          if (tickdt == actdt) {
            isDateExist = true;
            break;
          }
        }
      }
      if (activityList3 != undefined && activityList3.length > 0)
      {
        for (var j = 0; j < activityList3.length; j++) {
          var actdt = new Date(activityList3[j].Date);
          actdt = actdt.toString()?.slice(4, 15);
          if (tickdt == actdt) {
            isDateExist = true;
            break;
          }
        }
      }
        if (!isDateExist) {
          activityList[activityList.length] = {
            ActivityTypeId: activityList[0].ActivityTypeId,
            Date: SelectedTicks[i],
            Dose: 0,
            RecommendedDose: 0,
            InsulinBrand: activityList[0].InsulinBrand
          }
        }
      }
    }
    return activityList;
  }

  const bolusbasalIap = InsulinDoseDTO?.filter((item) => item?.isBasalUser === true)
  const bolusbasal = bolusbasalIap?.map((item) => {
    return {
      Date: convertTo8AM(convertLongToDateTime(item.Date)),
      DateToolTip: convertLongToDateTime(item.Date),
      ActivityTypeId: item.ActivityTypeId,
      Dose: item.Dose,
      InsulinBrand: item.InsulinBrand
    }
  });
  const mt = bolusbasalIap?.map(i => i?.Dose)?.length > 0 ? bolusbasalIap?.map(i => i?.Dose) : [5]
  let largestNum = mt.reduce(function (accumulatedValue, currentValue) {
    return Math.max(accumulatedValue, currentValue);
  });
  const bolusIap = InsulinDoseDTO?.filter((item) => item?.isBolusUser === true);


  
  const mainData = bolusIap?.map((item) => {
    return {
      Date: (item.ActivityTypeId === 14 && convertTo4AM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 3 && convertTo4PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 5 && convertTo8PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 7 && convertTo8PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 1 && convertTo12PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 2 && convertTo8PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 4 && convertTo8PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 6 && convertTo8PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 8 && convertTo8PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 9 && convertTo8PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 12 && convertTo8PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 31 && convertTo8PM(convertLongToDateTime(item.Date))),

      DateToolTip: convertLongToDateTime(item.Date),
      ActivityTypeId: (item.ActivityTypeId === 14 && "Fasting") ||
        (item.ActivityTypeId === 1 && "Breakfast") ||
        (item.ActivityTypeId === 2 && "AfterBreakfast") ||
        (item.ActivityTypeId === 3 && "Lunch") ||
        (item.ActivityTypeId === 4 && "AfterLunch") ||
        (item.ActivityTypeId === 5 && "Dinner") ||
        (item.ActivityTypeId === 6 && "AfterDinner") ||
        (item.ActivityTypeId === 7 && "BedTime") ||
        (item.ActivityTypeId === 8 && "Before_Exercise") ||
        (item.ActivityTypeId === 9 && "After_Exercise") ||
        (item.ActivityTypeId === 12 && "Snack") ||
        (item.ActivityTypeId === 31 && "Just_Checking"),

      Dose: item.Dose,
      RecommendedDose: item.RecommendedDose,
      InsulinBrand: item.InsulinBrand
    }
  })?.filter(ele => ele.Date >= GraphStartDate.getTime() && ele.Date <= GraphEndDate.getTime())?.reduce((group, product) => {
    const { ActivityTypeId } = product;
    group[ActivityTypeId] = group[ActivityTypeId] ?? [];
    group[ActivityTypeId].push(product);
    return group;
  }, {});

  const mt1 = bolusIap?.map(i => i?.Dose)?.length > 0 ? bolusIap?.map(i => i?.Dose) : [5]
  let largestNum1 = mt1?.reduce(function (accumulatedValue, currentValue) {
    return Math.max(accumulatedValue, currentValue);
  });
  const bolusYaxis = largestNum > largestNum1 ? bolusbasalIap : bolusIap
  const bolusNonIap = InsulinDoseDTO?.filter((item) => item?.isBolusUser === true)
  const mainDataNonIAP = bolusNonIap?.map((item) => {
    return {
      Date: (item.ActivityTypeId === 14 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 3 && convertTo12PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 5 && convertTo4PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 7 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 1 && convertTo8AM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 2 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 4 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 6 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 8 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 9 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 12 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 31 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 34 && convertTo8PM(convertLongToDateTime(item.Date))),
      DateToolTip: convertLongToDateTime(item.Date),
      ActivityTypeId: (item.ActivityTypeId === 14 && "Fasting") ||
        (item.ActivityTypeId === 1 && "Breakfast") ||
        (item.ActivityTypeId === 2 && "AfterBreakfast") ||
        (item.ActivityTypeId === 3 && "Lunch") ||
        (item.ActivityTypeId === 4 && "AfterLunch") ||
        (item.ActivityTypeId === 5 && "Dinner") ||
        (item.ActivityTypeId === 6 && "AfterDinner") ||
        (item.ActivityTypeId === 7 && "BedTime") ||
        (item.ActivityTypeId === 8 && "Before_Exercise") ||
        (item.ActivityTypeId === 9 && "After_Exercise") ||
        (item.ActivityTypeId === 12 && "Snack") ||
        (item.ActivityTypeId === 31 && "Just_Checking") ||
        (item.ActivityTypeId === 34 && "As_Needed"),

      Dose: item.Dose,
      RecommendedDose: item.RecommendedDose,
      InsulinBrand: item.InsulinBrand
    }
  }).reduce((group, product) => {
    const { ActivityTypeId } = product;
    group[ActivityTypeId] = group[ActivityTypeId] ?? [];
    group[ActivityTypeId].push(product);
    return group;
  }, {});
  const basalIap = InsulinDoseDTO?.filter((item) => item?.isBasalUser === true)
  const mainDataBasal = basalIap?.map((item) => {
    return {
      Date: convertTo12PM(convertLongToDateTime(item.Date)),
      DateToolTip: convertLongToDateTime(item.Date),
      ActivityTypeId: item.ActivityTypeId,
      Dose: (item.Dose < item.RecommendedDose) ? item.Dose : item.RecommendedDose,
      RecommendedDose: item.RecommendedDose,
      // Dose: (item.Dose < item.RecommendedDose) ? item.RecommendedDose : item.Dose,
      ExcessDose: (item.Dose > item.RecommendedDose) ? (item.Dose - item.RecommendedDose) : 0,
      BelowDose: (item.Dose < item.RecommendedDose) ? (item.RecommendedDose - item.Dose) : 0,
      InsulinBrand: item.InsulinBrand
    }
  });
  const basalNonIap = InsulinDoseDTO?.filter((item) => item?.isBasalUser === true)
  const mainDataBasalNonIAP = basalNonIap?.map((item) => {
    return {
      Date: convertTo12PM(convertLongToDateTime(item.Date)),
      DateToolTip: convertLongToDateTime(item.Date),
      ActivityTypeId: item.ActivityTypeId,
      Dose: (item.Dose < item.RecommendedDose) ? item.Dose : item.RecommendedDose,
      // ExcessDose: (item.Dose > item.RecommendedDose) ? (item.Dose - item.RecommendedDose) : 0,
      // BelowDose: (item.Dose < item.RecommendedDose) ? (item.RecommendedDose - item.Dose) : 0,
      InsulinBrand: item.InsulinBrand
    }
  });

  const mainDataFasting = InsulinDoseDTO?.map((item) => {
    return {
      Date: convertTo6AM(convertLongToDateTime(item.Date)),
      DateDinner: convertTo12PM(convertLongToDateTime(item.Date)),
      DateOthers: convertTo6PM(convertLongToDateTime(item.Date)),
      DateToolTip: convertLongToDateTime(item.Date),
      ActivityTypeId: item.ActivityTypeId,
      Dose: (item.Dose < item.RecommendedDose) ? item.Dose : item.RecommendedDose,
      DoseDinner: 10,
      DoseOthers: 30,
      ExcessDose: (item.Dose > item.RecommendedDose) ? (item.Dose - item.RecommendedDose) : 0,
      ExcessDoseDinner: 40,
      ExcessDoseOthers: 0,
      BelowDose: (item.Dose < item.RecommendedDose) ? (item.RecommendedDose - item.Dose) : 0,
      BelowDoseDinner: 0,
      BelowDoseOthers: 10,
    }
  });

  const mainDataPremixFinal = InsulinDoseDTO?.map((item) => {
    return {
      Date: (item.ActivityTypeId === 14 && convertTo6AM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 5 && convertTo12PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 1 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 2 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 4 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 6 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 8 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 9 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 12 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 31 && convertTo6PM(convertLongToDateTime(item.Date))),
      ActivityTypeId: (item.ActivityTypeId === 14 && "Fasting") ||
        (item.ActivityTypeId === 1 && "Breakfast") ||
        (item.ActivityTypeId === 2 && "AfterBreakfast") ||

        (item.ActivityTypeId === 4 && "AfterLunch") ||
        (item.ActivityTypeId === 5 && "Dinner") ||
        (item.ActivityTypeId === 6 && "AfterDinner") ||
        (item.ActivityTypeId === 8 && "Before_Exercise") ||
        (item.ActivityTypeId === 9 && "After_Exercise") ||
        (item.ActivityTypeId === 12 && "Snack") ||
        (item.ActivityTypeId === 31 && "Just_Checking"),
      Dose: (item.Dose < item.RecommendedDose) ? item.Dose : item.RecommendedDose,
      ExcessDose: (item.Dose > item.RecommendedDose) ? (item.Dose - item.RecommendedDose) : 0,
      BelowDose: (item.Dose < item.RecommendedDose) ? (item.RecommendedDose - item.Dose) : 0,
    }
  }).reduce((group, product) => {
    const { ActivityTypeId } = product;
    group[ActivityTypeId] = group[ActivityTypeId] ?? [];
    group[ActivityTypeId].push(product);
    return group;
  }, {});

  const mainDataDinner = InsulinDoseDTO?.map((item) => {
    return {
      Date: convertTo4PM(convertLongToDateTime(item.Date)),
      DateToolTip: convertLongToDateTime(item.Date),
      ActivityTypeId: item.ActivityTypeId,
      Dose: (item.Dose < item.RecommendedDose) ? item.Dose : item.RecommendedDose,
      ExcessDose: (item.Dose > item.RecommendedDose) ? (item.Dose - item.RecommendedDose) : 0,
      BelowDose: (item.Dose < item.RecommendedDose) ? (item.RecommendedDose - item.Dose) : 0,
    }
  });

  //  const premixbasalIap = InsulinDoseDTO?.filter((item) => item?.isBasalUser === true)
  //  const premixbasal = premixbasalIap?.map((item) => {
  //   return {
  //     Date: convertTo4AM(convertLongToDateTime(item.Date)),
  //     DateToolTip: convertLongToDateTime(item.Date),
  //     ActivityTypeId: item.ActivityTypeId,
  //     Dose: (item.Dose < item.RecommendedDose) ? item.Dose : item.RecommendedDose,
  //     ExcessDose: (item.Dose > item.RecommendedDose) ? (item.Dose - item.RecommendedDose) : 0,
  //     BelowDose: (item.Dose < item.RecommendedDose) ? (item.RecommendedDose - item.Dose) : 0,
  //     InsulinBrand: item.InsulinBrand
  //   }
  // });
  // const mt2 = premixbasalIap?.map(i => i?.Dose)?.length > 0 ? premixbasalIap?.map(i => i?.Dose) : [5]
  // let largestNum2 = mt2.reduce(function (accumulatedValue, currentValue) {
  //    return Math.max(accumulatedValue, currentValue);
  //  });

  const premixIap = InsulinDoseDTO?.filter((item) => item?.isPremixUser === true)
  const mainDataPremix = premixIap?.map((item) => {
    return {
      Date: (item.ActivityTypeId === 14 && convertTo4AM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 5 && convertTo12PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 1 && convertTo8AM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 2 && convertTo4PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 4 && convertTo4PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 6 && convertTo4PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 8 && convertTo4PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 9 && convertTo4PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 12 && convertTo4PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 31 && convertTo4PM(convertLongToDateTime(item.Date))),

      DateToolTip: convertLongToDateTime(item.Date),
      ActivityTypeId: (item.ActivityTypeId === 14 && "Fasting") ||
        (item.ActivityTypeId === 1 && "Breakfast") ||
        (item.ActivityTypeId === 2 && "AfterBreakfast") ||
        (item.ActivityTypeId === 4 && "AfterLunch") ||
        (item.ActivityTypeId === 5 && "Dinner") ||
        (item.ActivityTypeId === 6 && "AfterDinner") ||
        (item.ActivityTypeId === 8 && "Before_Exercise") ||
        (item.ActivityTypeId === 9 && "After_Exercise") ||
        (item.ActivityTypeId === 12 && "Snack") ||
        (item.ActivityTypeId === 31 && "Just_Checking"),
      Dose: (item.Dose < item.RecommendedDose) ? item.Dose : item.RecommendedDose,
      ExcessDose: (item.Dose > item.RecommendedDose) ? (item.Dose - item.RecommendedDose) : 0,
      // ExcessDose: 10,
      BelowDose: (item.Dose < item.RecommendedDose) ? (item.RecommendedDose - item.Dose) : 0,
      InsulinBrand: item.InsulinBrand
      // BelowDose: 20,
    }
  }).reduce((group, product) => {
    const { ActivityTypeId } = product;
    group[ActivityTypeId] = group[ActivityTypeId] ?? [];
    group[ActivityTypeId].push(product);
    return group;
  }, {});
  // const mt3 = premixIap?.map(i => i?.Dose)?.length > 0 ? premixIap?.map(i => i?.Dose) : [5]
  // let largestNum3 = mt3?.reduce(function (accumulatedValue, currentValue) {
  //     return Math.max(accumulatedValue, currentValue) ;
  //   });
  // const premixYaxis = largestNum2 > largestNum3 ? premixbasalIap : premixIap
  const premixNonIap = InsulinDoseDTO?.filter((item) => item?.isPremixUser === true)
  const mainDataPremixNonIAP = premixNonIap?.map((item) => {
    return {
      Date: (item.ActivityTypeId === 14 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 3 && convertTo12PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 5 && convertTo4PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 7 && convertTo8PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 1 && convertTo8AM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 2 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 4 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 6 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 8 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 9 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 12 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 31 && convertTo6PM(convertLongToDateTime(item.Date))) ||
        (item.ActivityTypeId === 34 && convertTo6PM(convertLongToDateTime(item.Date))),

      DateToolTip: convertLongToDateTime(item.Date),
      ActivityTypeId: (item.ActivityTypeId === 14 && "Fasting") ||
        (item.ActivityTypeId === 1 && "Breakfast") ||
        (item.ActivityTypeId === 2 && "AfterBreakfast") ||
        (item.ActivityTypeId === 3 && "Lunch") ||
        (item.ActivityTypeId === 4 && "AfterLunch") ||
        (item.ActivityTypeId === 5 && "Dinner") ||
        (item.ActivityTypeId === 6 && "AfterDinner") ||
        (item.ActivityTypeId === 7 && "BedTime") ||
        (item.ActivityTypeId === 8 && "Before_Exercise") ||
        (item.ActivityTypeId === 9 && "After_Exercise") ||
        (item.ActivityTypeId === 12 && "Snack") ||
        (item.ActivityTypeId === 31 && "Just_Checking") ||
        (item.ActivityTypeId === 34 && "As_Needed"),
      Dose: (item.Dose < item.RecommendedDose) ? item.Dose : item.RecommendedDose,
      ExcessDose: (item.Dose > item.RecommendedDose) ? (item.Dose - item.RecommendedDose) : 0,
      // ExcessDose: 10,
      BelowDose: (item.Dose < item.RecommendedDose) ? (item.RecommendedDose - item.Dose) : 0,
      InsulinBrand: item.InsulinBrand
      // BelowDose: 20,
    }
  }).reduce((group, product) => {
    const { ActivityTypeId } = product;
    group[ActivityTypeId] = group[ActivityTypeId] ?? [];
    group[ActivityTypeId].push(product);
    return group;
  }, {});
  const getYaxisLabels = (dataArr) => {
    var InsulinUnit = [];
    for (var i = 0; dataArr?.length > i; i++) {
      InsulinUnit.push(dataArr[i].Dose);
    }
    var maxInsulinUnit = Math.max.apply(Math, InsulinUnit);
    maxInsulinUnit = Math.round(maxInsulinUnit);
    if (maxInsulinUnit > 15) {
      var rem = maxInsulinUnit % 15;
      if (rem == 0) { maxInsulinUnit = maxInsulinUnit + 1; }
      for (var i = maxInsulinUnit; i > 0; i++) {
        var num = i / 15;
        if (Number.isInteger(num)) {
          var maxLimit = i / 3;
          return [0, maxLimit * 1, maxLimit * 2, maxLimit * 3];
        }
      }
    } else {
      return [0, 5, 10, 15]
    }
  }

  // Function and method written by Arif which starts from here and it is used for Automatic Adjustment Graph...

  /**
   * Find all the dates for last 2 weeks.
   */
  const weeks2 = [];
  const num_days_2weeks = 14; // get last 14 days date from current date.

  for (let i = 0; i < num_days_2weeks; i++) {
    weeks2.push(new Date(getXaxisTicks(13, 15)[i]).toString().slice(4, 15))
  }

  /**
     * This function itetrate and match the date for last 2 weeks if that date is available.
     * @param {number} m
     * @returns matching dates
     */
  const sameDateMatch2Weeks = (m) => {
    return AutomaticAdjustmentList?.find((x) => {
      const data = x?.Date
      return new Date(data).toString().slice(4, 15) === weeks2[m]
    });
  }
  /**
   * This function find index number for 2 weeks dates for mapping dynamic dates.
   */
  const dateIndex2 = Array(weeks2.length).fill().reduce(arr => (arr.push(arr.length), arr), [])

  /**
   * Find all the dates for last 4 weeks.
   */
  const weeks4 = [];
  const num_days_4weeks = 28; // get last 28 days date from current date.

  for (let i = 0; i < num_days_4weeks; i++) {
    weeks4.push(new Date(getXaxisTicks(27, 30)[i]).toString().slice(4, 15))
  }

  /**
   * This function itetrate and match the date for last 4 weeks if that date is available.
   * @param {number} m
   * @returns matching dates
   */
  const sameDateMatch4Weeks = (m) => {
    return AutomaticAdjustmentList?.find((x) => {
      const data = x?.Date
      return new Date(data).toString().slice(4, 15) === weeks4[m]
    });
  }

  /**
   * This function find index number for 4 weeks dates for mapping dynamic dates.
   */
  const dateIndex4 = Array(weeks4.length).fill().reduce(arr => (arr.push(arr.length), arr), [])

  /**
   * This function filter out all the same dates with different ActivityTypeID from Automatic Ajustemnt graph API data.
   */
  const automaticAdjustSameDates = AutomaticAdjustmentList?.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj.Date).indexOf(obj.Date) !== pos;
  })

  /**
   * This function filter all common dates for particular column of Automatic Adjustment Graph (Dates) for last 2 weeks which is coming from automaticAdjustSameDates function.
   * @param {number} m
   * @returns filter same dates.
   */
  const automaticAdjustSameDates2weeks = (m) => {
    return automaticAdjustSameDates?.filter((x) => {
      const data = x?.Date
      return new Date(data).toString().slice(4, 15) === weeks2[m]
    });
  }

  /**
  * This function filter all common dates for particular column of Automatic Adjustment Graph (Dates) for last 4 weeks which is coming from automaticAdjustSameDates function.
  * @param {number} m
  * @returns filter same dates.
  */
  const automaticAdjustSameDates4weeks = (m) => {
    return automaticAdjustSameDates?.filter((x) => {
      const data = x?.Date
      return new Date(data).toString().slice(4, 15) === weeks4[m]
    });
  }

  // for 2 weeks
  const insulinDateMatch = (m) => {
    return InsulinDoseDTO?.find((x) => {
      const data = x?.Date
      return new Date(data).toString().slice(4, 15) === weeks2[m]
    });
  }

  // for 4 weeks
  const insulinDateMatch4weeks = (m) => {
    return InsulinDoseDTO?.find((x) => {
      const data = x?.Date
      return new Date(data).toString().slice(4, 15) === weeks4[m]
    });
  }

  /**
   * This component is common for all insulin Dose Graph which gives the Automatic Adjustment Graph data.
   * And if Automatic Adjustment Graph API data is not available (Example : null , [] ) then we have to hide this component.
   * @param {string} text
   * @returns Automatic Adjustment Component
   */

  const AutomaticAdjust = ({ text }) => {
    return <div className='row'>
      <div className={selectedGraphTab === "2weeks" ? 'col-md-2 automatic-adjust-left' : 'col-md-2 automatic-adjust-left adl-four-weeks'}>
        <span>Automatic </span>
        <span style={{ position: 'relative', top: '-6px' }}>Adjustment </span>
      </div>
      <div className='col-md-10'>
        {
          selectedGraphTab === "2weeks" ?
            <div className="automatic-adjust-right">
              <div className='last-vertical-line'></div>
              {
                dateIndex2.map((ele) => {

                  return <>
                    {
                      weeks2[ele] === new Date(sameDateMatch2Weeks(ele)?.Date).toString().slice(4, 15)
                        &&
                        (sameDateMatch2Weeks(ele)?.AdjustedDoseAmount > 0)
                        &&
                        (sameDateMatch2Weeks(ele)?.IAPSatus === 4
                          || sameDateMatch2Weeks(ele)?.IAPSatus === 5 || sameDateMatch2Weeks(ele)?.IAPSatus === 6
                          || sameDateMatch2Weeks(ele)?.IAPSatus === 7 || sameDateMatch2Weeks(ele)?.IAPSatus === 8
                          || sameDateMatch2Weeks(ele)?.IAPSatus === 9 || sameDateMatch2Weeks(ele)?.IAPSatus === 0
                        )

                        ? <>
                          <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                            {
                              (automaticAdjustSameDates?.length > 0) && (weeks2[ele] === new Date(automaticAdjustSameDates2weeks(ele)[0]?.Date).toString().slice(4, 15)) ?

                                <div style={{ margin: '10px 0 10px 0' }}>
                                  {
                                    sameDateMatch2Weeks(ele)?.ActivityTypeID === 5 ?
                                      <>
                                        <li style={{ color: '#267f13' }} className="hover-on-text">+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</li>
                                        <div style={{ position: 'relative', zIndex: 99999 }}>
                                          <div className='on-hover'>
                                            <div className='row'>
                                              <div className='col-md-3'>
                                                <p className='adjust-unit-hover' style={{ color: '#267f13' }}>+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                                <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                              </div>
                                              <div className='col-md-9'>
                                                <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                  {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                                </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch2Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                    {sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                                  </span> units
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                      :
                                      sameDateMatch2Weeks(ele)?.ActivityTypeID === 14 ?
                                        <><li style={{ color: '#000' }} className="hover-on-text">+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</li>
                                          <div style={{ position: 'relative', zIndex: 99999 }}>
                                            <div className='on-hover'>
                                              <div className='row'>
                                                <div className='col-md-3'>
                                                  <p className='adjust-unit-hover' style={{ color: '#0000' }}>+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                                  <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                  <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                </div>
                                                <div className='col-md-9'>
                                                  <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                    {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                                  </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch2Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                                    </span> units
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </> :
                                        sameDateMatch2Weeks(ele)?.ActivityTypeID === 3 ?
                                          <>
                                            <li style={{ color: '#1ca6d9' }} className="hover-on-text">+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</li>
                                            <div style={{ position: 'relative', zIndex: 99999 }}>
                                              <div className='on-hover'>
                                                <div className='row'>
                                                  <div className='col-md-3'>
                                                    <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                                    <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                    <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                  </div>
                                                  <div className='col-md-9'>
                                                    <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                                    </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch2Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                                      </span> units
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                          :
                                          sameDateMatch2Weeks(ele)?.ActivityTypeID === 7 ?
                                            <>
                                              <li style={{ color: '#ee8322' }} className='hover-on-text'>+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative', zIndex: 99999 }}>
                                                <div className='on-hover'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch2Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                                        </span> units
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </> :
                                            <>
                                              <li style={{ color: '#0000' }} className='hover-on-text'>+ {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative', zIndex: 99999 }}>
                                                <div className='on-hover'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover'>+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch2Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                                        </span> units
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                  }
                                  {
                                    automaticAdjustSameDates2weeks(ele)?.map((data) => {
                                      return <>
                                        {
                                          data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 5 ?
                                            <><li style={{ color: '#267f13' }} className='hover-on-text'>+{data.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative', zIndex: 99999 }}>
                                                <div className='on-hover'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover' style={{ color: '#267f13' }}>+{data?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                        {data?.AdjustedDoseAmount}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                          {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                        </span> units
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </>

                                            :
                                            data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 14 ?
                                              <> <li style={{ color: '#000' }} className="hover-on-text">+{data.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative', zIndex: 99999 }}>
                                                  <div className='on-hover'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover' style={{ color: '#000' }}>+{data?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                          {data?.AdjustedDoseAmount}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                            {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </>

                                              :
                                              data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 3 ?
                                                <><li style={{ color: '#1ca6d9' }} className="hover-on-text">+{data.AdjustedDoseAmount}</li>
                                                  <div style={{ position: 'relative', zIndex: 99999 }}>
                                                    <div className='on-hover'>
                                                      <div className='row'>
                                                        <div className='col-md-3'>
                                                          <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>+{data?.AdjustedDoseAmount}</p>
                                                          <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                          <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                        </div>
                                                        <div className='col-md-9'>
                                                          <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                            {data?.AdjustedDoseAmount}
                                                          </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                              {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                            </span> units
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                                :
                                                data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 7 ?
                                                  <>  <li style={{ color: '#ee8322' }} className="hover-on-text">+{data.AdjustedDoseAmount}</li>
                                                    <div style={{ position: 'relative', zIndex: 99999 }}>
                                                      <div className='on-hover'>
                                                        <div className='row'>
                                                          <div className='col-md-3'>
                                                            <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>+{data?.AdjustedDoseAmount}</p>
                                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                            <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                          </div>
                                                          <div className='col-md-9'>
                                                            <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                              {data?.AdjustedDoseAmount}
                                                            </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                                {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                              </span> units
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                                  :
                                                  null
                                        }
                                      </>
                                    })}
                                </div>
                                :
                                <><div className="hover-on-text" style={{fontWeight:700}}>+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</div>
                                  <div style={{ position: 'relative', zIndex: 99999 }}>
                                    <div className='on-hover' style={{ right: '24px' }}>
                                      <div className='row'>
                                        <div className='col-md-3'>
                                          <p className='adjust-unit-hover'>+{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                          <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                          {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" /> */}
                                        </div>
                                        <div className='col-md-9'>
                                          <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                            {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                          </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch2Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                              {sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}
                                            </span> units
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                            }
                          </div>

                        </> :

                        weeks2[ele] === new Date(sameDateMatch2Weeks(ele)?.Date).toString().slice(4, 15)
                          &&
                          (sameDateMatch2Weeks(ele)?.AdjustedDoseAmount < 0)
                          &&
                          (sameDateMatch2Weeks(ele)?.IAPSatus === 4
                            || sameDateMatch2Weeks(ele)?.IAPSatus === 5 || sameDateMatch2Weeks(ele)?.IAPSatus === 6
                            || sameDateMatch2Weeks(ele)?.IAPSatus === 7 || sameDateMatch2Weeks(ele)?.IAPSatus === 8
                            || sameDateMatch2Weeks(ele)?.IAPSatus === 9 || sameDateMatch2Weeks(ele)?.IAPSatus === 0
                          )
                          ?
                          <>
                            <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                              {
                                (automaticAdjustSameDates?.length > 0) && (weeks2[ele] === new Date(automaticAdjustSameDates2weeks(ele)[0]?.Date).toString().slice(4, 15)) ?
                                  <div style={{ margin: '10px 0 10px 0' }}>
                                    {
                                      sameDateMatch2Weeks(ele)?.ActivityTypeID === 5 ?
                                        <>
                                          <li style={{ color: '#267f13' }} className="hover-on-text">{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</li>
                                          <div style={{ position: 'relative' }}>
                                            <div className='on-hover'>
                                              <div className='row'>
                                                <div className='col-md-3'>
                                                  <p className='adjust-unit-hover' style={{ color: '#267f13' }}>{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                                  <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                  <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                </div>
                                                <div className='col-md-9'>
                                                  <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                    {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                  </span> units from <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch2Weeks(ele)?.RecommendedDose}
                                                    </span> to <span style={{ fontWeight: 'bold' }}>
                                                      {(sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount)}
                                                    </span> units
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                        :
                                        sameDateMatch2Weeks(ele)?.ActivityTypeID === 14 ?
                                          <>
                                            <li style={{ color: '#000' }} className="hover-on-text">{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</li>
                                            <div style={{ position: 'relative' }}>
                                              <div className='on-hover'>
                                                <div className='row'>
                                                  <div className='col-md-3'>
                                                    <p className='adjust-unit-hover' style={{ color: '#000' }}>{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                                    <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                    <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                  </div>
                                                  <div className='col-md-9'>
                                                    <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                    </span> units from <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch2Weeks(ele)?.RecommendedDose}
                                                      </span> to <span style={{ fontWeight: 'bold' }}>
                                                        {(sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount)}
                                                      </span> units
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </> :
                                          sameDateMatch2Weeks(ele)?.ActivityTypeID === 3 ?
                                            <>
                                              <li style={{ color: '#1ca6d9' }} className="hover-on-text">{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative' }}>
                                                <div className='on-hover'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch2Weeks(ele)?.RecommendedDose}
                                                        </span> to <span style={{ fontWeight: 'bold' }}>
                                                          {(sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount)}
                                                        </span> units
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </> :
                                            sameDateMatch2Weeks(ele)?.ActivityTypeID === 7 ?
                                              <><li style={{ color: '#ee8322' }} className="hover-on-text">{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>
                                                            {sameDateMatch2Weeks(ele)?.RecommendedDose}
                                                          </span> to <span style={{ fontWeight: 'bold' }}>
                                                            {(sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount)}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </> :
                                              <><li style={{ color: '#0000' }} className="hover-on-text">- {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover'>{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>
                                                            {sameDateMatch2Weeks(ele)?.RecommendedDose}
                                                          </span> to <span style={{ fontWeight: 'bold' }}>
                                                            {(sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount)}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </>
                                    }
                                    {
                                      automaticAdjustSameDates2weeks(ele)?.map((data) => {
                                        return <>
                                          {
                                            data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 5 ?
                                              <> <li style={{ color: '#267f13' }} className="hover-on-text">{data.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover' style={{ color: '#267f13' }}>{data?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                          {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>
                                                            {data?.RecommendedDose}
                                                          </span> to <span style={{ fontWeight: 'bold' }}>
                                                            {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </>
                                              :
                                              data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 14 ?
                                                <><li style={{ color: '#000' }} className="hover-on-text">{data.AdjustedDoseAmount}</li>
                                                  <div style={{ position: 'relative' }}>
                                                    <div className='on-hover'>
                                                      <div className='row'>
                                                        <div className='col-md-3'>
                                                          <p className='adjust-unit-hover' style={{ color: '#000' }}>{data?.AdjustedDoseAmount}</p>
                                                          <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                          <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                        </div>
                                                        <div className='col-md-9'>
                                                          <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                            {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                          </span> units from <span style={{ fontWeight: 'bold' }}>
                                                              {data?.RecommendedDose}
                                                            </span> to <span style={{ fontWeight: 'bold' }}>
                                                              {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                            </span> units
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>

                                                :
                                                data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 3 ?
                                                  <>
                                                    <li style={{ color: '#1ca6d9' }} className="hover-on-text">{data.AdjustedDoseAmount}</li>
                                                    <div style={{ position: 'relative' }}>
                                                      <div className='on-hover'>
                                                        <div className='row'>
                                                          <div className='col-md-3'>
                                                            <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>{data?.AdjustedDoseAmount}</p>
                                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                            <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                          </div>
                                                          <div className='col-md-9'>
                                                            <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                              {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                            </span> units from <span style={{ fontWeight: 'bold' }}>
                                                                {data?.RecommendedDose}
                                                              </span> to <span style={{ fontWeight: 'bold' }}>
                                                                {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                              </span> units
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </> :
                                                  data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 7 ?
                                                    <><li style={{ color: '#ee8322' }} className="hover-on-text">{data.AdjustedDoseAmount}</li>
                                                      <div style={{ position: 'relative' }}>
                                                        <div className='on-hover'>
                                                          <div className='row'>
                                                            <div className='col-md-3'>
                                                              <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>{data?.AdjustedDoseAmount}</p>
                                                              <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                              <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" />
                                                            </div>
                                                            <div className='col-md-9'>
                                                              <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                                {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                              </span> units from <span style={{ fontWeight: 'bold' }}>
                                                                  {data?.RecommendedDose}
                                                                </span> to <span style={{ fontWeight: 'bold' }}>
                                                                  {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                                </span> units
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </> :
                                                    null
                                          }
                                        </>
                                      })}

                                  </div>
                                  :
                                  <><div className="hover-on-text" style={{fontWeight:700}}>{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</div>
                                    <div style={{ position: 'relative' }}>
                                      <div className='on-hover' style={{ right: '24px' }}>
                                        <div className='row'>
                                          <div className='col-md-3'>
                                            <p className='adjust-unit-hover'>{sameDateMatch2Weeks(ele)?.AdjustedDoseAmount}</p>
                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                            {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" /> */}
                                          </div>
                                          <div className='col-md-9'>
                                            <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                              {sameDateMatch2Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                            </span> units from <span style={{ fontWeight: 'bold' }}>
                                                {sameDateMatch2Weeks(ele)?.RecommendedDose}
                                              </span> to <span style={{ fontWeight: 'bold' }}>
                                                {(sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount)}
                                              </span> units
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>

                              }
                            </div>

                          </> :

                          weeks2[ele] === new Date(sameDateMatch2Weeks(ele)?.Date).toString().slice(4, 15)
                            &&
                            (sameDateMatch2Weeks(ele)?.IAPSatus === 10)
                            ?
                            <>
                              <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                                <div className="hover-on-text">
                                  <img alt="icons" src={greenFlaskHover} className="flask-img resumed" />
                                  <span className="flask-text" style={{ top: "-3px" }}>Resumed</span>
                                </div>
                                <div style={{ position: 'relative' }}>
                                  <div className='on-hover' style={{ right: '42px' }}>
                                    <div className='row'>
                                      <div className='col-md-3'>
                                        {/* <p className='adjust-unit-hover'>{sameDateMatch2Weeks(ele)?.RecommendedDose}</p> */}
                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                        {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" /> */}
                                      </div>
                                      <div className='col-md-9'>
                                        <p className='adjust-text-hover'>The Insulin Adjustment Program automatically resumed, holding the {text?.toLowerCase()} dose at <span style={{ fontWeight: 'bold' }}>{(sameDateMatch2Weeks(ele)?.RecommendedDose + sameDateMatch2Weeks(ele)?.AdjustedDoseAmount)} </span>units.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </> :

                            weeks2[ele] === new Date(sameDateMatch2Weeks(ele)?.Date).toString().slice(4, 15)
                              &&
                              (sameDateMatch2Weeks(ele)?.IAPSatus === 3)
                              ?
                              <>
                                <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                                  <div className="hover-on-text">
                                    <img alt="icons" src={greyFlask} className="flask-img" />
                                    <span className="flask-text" >Paused</span>
                                  </div>
                                  <div style={{ position: 'relative' }}>
                                    <div className='on-hover' style={{ right: '42px' }}>
                                      <div className='row'>
                                        <div className='col-md-3'>
                                          {/* <p className='adjust-unit-hover'>{sameDateMatch2Weeks(ele)?.RecommendedDose}</p> */}
                                          <img alt="icons" src={greyFlask} className='tooltip-img' />
                                          {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" /> */}
                                        </div>
                                        <div className='col-md-9'>
                                          <p className='adjust-text-hover'>The Insulin Adjustment Program automatically paused, holding the {text?.toLowerCase()} dose at <span style={{ fontWeight: 'bold' }}>{sameDateMatch2Weeks(ele)?.RecommendedDose} </span>units.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>


                              </> :
                              weeks2[ele] === new Date(sameDateMatch2Weeks(ele)?.Date).toString().slice(4, 15)
                                &&
                                (sameDateMatch2Weeks(ele)?.IAPSatus === 2)
                                ?
                                <>
                                  <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                                    <div className="hover-on-text">
                                      <img alt="icons" src={greenFlaskHover} className="flask-img" />
                                      <span className="flask-text" >Started</span>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                      <div className='on-hover' style={{ right: '42px' }}>
                                        <div className='row'>
                                          <div className='col-md-3'>
                                            <p className='adjust-unit-hover'>{sameDateMatch2Weeks(ele)?.RecommendedDose}</p>
                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                            {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip" /> */}
                                          </div>
                                          <div className='col-md-9'>
                                            <p className='adjust-text-hover'>The Insulin Adjustment Program started the {text} dose at <span style={{ fontWeight: 'bold' }}>{sameDateMatch2Weeks(ele)?.RecommendedDose} </span>unit(s).
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                                : <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}></div>
                    }
                  </>
                })
              }
            </div> :

            <div className="automatic-adjust-right fourweeks">
              <div className='last-vertical-line-four-weeks'></div>
              {
                dateIndex4?.slice(0, 21).map((ele) => {
                  return <>
                    {
                      weeks4[ele] === new Date(sameDateMatch4Weeks(ele)?.Date).toString().slice(4, 15)
                        &&
                        (sameDateMatch4Weeks(ele)?.AdjustedDoseAmount > 0)
                        &&
                        (sameDateMatch4Weeks(ele)?.IAPSatus === 4
                          || sameDateMatch4Weeks(ele)?.IAPSatus === 5 || sameDateMatch4Weeks(ele)?.IAPSatus === 6
                          || sameDateMatch4Weeks(ele)?.IAPSatus === 7 || sameDateMatch4Weeks(ele)?.IAPSatus === 8
                          || sameDateMatch4Weeks(ele)?.IAPSatus === 9 || sameDateMatch4Weeks(ele)?.IAPSatus === 0
                        )
                        ?
                        <>
                          <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>

                            {
                              (automaticAdjustSameDates?.length > 0) && (weeks4[ele] === new Date(automaticAdjustSameDates4weeks(ele)[0]?.Date).toString().slice(4, 15)) ?

                                <div style={{ margin: '10px 0 10px 0' }}>
                                  {
                                    sameDateMatch4Weeks(ele)?.ActivityTypeID === 5 ?
                                      <>
                                        <li style={{ color: '#267f13' }} className='tooltip-4weeks'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                        <div style={{ position: 'relative' }}>
                                          <div className='on-hover-4weeks'>
                                            <div className='row'>
                                              <div className='col-md-3'>
                                                <p className='adjust-unit-hover' style={{ color: '#267f13' }}>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                              </div>
                                              <div className='col-md-9'>
                                                <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                  {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                    {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                  </span> units

                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </> :
                                      sameDateMatch4Weeks(ele)?.ActivityTypeID === 14 ?
                                        <>
                                          <li style={{ color: '#000' }} className='tooltip-4weeks'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                          <div style={{ position: 'relative' }}>
                                            <div className='on-hover-4weeks'>
                                              <div className='row'>
                                                <div className='col-md-3'>
                                                  <p className='adjust-unit-hover' style={{ color: '#000' }}>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                  <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                  <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                </div>
                                                <div className='col-md-9'>
                                                  <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                    {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                  </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                    </span> units
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </> :
                                        sameDateMatch4Weeks(ele)?.ActivityTypeID === 3 ?
                                          <><li style={{ color: '#1ca6d9' }} className='tooltip-4weeks'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                            <div style={{ position: 'relative' }}>
                                              <div className='on-hover-4weeks'>
                                                <div className='row'>
                                                  <div className='col-md-3'>
                                                    <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                    <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                    <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                  </div>
                                                  <div className='col-md-9'>
                                                    <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                    </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                      </span> units
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </> :
                                          sameDateMatch4Weeks(ele)?.ActivityTypeID === 7 ?
                                            <>
                                              <li style={{ color: '#ee8322' }} className='tooltip-4weeks'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative' }}>
                                                <div className='on-hover-4weeks'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                        </span> units
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </> :
                                            <>
                                              <li style={{ color: '#0000' }} className='tooltip-4weeks'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative' }}>
                                                <div className='on-hover-4weeks'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                        </span> units
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                  }
                                  {
                                    automaticAdjustSameDates4weeks(ele)?.map((data) => {
                                      return <>
                                        {
                                          data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 5 ?
                                            <><li style={{ color: '#267f13' }} className='tooltip-4weeks'>+{data.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative' }}>
                                                <div className='on-hover-4weeks'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover' style={{ color: '#267f13' }}>+{data?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                        {data?.AdjustedDoseAmount}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                          {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                        </span> units

                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </> :
                                            data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 14 ?
                                              <><li style={{ color: '#000' }} className='tooltip-4weeks'>+{data.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover-4weeks'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover' style={{ color: '#000' }}>+{data?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                          {data?.AdjustedDoseAmount}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                            {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </> :
                                              data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 3 ?
                                                <> <li style={{ color: '#1ca6d9' }} className='tooltip-4weeks'>+{data.AdjustedDoseAmount}</li>
                                                  <div style={{ position: 'relative' }}>
                                                    <div className='on-hover-4weeks'>
                                                      <div className='row'>
                                                        <div className='col-md-3'>
                                                          <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>+{data?.AdjustedDoseAmount}</p>
                                                          <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                          <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                        </div>
                                                        <div className='col-md-9'>
                                                          <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                            {data?.AdjustedDoseAmount}
                                                          </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                              {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                            </span> units
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </> :
                                                data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 7 ?
                                                  <><li style={{ color: '#ee8322' }} className='tooltip-4weeks'>+{data.AdjustedDoseAmount}</li>
                                                    <div style={{ position: 'relative' }}>
                                                      <div className='on-hover-4weeks' >
                                                        <div className='row'>
                                                          <div className='col-md-3'>
                                                            <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>+{data?.AdjustedDoseAmount}</p>
                                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                            <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                          </div>
                                                          <div className='col-md-9'>
                                                            <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                              {data?.AdjustedDoseAmount}
                                                            </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                                {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                              </span> units
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </> :
                                                  null
                                        }
                                      </>
                                    })
                                  }
                                </div>
                                :
                                <><div className='tooltip-4weeks' style={{fontWeight:700}}>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</div>
                                  <div style={{ position: 'relative' }}>
                                    <div className='on-hover-4weeks' style={{ left: '3px' }}>
                                      <div className='row'>
                                        <div className='col-md-3'>
                                          <p className='adjust-unit-hover'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                          <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                          {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" /> */}
                                        </div>
                                        <div className='col-md-9'>
                                          <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                            {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                          </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                              {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                            </span> units

                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                            }
                          </div>
                        </>
                        :

                        weeks4[ele] === new Date(sameDateMatch4Weeks(ele)?.Date).toString().slice(4, 15)
                          &&
                          (sameDateMatch4Weeks(ele)?.AdjustedDoseAmount < 0)
                          &&
                          (sameDateMatch4Weeks(ele)?.IAPSatus === 4
                            || sameDateMatch4Weeks(ele)?.IAPSatus === 5 || sameDateMatch4Weeks(ele)?.IAPSatus === 6
                            || sameDateMatch4Weeks(ele)?.IAPSatus === 7 || sameDateMatch4Weeks(ele)?.IAPSatus === 8
                            || sameDateMatch4Weeks(ele)?.IAPSatus === 9 || sameDateMatch4Weeks(ele)?.IAPSatus === 0
                          )
                          ?
                          <>
                            <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list tooltip-4weeks fweeks'}>
                              {
                                (automaticAdjustSameDates?.length > 0) && (weeks4[ele] === new Date(automaticAdjustSameDates4weeks(ele)[0]?.Date).toString().slice(4, 15)) ?
                                  <div style={{ margin: '10px 0 10px 0' }}>
                                    {
                                      sameDateMatch4Weeks(ele)?.ActivityTypeID === 5 ?
                                        <>
                                          <li style={{ color: '#267f13' }} className='tooltip-4weeks'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                          <div style={{ position: 'relative' }}>
                                            <div className='on-hover-4weeks'>
                                              <div className='row'>
                                                <div className='col-md-3'>
                                                  <p className='adjust-unit-hover' style={{ color: '#267f13' }}>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                  <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                  <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                </div>
                                                <div className='col-md-9'>
                                                  <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                    {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                  </span> units from <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                                    </span> to <span style={{ fontWeight: 'bold' }}>
                                                      {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                                    </span> units
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </> :
                                        sameDateMatch4Weeks(ele)?.ActivityTypeID === 14 ?
                                          <><li style={{ color: '#000' }} className='tooltip-4weeks'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                            <div style={{ position: 'relative' }}>
                                              <div className='on-hover-4weeks'>
                                                <div className='row'>
                                                  <div className='col-md-3'>
                                                    <p className='adjust-unit-hover' style={{ color: '#000' }}>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                    <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                    <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                  </div>
                                                  <div className='col-md-9'>
                                                    <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                    </span> units from <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                                      </span> to <span style={{ fontWeight: 'bold' }}>
                                                        {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                                      </span> units
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </> :
                                          sameDateMatch4Weeks(ele)?.ActivityTypeID === 3 ?
                                            <><li style={{ color: '#1ca6d9' }} className='tooltip-4weeks'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative' }}>
                                                <div className='on-hover-4weeks'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                                        </span> to <span style={{ fontWeight: 'bold' }}>
                                                          {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                                        </span> units
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </> :
                                            sameDateMatch4Weeks(ele)?.ActivityTypeID === 7 ?
                                              <> <li style={{ color: '#ee8322' }} className='tooltip-4weeks'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover-4weeks'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>
                                                            {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                                          </span> to <span style={{ fontWeight: 'bold' }}>
                                                            {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </> :
                                              <><li style={{ color: '#0000' }} className='tooltip-4weeks'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover-4weeks'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>
                                                            {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                                          </span> to <span style={{ fontWeight: 'bold' }}>
                                                            {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </>
                                    }

                                    {
                                      automaticAdjustSameDates4weeks(ele)?.map((data) => {
                                        return <>
                                          {
                                            data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 5 ?
                                              <><li style={{ color: '#267f13' }} className='tooltip-4weeks'>{data.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover-4weeks'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover' style={{ color: '#267f13' }}>{data?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                          {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>
                                                            {data?.RecommendedDose}
                                                          </span> to <span style={{ fontWeight: 'bold' }}>
                                                            {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </> :
                                              data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 14 ?
                                                <><li style={{ color: '#000' }} className='tooltip-4weeks'>{data.AdjustedDoseAmount}</li>
                                                  <div style={{ position: 'relative' }}>
                                                    <div className='on-hover-4weeks'>
                                                      <div className='row'>
                                                        <div className='col-md-3'>
                                                          <p className='adjust-unit-hover' style={{ color: '#000' }}>{data?.AdjustedDoseAmount}</p>
                                                          <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                          <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                        </div>
                                                        <div className='col-md-9'>
                                                          <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                            {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                          </span> units from <span style={{ fontWeight: 'bold' }}>
                                                              {data?.RecommendedDose}
                                                            </span> to <span style={{ fontWeight: 'bold' }}>
                                                              {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                            </span> units
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </> :
                                                data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 3 ?
                                                  <><li style={{ color: '#1ca6d9' }} className='tooltip-4weeks'>{data.AdjustedDoseAmount}</li>
                                                    <div style={{ position: 'relative' }}>
                                                      <div className='on-hover-4weeks'>
                                                        <div className='row'>
                                                          <div className='col-md-3'>
                                                            <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>{data?.AdjustedDoseAmount}</p>
                                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                            <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                          </div>
                                                          <div className='col-md-9'>
                                                            <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                              {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                            </span> units from <span style={{ fontWeight: 'bold' }}>
                                                                {data?.RecommendedDose}
                                                              </span> to <span style={{ fontWeight: 'bold' }}>
                                                                {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                              </span> units
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </> :
                                                  data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 7 ?
                                                    <><li style={{ color: '#ee8322' }} className='tooltip-4weeks'>{data.AdjustedDoseAmount}</li>
                                                      <div style={{ position: 'relative' }}>
                                                        <div className='on-hover-4weeks'>
                                                          <div className='row'>
                                                            <div className='col-md-3'>
                                                              <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>{data?.AdjustedDoseAmount}</p>
                                                              <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                              <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" />
                                                            </div>
                                                            <div className='col-md-9'>
                                                              <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                                {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                              </span> units from <span style={{ fontWeight: 'bold' }}>
                                                                  {data?.RecommendedDose}
                                                                </span> to <span style={{ fontWeight: 'bold' }}>
                                                                  {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                                </span> units
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </> :
                                                    null
                                          }
                                        </>
                                      })}


                                  </div>
                                  :
                                  <>
                                    <li className='tooltip-4weeks' style={{fontWeight:700}}>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                    <div style={{ position: 'relative' }}>
                                      <div className='on-hover-4weeks' style={{ left: '3px' }}>
                                        <div className='row'>
                                          <div className='col-md-3'>
                                            <p className='adjust-unit-hover'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                            {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" /> */}
                                          </div>
                                          <div className='col-md-9'>
                                            <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                              {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                            </span> units from <span style={{ fontWeight: 'bold' }}>
                                                {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                              </span> to <span style={{ fontWeight: 'bold' }}>
                                                {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                              </span> units
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>

                              }
                            </div>

                          </>
                          :

                          weeks4[ele] === new Date(sameDateMatch4Weeks(ele)?.Date).toString().slice(4, 15)
                            &&
                            (sameDateMatch4Weeks(ele)?.IAPSatus === 10)
                            ?
                            <>
                              <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                                <div className='tooltip-4weeks'>
                                  <img alt="icons" src={greenFlaskHover} className="flask-img resumed" />
                                  <span className="flask-text" style={{ top: "-3px" }}>Resumed</span>
                                </div>
                                <div style={{ position: 'relative' }}>
                                  <div className='on-hover-4weeks' style={{ left: '3px' }}>
                                    <div className='row'>
                                      <div className='col-md-3'>
                                        {/* <p className='adjust-unit-hover'>{sameDateMatch4Weeks(ele)?.RecommendedDose}</p> */}
                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                        {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" /> */}
                                      </div>
                                      <div className='col-md-9'>
                                        <p className='adjust-text-hover'>The Insulin Adjustment Program automatically resumed, holding the {text?.toLowerCase()} dose at <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount} </span>units.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </>
                            :

                            weeks4[ele] === new Date(sameDateMatch4Weeks(ele)?.Date).toString().slice(4, 15)
                              &&
                              (sameDateMatch4Weeks(ele)?.IAPSatus === 3)
                              ? <>
                                <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                                  <div className='tooltip-4weeks'>
                                    <img alt="icons" src={greyFlask} className="flask-img" />
                                    <span className="flask-text" >Paused</span>
                                  </div>
                                  <div style={{ position: 'relative' }}>
                                    <div className='on-hover-4weeks' style={{ left: '3px' }}>
                                      <div className='row'>
                                        <div className='col-md-3'>
                                          {/* <p className='adjust-unit-hover'>{sameDateMatch4Weeks(ele)?.RecommendedDose}</p> */}
                                          <img alt="icons" src={greyFlask} className='tooltip-img' />
                                          {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" /> */}
                                        </div>
                                        <div className='col-md-9'>
                                          <p className='adjust-text-hover'>The Insulin Adjustment Program automatically paused, holding the {text?.toLowerCase()} dose at <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose} </span>units.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>


                              </>
                              :
                              weeks4[ele] === new Date(sameDateMatch4Weeks(ele)?.Date).toString().slice(4, 15)
                                &&
                                (sameDateMatch4Weeks(ele)?.IAPSatus === 2)
                                ?
                                <>
                                  <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                                    <div className='tooltip-4weeks'>
                                      <img alt="icons" src={greenFlaskHover} className="flask-img" />
                                      <span className="flask-text" >Started</span>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                      <div className='on-hover-4weeks' style={{ left: '3px' }}>
                                        <div className='row'>
                                          <div className='col-md-3'>
                                            <p className='adjust-unit-hover'>{sameDateMatch4Weeks(ele)?.RecommendedDose}</p>
                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                            {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks" /> */}
                                          </div>
                                          <div className='col-md-9'>
                                            <p className='adjust-text-hover'>The Insulin Adjustment Program started the {text} dose at <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose} </span>unit(s).
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                                : <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list tooltip-4weeks fweeks'}></div>
                    }
                  </>
                })
              }

              {/* for tooltip positioning left hand side */}
              {
                dateIndex4?.slice(-7)?.map((ele) => {
                  return <>
                    {
                      weeks4[ele] === new Date(sameDateMatch4Weeks(ele)?.Date).toString().slice(4, 15)
                        &&
                        (sameDateMatch4Weeks(ele)?.AdjustedDoseAmount > 0)
                        &&
                        (sameDateMatch4Weeks(ele)?.IAPSatus === 4
                          || sameDateMatch4Weeks(ele)?.IAPSatus === 5 || sameDateMatch4Weeks(ele)?.IAPSatus === 6
                          || sameDateMatch4Weeks(ele)?.IAPSatus === 7 || sameDateMatch4Weeks(ele)?.IAPSatus === 8
                          || sameDateMatch4Weeks(ele)?.IAPSatus === 9 || sameDateMatch4Weeks(ele)?.IAPSatus === 0
                        )
                        ?
                        <>
                          <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>

                            {
                              (automaticAdjustSameDates?.length > 0) && (weeks4[ele] === new Date(automaticAdjustSameDates4weeks(ele)[0]?.Date).toString().slice(4, 15)) ?

                                <div style={{ margin: '10px 0 10px 0' }}>
                                  {
                                    sameDateMatch4Weeks(ele)?.ActivityTypeID === 5 ?
                                      <>
                                        <li style={{ color: '#267f13' }} className='tooltip-4weeks-4t'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                        <div style={{ position: 'relative' }}>
                                          <div className='on-hover-4weeks-4t'>
                                            <div className='row'>
                                              <div className='col-md-3'>
                                                <p className='adjust-unit-hover' style={{ color: '#267f13' }}>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                              </div>
                                              <div className='col-md-9'>
                                                <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                  {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                    {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                  </span> units
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </> :
                                      sameDateMatch4Weeks(ele)?.ActivityTypeID === 14 ?
                                        <>
                                          <li style={{ color: '#000' }} className='tooltip-4weeks-4t'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                          <div style={{ position: 'relative' }}>
                                            <div className='on-hover-4weeks-4t'>
                                              <div className='row'>
                                                <div className='col-md-3'>
                                                  <p className='adjust-unit-hover' style={{ color: '#000' }}>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                  <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                  <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                </div>
                                                <div className='col-md-9'>
                                                  <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                    {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                  </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                    </span> units
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </> :
                                        sameDateMatch4Weeks(ele)?.ActivityTypeID === 3 ?
                                          <><li style={{ color: '#1ca6d9' }} className='tooltip-4weeks-4t'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                            <div style={{ position: 'relative' }}>
                                              <div className='on-hover-4weeks-4t'>
                                                <div className='row'>
                                                  <div className='col-md-3'>
                                                    <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                    <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                    <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                  </div>
                                                  <div className='col-md-9'>
                                                    <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                    </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                      </span> units
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </> :
                                          sameDateMatch4Weeks(ele)?.ActivityTypeID === 7 ?
                                            <>
                                              <li style={{ color: '#ee8322' }} className='tooltip-4weeks-4t'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative' }}>
                                                <div className='on-hover-4weeks-4t'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                        </span> units

                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </> :
                                            <>
                                              <li style={{ color: '#0000' }} className='tooltip-4weeks-4t'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative' }}>
                                                <div className='on-hover-4weeks-4t'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                                        </span> units
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                  }
                                  {
                                    automaticAdjustSameDates4weeks(ele)?.map((data) => {
                                      return <>
                                        {
                                          data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 5 ?
                                            <><li style={{ color: '#267f13' }} className='tooltip-4weeks-4t'>+{data.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative' }}>
                                                <div className='on-hover-4weeks-4t'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover' style={{ color: '#267f13' }}>+{data?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                        {data?.AdjustedDoseAmount}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                          {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                        </span> units
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </> :
                                            data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 14 ?
                                              <><li style={{ color: '#000' }} className='tooltip-4weeks-4t'>+{data.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover-4weeks-4t'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover' style={{ color: '#000' }}>+{data?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                          {data?.AdjustedDoseAmount}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                            {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </> :
                                              data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 3 ?
                                                <> <li style={{ color: '#1ca6d9' }} className='tooltip-4weeks-4t'>+{data.AdjustedDoseAmount}</li>
                                                  <div style={{ position: 'relative' }}>
                                                    <div className='on-hover-4weeks-4t'>
                                                      <div className='row'>
                                                        <div className='col-md-3'>
                                                          <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>+{data?.AdjustedDoseAmount}</p>
                                                          <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                          <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                        </div>
                                                        <div className='col-md-9'>
                                                          <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                            {data?.AdjustedDoseAmount}
                                                          </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                              {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                            </span> units
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </> :
                                                data?.AdjustedDoseAmount > 0 && data?.ActivityTypeID === 7 ?
                                                  <><li style={{ color: '#ee8322' }} className='tooltip-4weeks-4t'>+{data.AdjustedDoseAmount}</li>
                                                    <div style={{ position: 'relative' }}>
                                                      <div className='on-hover-4weeks-4t' >
                                                        <div className='row'>
                                                          <div className='col-md-3'>
                                                            <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>+{data?.AdjustedDoseAmount}</p>
                                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                            <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                          </div>
                                                          <div className='col-md-9'>
                                                            <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                                              {data?.AdjustedDoseAmount}
                                                            </span> units from <span style={{ fontWeight: 'bold' }}>{data?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                                                {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                              </span> units
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </> :
                                                  null
                                        }
                                      </>
                                    })
                                  }

                                </div>
                                :
                                <><div className='tooltip-4weeks-4t' style={{fontWeight:700}}>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</div>
                                  <div style={{ position: 'relative' }}>
                                    <div className='on-hover-4weeks-4t' style={{ left: '3px' }}>
                                      <div className='row'>
                                        <div className='col-md-3'>
                                          <p className='adjust-unit-hover'>+{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                          <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                          {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" /> */}
                                        </div>
                                        <div className='col-md-9'>
                                          <p className='adjust-text-hover'>{text} dose automatically increased <span style={{ fontWeight: 'bold' }}>
                                            {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                          </span> units from <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose}</span> to <span style={{ fontWeight: 'bold' }}>
                                              {sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}
                                            </span> units
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                            }
                          </div>
                        </>
                        :

                        weeks4[ele] === new Date(sameDateMatch4Weeks(ele)?.Date).toString().slice(4, 15)
                          &&
                          (sameDateMatch4Weeks(ele)?.AdjustedDoseAmount < 0)
                          &&
                          (sameDateMatch4Weeks(ele)?.IAPSatus === 4
                            || sameDateMatch4Weeks(ele)?.IAPSatus === 5 || sameDateMatch4Weeks(ele)?.IAPSatus === 6
                            || sameDateMatch4Weeks(ele)?.IAPSatus === 7 || sameDateMatch4Weeks(ele)?.IAPSatus === 8
                            || sameDateMatch4Weeks(ele)?.IAPSatus === 9 || sameDateMatch4Weeks(ele)?.IAPSatus === 0
                          )
                          ?
                          <>
                            <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list tooltip-4weeks-4t fweeks'}>
                              {
                                (automaticAdjustSameDates?.length > 0) && (weeks4[ele] === new Date(automaticAdjustSameDates4weeks(ele)[0]?.Date).toString().slice(4, 15)) ?
                                  <div style={{ margin: '10px 0 10px 0' }}>
                                    {
                                      sameDateMatch4Weeks(ele)?.ActivityTypeID === 5 ?
                                        <>
                                          <li style={{ color: '#267f13' }} className='tooltip-4weeks-4t'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                          <div style={{ position: 'relative' }}>
                                            <div className='on-hover-4weeks-4t'>
                                              <div className='row'>
                                                <div className='col-md-3'>
                                                  <p className='adjust-unit-hover' style={{ color: '#267f13' }}>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                  <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                  <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                </div>
                                                <div className='col-md-9'>
                                                  <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                    {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                  </span> units from <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                                    </span> to <span style={{ fontWeight: 'bold' }}>
                                                      {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                                    </span> units
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </> :
                                        sameDateMatch4Weeks(ele)?.ActivityTypeID === 14 ?
                                          <><li style={{ color: '#000' }} className='tooltip-4weeks-4t'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                            <div style={{ position: 'relative' }}>
                                              <div className='on-hover-4weeks-4t'>
                                                <div className='row'>
                                                  <div className='col-md-3'>
                                                    <p className='adjust-unit-hover' style={{ color: '#000' }}>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                    <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                    <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                  </div>
                                                  <div className='col-md-9'>
                                                    <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                      {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                    </span> units <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                                      </span> to <span style={{ fontWeight: 'bold' }}>
                                                        {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                                      </span> units
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </> :
                                          sameDateMatch4Weeks(ele)?.ActivityTypeID === 3 ?
                                            <><li style={{ color: '#1ca6d9' }} className='tooltip-4weeks-4t'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                              <div style={{ position: 'relative' }}>
                                                <div className='on-hover-4weeks-4t'>
                                                  <div className='row'>
                                                    <div className='col-md-3'>
                                                      <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                      <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                      <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                    </div>
                                                    <div className='col-md-9'>
                                                      <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                        {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                      </span> units from <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                                        </span> to <span style={{ fontWeight: 'bold' }}>
                                                          {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                                        </span> units
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </> :
                                            sameDateMatch4Weeks(ele)?.ActivityTypeID === 7 ?
                                              <> <li style={{ color: '#ee8322' }} className='tooltip-4weeks-4t'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover-4weeks-4t'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>
                                                            {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                                          </span> to <span style={{ fontWeight: 'bold' }}>
                                                            {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </> :
                                              <><li style={{ color: '#0000' }} className='tooltip-4weeks-4t'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover-4weeks-4t'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                          {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                        </span> units from <span style={{ fontWeight: 'bold' }}>
                                                            {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                                          </span> to <span style={{ fontWeight: 'bold' }}>
                                                            {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </>
                                    }

                                    {
                                      automaticAdjustSameDates4weeks(ele)?.map((data) => {
                                        return <>
                                          {
                                            data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 5 ?
                                              <><li style={{ color: '#267f13' }} className='tooltip-4weeks-4t'>{data.AdjustedDoseAmount}</li>
                                                <div style={{ position: 'relative' }}>
                                                  <div className='on-hover-4weeks-4t'>
                                                    <div className='row'>
                                                      <div className='col-md-3'>
                                                        <p className='adjust-unit-hover' style={{ color: '#267f13' }}>{data?.AdjustedDoseAmount}</p>
                                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                        <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                      </div>
                                                      <div className='col-md-9'>
                                                        <p className='adjust-text-hover'>{text} dose automatically decreased
                                                          <span style={{ fontWeight: 'bold', marginLeft: '3px' }}>
                                                            {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                          </span>  units from <span style={{ fontWeight: 'bold' }}>
                                                            {data?.RecommendedDose}
                                                          </span> to <span style={{ fontWeight: 'bold' }}>
                                                            {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                          </span> units
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </> :
                                              data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 14 ?
                                                <><li style={{ color: '#000' }} className='tooltip-4weeks-4t'>{data.AdjustedDoseAmount}</li>
                                                  <div style={{ position: 'relative' }}>
                                                    <div className='on-hover-4weeks-4t'>
                                                      <div className='row'>
                                                        <div className='col-md-3'>
                                                          <p className='adjust-unit-hover' style={{ color: '#000' }}>{data?.AdjustedDoseAmount}</p>
                                                          <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                          <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                        </div>
                                                        <div className='col-md-9'>
                                                          <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                            {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                          </span> units from <span style={{ fontWeight: 'bold' }}>
                                                              {data?.RecommendedDose}
                                                            </span> to <span style={{ fontWeight: 'bold' }}>
                                                              {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                            </span> units
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </> :
                                                data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 3 ?
                                                  <><li style={{ color: '#1ca6d9' }} className='tooltip-4weeks-4t'>{data?.AdjustedDoseAmount}</li>
                                                    <div style={{ position: 'relative' }}>
                                                      <div className='on-hover-4weeks-4t'>
                                                        <div className='row'>
                                                          <div className='col-md-3'>
                                                            <p className='adjust-unit-hover' style={{ color: '#1ca6d9' }}>{data?.AdjustedDoseAmount}</p>
                                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                            <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                          </div>
                                                          <div className='col-md-9'>
                                                            <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                              {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                            </span> units from <span style={{ fontWeight: 'bold' }}>
                                                                {data?.RecommendedDose}
                                                              </span> to <span style={{ fontWeight: 'bold' }}>
                                                                {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                              </span> units
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </> :
                                                  data?.AdjustedDoseAmount < 0 && data?.ActivityTypeID === 7 ?
                                                    <><li style={{ color: '#ee8322' }} className='tooltip-4weeks-4t'>{data.AdjustedDoseAmount}</li>
                                                      <div style={{ position: 'relative' }}>
                                                        <div className='on-hover-4weeks-4t'>
                                                          <div className='row'>
                                                            <div className='col-md-3'>
                                                              <p className='adjust-unit-hover' style={{ color: '#ee8322' }}>{data?.AdjustedDoseAmount}</p>
                                                              <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                                              <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" />
                                                            </div>
                                                            <div className='col-md-9'>
                                                              <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                                                {data?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                                              </span> units from <span style={{ fontWeight: 'bold' }}>
                                                                  {data?.RecommendedDose}
                                                                </span> to <span style={{ fontWeight: 'bold' }}>
                                                                  {data?.RecommendedDose + data?.AdjustedDoseAmount}
                                                                </span> units
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </> :
                                                    null
                                          }
                                        </>
                                      })}


                                  </div>
                                  :
                                  <>
                                    <li className='tooltip-4weeks-4t' style={{fontWeight:700}}>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</li>
                                    <div style={{ position: 'relative' }}>
                                      <div className='on-hover-4weeks-4t' style={{ left: '3px' }}>
                                        <div className='row'>
                                          <div className='col-md-3'>
                                            <p className='adjust-unit-hover'>{sameDateMatch4Weeks(ele)?.AdjustedDoseAmount}</p>
                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                            {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" /> */}
                                          </div>
                                          <div className='col-md-9'>
                                            <p className='adjust-text-hover'>{text} dose automatically decreased <span style={{ fontWeight: 'bold' }}>
                                              {sameDateMatch4Weeks(ele)?.AdjustedDoseAmount.toString().replace(/\-/g, "")}
                                            </span> units from <span style={{ fontWeight: 'bold' }}>
                                                {sameDateMatch4Weeks(ele)?.RecommendedDose}
                                              </span> to <span style={{ fontWeight: 'bold' }}>
                                                {(sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount)}
                                              </span> units
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>

                              }
                            </div>

                          </>
                          :

                          weeks4[ele] === new Date(sameDateMatch4Weeks(ele)?.Date).toString().slice(4, 15)
                            &&
                            (sameDateMatch4Weeks(ele)?.IAPSatus === 10)
                            ?
                            <>
                              <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                                <div className='tooltip-4weeks-4t'>
                                  <img alt="icons" src={greenFlaskHover} className="flask-img resumed" />
                                  <span className="flask-text" style={{ top: "-3px" }}>Resumed</span>
                                </div>
                                <div style={{ position: 'relative' }}>
                                  <div className='on-hover-4weeks-4t' style={{ left: '-24px' }}>
                                    <div className='row'>
                                      <div className='col-md-3'>
                                        {/* <p className='adjust-unit-hover'>{sameDateMatch4Weeks(ele)?.RecommendedDose}</p> */}
                                        <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                        {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" /> */}
                                      </div>
                                      <div className='col-md-9'>
                                        <p className='adjust-text-hover'>The Insulin Adjustment Program automatically resumed, holding the {text?.toLowerCase()} dose at <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose + sameDateMatch4Weeks(ele)?.AdjustedDoseAmount} </span>units.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </>
                            :

                            weeks4[ele] === new Date(sameDateMatch4Weeks(ele)?.Date).toString().slice(4, 15)
                              &&
                              (sameDateMatch4Weeks(ele)?.IAPSatus === 3)
                              ? <>
                                <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                                  <div className='tooltip-4weeks-4t'>
                                    <img alt="icons" src={greyFlask} className="flask-img" />
                                    <span className="flask-text" >Paused</span>
                                  </div>
                                  <div style={{ position: 'relative' }}>
                                    <div className='on-hover-4weeks-4t' style={{ left: '-24px' }}>
                                      <div className='row'>
                                        <div className='col-md-3'>
                                          {/* <p className='adjust-unit-hover'>{sameDateMatch4Weeks(ele)?.RecommendedDose}</p> */}
                                          <img alt="icons" src={greyFlask} className='tooltip-img' />
                                          {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" /> */}
                                        </div>
                                        <div className='col-md-9'>
                                          <p className='adjust-text-hover'>The Insulin Adjustment Program automatically paused, holding the {text?.toLowerCase()} dose at <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose} </span>units.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>


                              </>
                              :
                              weeks4[ele] === new Date(sameDateMatch4Weeks(ele)?.Date).toString().slice(4, 15)
                                &&
                                (sameDateMatch4Weeks(ele)?.IAPSatus === 2)
                                ?
                                <>
                                  <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list fweeks'}>
                                    <div className='tooltip-4weeks-4t'>
                                      <img alt="icons" src={greenFlaskHover} className="flask-img" />
                                      <span className="flask-text" >Started</span>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                      <div className='on-hover-4weeks-4t' style={{ left: '-24px' }}>
                                        <div className='row'>
                                          <div className='col-md-3'>
                                            <p className='adjust-unit-hover'>{sameDateMatch4Weeks(ele)?.RecommendedDose}</p>
                                            <img alt="icons" src={greenFlaskHover} className='tooltip-img' />
                                            {/* <img src={tooltipIcon} alt="icon" className="ajust-hover-tooltip-4weeks-4t" /> */}
                                          </div>
                                          <div className='col-md-9'>
                                            <p className='adjust-text-hover'>The Insulin Adjustment Program started the {text} dose at <span style={{ fontWeight: 'bold' }}>{sameDateMatch4Weeks(ele)?.RecommendedDose} </span>unit(s).
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                                : <div className={selectedGraphTab === "2weeks" ? 'automatic-adjust-list' : 'automatic-adjust-list tooltip-4weeks-4t fweeks'}></div>
                    }
                  </>
                })
              }
            </div>
        }
      </div>
    </div>
  }




  return (
    <>
      {/* for IAP users Basal */}
      {
        titrationType === 2 ?
          <>
            <p className='insulin-graph-heading'>{t("DoseAdjustment.dailyInsulinBasal")}</p>
            <div className={selectedGraphTab === "2weeks" ? " " : "automatic-adjustment-graph"} >
              {/* <p className='insulin-graph-heading'>Insulin Dose Summary</p> */}
              {loader ?
                <>
                  <div><Loader margin={"50px auto 0"} /></div>
                </> :
                <>
                  {
                    basalIap?.length > 0 ?
                      <>
                        <div className={selectedGraphTab === "4weeks" ? "main-wrapper-insulin" : ""}>
                          <div className={selectedGraphTab === "4weeks" ? "graph-wrapper-insulin" : ""}>
                            {/* {selectedGraphTab === "4weeks" ? <Yaxis /> : null} */}

                            <ResponsiveContainer
                              width={selectedGraphTab === "4weeks" ? 1379 : "100%"}
                              height={selectedGraphTab === "4weeks" ? 180 : 180}
                              className={selectedGraphTab === "4weeks" ? "container-wrapper-insulin" : "container-wrapper-insulin1"}
                            >
                              <BarChart margin={{ left: 52 }} data={mainDataBasal}>
                                {selectedGraphTab === "4weeks" ?
                                  <XAxis
                                    dataKey="Date"
                                    stroke="#a6c0c9"
                                    strokeWidth={1}
                                    type="number"
                                    domain={domain(27)}
                                    interval={0}
                                    tickLine={false}
                                    tickFormatter={dateFormatter(27)}
                                    ticks={getXaxisTicks(27, 30)}
                                    scale='time'
                                    orientation="top"
                                    padding={{ right: 1 }}

                                    tick={({ x, y, payload, ...props }) => {
                                      let path = payload.value;
                                      return (
                                        <>

                                          <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                            {moment(path).format('D')}
                                          </text>

                                          {props.index === 0 && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                          {moment(path).format('D') === "1" && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                        </>
                                      );
                                    }}
                                  /> : <XAxis
                                    dataKey="Date"
                                    stroke="#a6c0c9"
                                    strokeWidth={1}
                                    type="number"
                                    domain={domain(13)}
                                    interval={0}
                                    tickLine={false}
                                    tickFormatter={dateFormatter(13)}
                                    ticks={getXaxisTicks(13, 15)}
                                    scale='time'
                                    orientation="top"
                                    padding={{ right: 1 }}

                                    tick={({ x, y, payload, ...props }) => {
                                      let path = payload.value;
                                      return (
                                        <>

                                          <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                            {moment(path).format('D')}
                                          </text>

                                          {props.index === 0 && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                          {moment(path).format('D') === "1" && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                        </>
                                      );
                                    }}
                                  />}
                                <Tooltip content={<BasalRegimenTooltip />} cursor={false} />
                                {/* <Tooltip content={< />} cursor={false} /> */}
                                {/* {selectedGraphTab === "4weeks" ?
                             <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
                               hide
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             /> : <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
           
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             />} */}
                                <YAxis
                                  type="number"
                                  stroke="#a6c0c9"
                                  strokeWidth={1}
                                  style={{
                                    fontSize: '1rem'
                                  }}

                                  tickCount={4}
                                  padding={{ top: 40 }}
                                  tickLine={false}
                                  label={
                                    <AxisLabel1 x={0} y={100}></AxisLabel1>
                                  }
                                  ticks={getYaxisLabels(basalIap)}
                                  interval={0}
                                  tick={(props) => {
                                    const value = props.payload.value;
                                    if (value === 0) {
                                      return (
                                        <text x={props.x - 4} y={props.y - 2} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }
                                    else if (value === 5) {
                                      return (
                                        <text x={props.x - 5} y={props.y + 1} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }
                                    else if (value >= 100) {
                                      return (
                                        <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }

                                    else {
                                      return (
                                        <text x={props.x - 10} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }

                                  }}
                                />


                                <ReferenceLine y={0} stroke="#a6c0c9" strokeWidth={1} />

                                <CartesianGrid horizontal={false} stroke="#a6c0c9" strokeWidth={1} />
                                {/* <Legend wrapperStyle={{ top: 290}} content={<CustomizedLegend/>}/> */}

                                <Bar data={mainDataBasal} dataKey="Dose" name="Fasting" fill="#000" stroke="#000" barSize={6} strokeWidth={1} isAnimationActive={false} stackId="a" />
                                <Bar data={mainDataBasal} dataKey="ExcessDose" name="Fasting" fill="#fff" stroke="#000" barSize={6} strokeWidth={1} isAnimationActive={false} stackId="a" />
                                <Bar data={mainDataBasal} dataKey="BelowDose" name="Fasting" fill="#fff" stroke="#000" strokeDasharray="3 3" barSize={6} strokeWidth={1} isAnimationActive={false} stackId="a" />


                              </BarChart>
                            </ResponsiveContainer>

                          </div>
                        </div>
                        {/* <AutomaticAdjustment /> */}
                        {
                          AutomaticAdjustmentList?.length > 0 ?
                            <AutomaticAdjust text="Basal" /> : null
                        }


                        {/* legends */}
                        <div className="FirstRow" style={{ marginLeft: "114px", marginTop: "10px" , position:"absolute" }}>
                          <div className="row" >
                            <div className="col-sm-3">
                              <img alt="icons"
                                src={BlackLegend}
                                width="45"
                                height="15"
                                aria-label={t("Insulin Dose")}
                                tabIndex="0"
                              /> <br />
                              <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium" }}>{t("Common.FastingBasal")}</div>
                            </div>
                            <div className="col-sm-3" style={{ }}>
                              <img alt="icons"
                                src={MoreThanDose}
                                style={{marginLeft:"-23px"}}
                                width="45"
                                height="15"
                                aria-label={t("More than recommended dose")}
                                tabIndex="0"
                              /> <br />
                              <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft:"-71px",width:"300px" }}>{t("InsulinSummary.InsulinTitration.MoreThanRecommended")}</div>
                            </div>
                            <div className="col-sm-3" style={{  }}>
                              <img alt="icons"
                                src={LessThanDose}
                                width="45"
                                height="15"
                                aria-label={t("Less than recommended dose")}
                                tabIndex="0"
                              /> <br />
                              <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft:"-41px",width:"300px"}}>{t("InsulinSummary.InsulinTitration.LessThanRecommended")}</div>
                            </div>
                          </div>
                        </div>
                      </> :
                      <>
                        <h2 className="loading-text-graph">{t("BloodGlucoseGraph.noDataAvailable")}</h2>
                      </>
                  }
                </>
              }


            </div>

          </> : null

      }

      {/* for IAP users Bolus */}

      {
        titrationType === 3 ?
          <>
            <p className='insulin-graph-heading'>{t("DoseAdjustment.dailyInsulinBolus")}</p>
            <div className={selectedGraphTab === "2weeks" ? " " : "automatic-adjustment-graph"}>
              {/* <p className='insulin-graph-heading'>Insulin Dose Summary</p> */}
              {loader ?
                <>
                  <div><Loader margin={"50px auto 0"} /></div>
                </> :
                <>
                  {
                    bolusIap?.length > 0 || bolusbasalIap?.length > 0 ?
                      <>
                        <div className={selectedGraphTab === "4weeks" ? "main-wrapper-insulin" : ""}>
                          <div className={selectedGraphTab === "4weeks" ? "graph-wrapper-insulin" : ""}>
                            {/* {selectedGraphTab === "4weeks" ? <Yaxis/> : null} */}

                            <ResponsiveContainer
                              width={selectedGraphTab === "4weeks" ? 1379 : "100%"}
                              height={selectedGraphTab === "4weeks" ? 180 : 180}
                              className={selectedGraphTab === "4weeks" ? "container-wrapper-insulin" : "container-wrapper-insulin1"}
                            >

                              <BarChart margin={{ left: 52 }} data={mainData} barCategoryGap="17%">
                                {selectedGraphTab === "4weeks" ?
                                  <XAxis
                                    dataKey="Date"
                                    stroke="#a6c0c9"
                                    strokeWidth={1}
                                    type="number"
                                    domain={domain(27)}
                                    interval={0}
                                    tickLine={false}
                                    tickFormatter={dateFormatter(27)}
                                    ticks={getXaxisTicks(27, 30)}
                                    scale='time'
                                    orientation="top"
                                    padding={{ right: 1 }}

                                    tick={({ x, y, payload, ...props }) => {
                                      let path = payload.value;
                                      return (
                                        <>

                                          <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                            {moment(path).format('D')}
                                          </text>

                                          {props.index === 0 && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                          {moment(path).format('D') === "1" && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                        </>
                                      );
                                    }}
                                  /> : <XAxis
                                    dataKey="Date"
                                    stroke="#a6c0c9"
                                    strokeWidth={1}
                                    type="number"
                                    domain={domain(13)}
                                    interval={0}
                                    tickLine={false}
                                    tickFormatter={dateFormatter(13)}
                                    ticks={getXaxisTicks(13, 15)}
                                    scale='time'
                                    orientation="top"
                                    padding={{ right: 1 }}

                                    tick={({ x, y, payload, ...props }) => {
                                      let path = payload.value;
                                      return (
                                        <>

                                          <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                            {moment(path).format('D')}
                                          </text>

                                          {props.index === 0 && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                          {moment(path).format('D') === "1" && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                        </>
                                      );
                                    }}
                                  />}


                                <Tooltip wrapperStyle={{ zIndex: 99999 }} content={<BasalRegimenTooltip2 />} cursor={false} />
                                {/* {selectedGraphTab === "4weeks" ?
                             <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
                               hide
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             /> : <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
           
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             />} */}

                                <YAxis
                                  type="number"
                                  stroke="#a6c0c9"
                                  strokeWidth={1}
                                  style={{
                                    fontSize: '1rem'
                                  }}

                                  tickCount={4}
                                  padding={{ top: 40 }}
                                  tickLine={false}
                                  label={
                                    <AxisLabel1 x={0} y={100}></AxisLabel1>
                                  }
                                  ticks={getYaxisLabels(bolusYaxis)}
                                  interval={0}
                                  tick={(props) => {
                                    const value = props.payload.value;
                                    if (value === 0) {
                                      return (
                                        <text x={props.x - 4} y={props.y - 2} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }
                                    else if (value === 5) {
                                      return (
                                        <text x={props.x - 5} y={props.y + 1} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }
                                    else if (value >= 100) {
                                      return (
                                        <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }

                                    else {
                                      return (
                                        <text x={props.x - 10} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }

                                  }}
                                />


                                <ReferenceLine y={0} stroke="#a6c0c9" strokeWidth={1} />

                                <CartesianGrid horizontal={false} stroke="#a6c0c9" strokeWidth={1} />
                                {/* <Legend wrapperStyle={{ top: 290}} content={<CustomizedLegend/>}/> */}
                                <Bar data={FormatActivityList(bolusbasal,mainData.Breakfast,mainData.Lunch,mainData.Dinner)} dataKey="Dose" maxBarSize={1} name="Fasting" fill="#000" stroke="#000" strokeWidth={6} isAnimationActive={false} />
                                <Bar data={FormatActivityList(mainData.Breakfast,mainData.Lunch,mainData.Dinner,bolusbasal)} dataKey="Dose" maxBarSize={1} name="Breakfast" fill="#2CACDC" stroke="#2CACDC" strokeWidth={6} isAnimationActive={false} />
                                <Bar data={FormatActivityList(mainData.Lunch,mainData.Breakfast,mainData.Dinner,bolusbasal)} dataKey="Dose" maxBarSize={1} name="Before Lunch" fill="#267F13" stroke="#267F13" strokeWidth={6} isAnimationActive={false} />
                                <Bar data={FormatActivityList(mainData.Dinner,mainData.Lunch,mainData.Breakfast,bolusbasal)} dataKey="Dose" maxBarSize={1} name="Before Dinner" fill="#EE8322" stroke="#EE8322" strokeWidth={6} isAnimationActive={false} />

                                {/* <Bar data={mainData.BedTime} dataKey="Dose" maxBarSize={1} name="BedTime" fill="#ee8322" stroke="#ee8322" strokeWidth={6} isAnimationActive={false} /> */}


                                {/* <Bar data={mainData.Fasting} dataKey="Dose" maxBarSize={1} name="Fasting" fill="#000" stroke="#000" strokeWidth={6} isAnimationActive={false} />
                                       <Bar data={mainData.Lunch} dataKey="Dose" maxBarSize={1} name="Before Lunch" fill="#1ca6d9" stroke="#1ca6d9" strokeWidth={6} isAnimationActive={false} />
                                       <Bar data={mainData.Dinner} dataKey="Dose" maxBarSize={1} name="Before Dinner" fill="#267f13" stroke="#267f13" strokeWidth={6} isAnimationActive={false} />
                                       <Bar data={mainData.BedTime} dataKey="Dose" maxBarSize={1} name="BedTime" fill="#ee8322" stroke="#ee8322" strokeWidth={6} isAnimationActive={false} />
                                       <Bar data={mainData.Breakfast} dataKey="Dose" maxBarSize={1} name="Breakfast" fill="#000" stroke="#000" strokeWidth={6} isAnimationActive={false} />
                                        */}
                                {/* others */}
                                {/* <Bar data={mainData.Before_Exercise} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                       <Bar data={mainData.After_Exercise} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                       <Bar data={mainData.Snack} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                       <Bar data={mainData.Just_Checking} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                       <Bar data={mainData.AfterDinner} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                       <Bar data={mainData.AfterLunch} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                       <Bar data={mainData.AfterBreakfast} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} /> */}

                              </BarChart>
                            </ResponsiveContainer>

                          </div>
                        </div>
                        {/* <AutomaticAdjustment /> */}

                        {/* Automatic adjustment graph */}

                        {
                          AutomaticAdjustmentList?.length > 0 ?
                            <AutomaticAdjust text="Bolus" /> : null
                        }


                        {/* legends */}

                        <div className="FirstRow" style={{ marginLeft: "114px", marginTop: "10px", position:"absolute" }}>
                          <div className="row" >
                            <div className="col-sm-3">
                              <img alt="icons"
                                src={BlackLegend}
                                width="45"
                                height="15"
                                aria-label={t("Insulin Dose")}
                                tabIndex="0"
                              /> <br />
                              <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: '7px' }}>{t("Common.FastingBasal")}</div>
                            </div>
                            <div className="col-sm-3" style={{  }}>
                              <img alt="icons"
                                src={BlueLegend}
                                width="45"
                                height="15"
                                aria-label={t("More than recommended dose")}
                                tabIndex="0"
                              /> <br />
                              <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "-4px" }}>{t("Common.Breakfast")}</div>
                            </div>
                            <div className="col-sm-3" style={{  }}>
                              <img alt="icons"
                                src={GreenLegend}
                                width="45"
                                height="15"
                                aria-label={t("Less than recommended dose")}
                                tabIndex="0"
                              /> <br />
                              <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "4px" }}>{t("Common.Lunch")}</div>
                            </div>
                            <div className="col-sm-3" style={{ }}>
                              <img alt="icons"
                                src={OrangeLegend}
                                width="45"
                                height="15"
                                aria-label={t("Less than recommended dose")}
                                tabIndex="0"
                              /> <br />
                              <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: '4px' }}>{t("Common.Dinner")}</div>
                            </div>
                          </div>
                        </div>
                      </> :
                      <>
                        <h2 className="loading-text-graph">{t("BloodGlucoseGraph.noDataAvailable")}</h2>
                      </>
                  }
                </>
              }

            </div>

          </> : null

      }

      {/* for IAP users Premix */}

      {
        titrationType === 4 ?
          <>
            <p className='insulin-graph-heading'>{t("DoseAdjustment.dailyInsulinPremixed")}</p>
            <div className={selectedGraphTab === "2weeks" ? " " : "automatic-adjustment-graph"} >
              {/* <p className='insulin-graph-heading'>Insulin Dose Summary</p> */}
              {loader ?
                <>
                  <div><Loader margin={"50px auto 0"} /></div>
                </> :
                <>
                  {
                    premixIap?.length > 0 ?
                      <>
                        <div className={selectedGraphTab === "4weeks" ? "main-wrapper-insulin" : ""}>
                          <div className={selectedGraphTab === "4weeks" ? "graph-wrapper-insulin" : ""}>
                            {/* {selectedGraphTab === "4weeks" ? <Yaxis/> : null} */}

                            <ResponsiveContainer
                              width={selectedGraphTab === "4weeks" ? 1379 : "100%"}
                              height={selectedGraphTab === "4weeks" ? 180 : 180}
                              className={selectedGraphTab === "4weeks" ? "container-wrapper-insulin" : "container-wrapper-insulin1"}
                            >

                              <BarChart margin={{ left: 52 }} data={mainDataPremix} barCategoryGap="17%">
                                {selectedGraphTab === "4weeks" ?
                                  <XAxis
                                    dataKey="Date"
                                    stroke="#a6c0c9"
                                    strokeWidth={1}
                                    type="number"
                                    domain={domain(27)}
                                    interval={0}
                                    tickLine={false}
                                    tickFormatter={dateFormatter(27)}
                                    ticks={getXaxisTicks(27, 30)}
                                    scale='time'
                                    orientation="top"
                                    padding={{ right: 1 }}

                                    tick={({ x, y, payload, ...props }) => {
                                      let path = payload.value;
                                      return (
                                        <>

                                          <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                            {moment(path).format('D')}
                                          </text>

                                          {props.index === 0 && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                          {moment(path).format('D') === "1" && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                        </>
                                      );
                                    }}
                                  /> : <XAxis
                                    dataKey="Date"
                                    stroke="#a6c0c9"
                                    strokeWidth={1}
                                    type="number"
                                    domain={domain(13)}
                                    interval={0}
                                    tickLine={false}
                                    tickFormatter={dateFormatter(13)}
                                    ticks={getXaxisTicks(13, 15)}
                                    scale='time'
                                    orientation="top"
                                    padding={{ right: 1 }}

                                    tick={({ x, y, payload, ...props }) => {
                                      let path = payload.value;
                                      return (
                                        <>

                                          <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                            {moment(path).format('D')}
                                          </text>

                                          {props.index === 0 && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                          {moment(path).format('D') === "1" && (
                                            <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                              {getMonthNameShort(moment(path).format('M') - 1)}
                                            </text>
                                          )}
                                        </>
                                      );
                                    }}
                                  />}



                                <Tooltip content={<BasalRegimenTooltip3 />} cursor={false} />
                                {/* {selectedGraphTab === "4weeks" ?
                             <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
                               hide
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             /> : <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
           
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             />} */}

                                <YAxis
                                  type="number"
                                  stroke="#a6c0c9"
                                  strokeWidth={1}
                                  style={{
                                    fontSize: '1rem'
                                  }}

                                  tickCount={4}
                                  padding={{ top: 40 }}
                                  tickLine={false}
                                  label={
                                    <AxisLabel1 x={0} y={100}></AxisLabel1>
                                  }
                                  ticks={getYaxisLabels(premixIap)}
                                  interval={0}
                                  tick={(props) => {
                                    const value = props.payload.value;
                                    if (value === 0) {
                                      return (
                                        <text x={props.x - 4} y={props.y - 2} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }
                                    else if (value === 5) {
                                      return (
                                        <text x={props.x - 5} y={props.y + 1} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }
                                    else if (value >= 100) {
                                      return (
                                        <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }

                                    else {
                                      return (
                                        <text x={props.x - 10} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                          {value}
                                        </text>
                                      );
                                    }

                                  }}
                                />


                                <ReferenceLine y={0} stroke="#a6c0c9" strokeWidth={1} />

                                <CartesianGrid horizontal={false} stroke="#a6c0c9" strokeWidth={1} />
                                {/* <Legend wrapperStyle={{ top: 290}} content={<CustomizedLegend/>}/> */}

                                {/* <Bar data={premixbasal} maxBarSize={1} dataKey="Dose" name="Fasting" fill="#000" stroke="#000" strokeWidth={6} isAnimationActive={false} /> */}
                                <Bar data={FormatActivityList(mainDataPremix.Breakfast,mainDataPremix.Dinner,[])} dataKey="Dose" maxBarSize={1} name="Breakfast" fill="#2CACDC" stroke="#2CACDC" strokeWidth={6} isAnimationActive={false} />
                                {/* <Bar data={mainDataPremix.Lunch} dataKey="Dose" name="Before Lunch" fill="#1ca6d9" stroke="#1ca6d9" strokeWidth={6} isAnimationActive={false} /> */}
                                <Bar data={FormatActivityList(mainDataPremix.Dinner,mainDataPremix.Breakfast,[])} dataKey="Dose" maxBarSize={1} name="Before Dinner" fill="#EE8322" stroke="#EE8322" strokeWidth={6} isAnimationActive={false} />


                                {/* <Bar data={mainDataPremix.Fasting} dataKey="Dose" name="Fasting" fill="#000" stroke="#000" strokeWidth={6} isAnimationActive={false} />
                           <Bar data={mainDataPremix.Fasting} dataKey="ExcessDose" name="Fasting" fill="#000" stroke="#000" strokeWidth={6} isAnimationActive={false} />
                           <Bar data={mainDataPremix.Fasting} dataKey="BelowDose" name="Fasting" fill="#000" stroke="#000" strokeWidth={6} isAnimationActive={false} />
                           <Bar data={mainDataPremix.Dinner} dataKey="Dose" name="Before Dinner" fill="#267f13" stroke="#267f13" strokeWidth={6} isAnimationActive={false} />
                           <Bar data={mainDataPremix.Dinner} dataKey="ExcessDose" name="Before Dinner" fill="#267f13" stroke="#267f13" strokeWidth={6} isAnimationActive={false} />
                           <Bar data={mainDataPremix.Dinner} dataKey="BelowDose" name="Before Dinner" fill="#267f13" stroke="#267f13" strokeWidth={6} isAnimationActive={false} /> */}

                              </BarChart>
                            </ResponsiveContainer>

                          </div>
                        </div>
                        {/* <AutomaticAdjustment /> */}

                        {/* Automatic adjustment graph */}
                        {
                          AutomaticAdjustmentList?.length > 0 ?
                            <AutomaticAdjust text="Premixed" /> : null
                        }


                        {/* legends */}

                        <div className="FirstRow" style={{ marginLeft: "114px", marginTop: "10px" , position:"absolute" }}>
                          <div className="row" >
                            {/* <div className="col-sm-3" >
                               <img alt="icons"
                                 src={BlackLegend}
                                 width="45"
                                 height="15"
                                 aria-label={t("Insulin Dose")}
                                 tabIndex="0"
                               /> <br />
                               <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "5px" }}>{t("Common.FastingBasal")}</div>
                             </div> */}

                            <div className="col-sm-3" style={{ marginLeft: "0px" }}>
                              <img alt="icons"
                                src={BlueLegend}
                                width="45"
                                height="15"
                                aria-label={t("More than recommended dose")}
                                tabIndex="0"
                              /> <br />
                              <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "-4px" }}>{t("Common.Breakfast")}</div>
                            </div>

                            <div className="col-sm-3" style={{ marginRight: "140px" }}>
                              <img alt="icons"
                                src={OrangeLegend}
                                width="45"
                                height="15"
                                aria-label={t("Less than recommended dose")}
                                tabIndex="0"
                              /> <br />
                              <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "3px" }}>{t("Common.Dinner")}</div>
                            </div>

                          </div>
                        </div>
                      </> :
                      <>
                        <h2 className="loading-text-graph">{t("BloodGlucoseGraph.noDataAvailable")}</h2>
                      </>
                  }
                </>
              }

            </div>

          </> : null

      }


      {/* for Non IAP users */}

      {
        titrationType === 1 ?
          <>
            {/* Insulin Dose Basal Regimen start from here*/}

            {
              users?.isBasalUser === true ?
                <>
                  <p className='insulin-graph-heading'>{t("DoseAdjustment.dailyInsulinBasal")}</p>
                  <div className={selectedGraphTab === "2weeks" ? " " : "automatic-adjustment-graph"} >
                    {/* <p className='insulin-graph-heading'>Insulin Dose Summary</p> */}
                    {loader ?
                      <>
                        <div><Loader margin={"50px auto 0"} /></div>
                      </> :
                      <>
                        {
                          basalNonIap?.length > 0 ?
                            <>
                              <div className={selectedGraphTab === "4weeks" ? "main-wrapper-insulin" : ""}>
                                <div className={selectedGraphTab === "4weeks" ? "graph-wrapper-insulin" : ""}>
                                  {/* {selectedGraphTab === "4weeks" ? <Yaxis /> : null} */}

                                  <ResponsiveContainer
                                    width={selectedGraphTab === "4weeks" ? 1379 : "100%"}
                                    height={selectedGraphTab === "4weeks" ? 180 : 180}
                                    className={selectedGraphTab === "4weeks" ? "container-wrapper-insulin" : "container-wrapper-insulin1"}
                                  >
                                    <BarChart margin={{ left: 52 }} data={mainDataBasalNonIAP}>
                                      {selectedGraphTab === "4weeks" ?
                                        <XAxis
                                          dataKey="Date"
                                          stroke="#a6c0c9"
                                          strokeWidth={1}
                                          type="number"
                                          domain={domain(27)}
                                          interval={0}
                                          tickLine={false}
                                          tickFormatter={dateFormatter(27)}
                                          ticks={getXaxisTicks(27, 30)}
                                          scale='time'
                                          orientation="top"
                                          padding={{ right: 1 }}

                                          tick={({ x, y, payload, ...props }) => {
                                            let path = payload.value;
                                            return (
                                              <>

                                                <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                                  {moment(path).format('D')}
                                                </text>

                                                {props.index === 0 && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                                {moment(path).format('D') === "1" && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                              </>
                                            );
                                          }}
                                        /> : <XAxis
                                          dataKey="Date"
                                          stroke="#a6c0c9"
                                          strokeWidth={1}
                                          type="number"
                                          domain={domain(13)}
                                          interval={0}
                                          tickLine={false}
                                          tickFormatter={dateFormatter(13)}
                                          ticks={getXaxisTicks(13, 15)}
                                          scale='time'
                                          orientation="top"
                                          padding={{ right: 1 }}

                                          tick={({ x, y, payload, ...props }) => {
                                            let path = payload.value;
                                            return (
                                              <>

                                                <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                                  {moment(path).format('D')}
                                                </text>

                                                {props.index === 0 && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                                {moment(path).format('D') === "1" && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                              </>
                                            );
                                          }}
                                        />}
                                      <Tooltip content={<BasalRegimenTooltipNonIAP />} cursor={false} />
                                      {/* <Tooltip content={< />} cursor={false} /> */}
                                      {/* {selectedGraphTab === "4weeks" ?
                             <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
                               hide
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             /> : <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
           
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             />} */}
                                      <YAxis
                                        type="number"
                                        stroke="#a6c0c9"
                                        strokeWidth={1}
                                        style={{
                                          fontSize: '1rem'
                                        }}

                                        tickCount={4}
                                        padding={{ top: 40 }}
                                        tickLine={false}
                                        label={
                                          <AxisLabel1 x={0} y={100}></AxisLabel1>
                                        }
                                        ticks={getYaxisLabels(basalNonIap)}
                                        interval={0}
                                        tick={(props) => {
                                          const value = props.payload.value;
                                          if (value === 0) {
                                            return (
                                              <text x={props.x - 4} y={props.y - 2} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }
                                          else if (value === 5) {
                                            return (
                                              <text x={props.x - 5} y={props.y + 1} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }
                                          else if (value >= 100) {
                                            return (
                                              <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }

                                          else {
                                            return (
                                              <text x={props.x - 10} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }

                                        }}
                                      />


                                      <ReferenceLine y={0} stroke="#a6c0c9" strokeWidth={1} />

                                      <CartesianGrid horizontal={false} stroke="#a6c0c9" strokeWidth={1} />
                                      {/* <Legend wrapperStyle={{ top: 290}} content={<CustomizedLegend/>}/> */}

                                      <Bar data={mainDataBasalNonIAP} dataKey="Dose" name="Fasting" fill="#000" stroke="#000" barSize={6} isAnimationActive={false} stackId="a" />

                                    </BarChart>
                                  </ResponsiveContainer>

                                </div>
                              </div>
                              {/* <AutomaticAdjustment /> */}



                              {/* legends */}
                              <div className="FirstRow" style={{ marginLeft: "114px", marginTop: "10px", position:"absolute" }}>
                                <div className="row" >
                                  <div className="col-sm-3">
                                    <img alt="icons"
                                      src={BlackLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("Insulin Dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "5px" }}>{t("Common.FastingBasal")}</div>
                                  </div>
                                </div>
                              </div>
                            </> :
                            <>
                              <h2 className="loading-text-graph">{t("BloodGlucoseGraph.noDataAvailable")}</h2>
                            </>
                        }
                      </>
                    }


                  </div>
                </>
                : null
            }



            {/* Insulin Dose Basal Regimen ends here*/}

            {/* Insulin Dose Bolus Regimen start from here*/}


            {
              users?.isBolusUser == true ?
                <>
                  <p className='insulin-graph-heading' style={{ marginTop: '60px' }}>{t("DoseAdjustment.dailyInsulinBolus")}</p>
                  <div className={selectedGraphTab === "2weeks" ? " " : "automatic-adjustment-graph"}>
                    {/* <p className='insulin-graph-heading'>Insulin Dose Summary</p> */}
                    {loader ?
                      <>
                        <div><Loader margin={"50px auto 0"} /></div>
                      </> :
                      <>
                        {
                          bolusNonIap?.length > 0 ?
                            <>
                              <div className={selectedGraphTab === "4weeks" ? "main-wrapper-insulin" : ""}>
                                <div className={selectedGraphTab === "4weeks" ? "graph-wrapper-insulin" : ""}>
                                  {/* {selectedGraphTab === "4weeks" ? <Yaxis/> : null} */}

                                  <ResponsiveContainer
                                    width={selectedGraphTab === "4weeks" ? 1379 : "100%"}
                                    height={selectedGraphTab === "4weeks" ? 180 : 180}
                                    className={selectedGraphTab === "4weeks" ? "container-wrapper-insulin" : "container-wrapper-insulin1"}
                                  >

                                    <BarChart margin={{ left: 52 }} data={mainDataNonIAP} barCategoryGap="17%">
                                      {selectedGraphTab === "4weeks" ?
                                        <XAxis
                                          dataKey="Date"
                                          stroke="#a6c0c9"
                                          strokeWidth={1}
                                          type="number"
                                          domain={domain(27)}
                                          interval={0}
                                          tickLine={false}
                                          tickFormatter={dateFormatter(27)}
                                          ticks={getXaxisTicks(27, 30)}
                                          scale='time'
                                          orientation="top"
                                          padding={{ right: 1 }}

                                          tick={({ x, y, payload, ...props }) => {
                                            let path = payload.value;
                                            return (
                                              <>

                                                <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                                  {moment(path).format('D')}
                                                </text>

                                                {props.index === 0 && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                                {moment(path).format('D') === "1" && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                              </>
                                            );
                                          }}
                                        /> : <XAxis
                                          dataKey="Date"
                                          stroke="#a6c0c9"
                                          strokeWidth={1}
                                          type="number"
                                          domain={domain(13)}
                                          interval={0}
                                          tickLine={false}
                                          tickFormatter={dateFormatter(13)}
                                          ticks={getXaxisTicks(13, 15)}
                                          scale='time'
                                          orientation="top"
                                          padding={{ right: 1 }}

                                          tick={({ x, y, payload, ...props }) => {
                                            let path = payload.value;
                                            return (
                                              <>

                                                <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                                  {moment(path).format('D')}
                                                </text>

                                                {props.index === 0 && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                                {moment(path).format('D') === "1" && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                              </>
                                            );
                                          }}
                                        />}


                                      <Tooltip wrapperStyle={{ zIndex: 99999 }} content={<BasalRegimenTooltip2NonIAP />} cursor={false} />
                                      {/* {selectedGraphTab === "4weeks" ?
                             <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
                               hide
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             /> : <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
           
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             />} */}

                                      <YAxis
                                        type="number"
                                        stroke="#a6c0c9"
                                        strokeWidth={1}
                                        style={{
                                          fontSize: '1rem'
                                        }}

                                        tickCount={4}
                                        padding={{ top: 40 }}
                                        tickLine={false}
                                        label={
                                          <AxisLabel1 x={0} y={100}></AxisLabel1>
                                        }
                                        ticks={getYaxisLabels(bolusNonIap)}
                                        interval={0}
                                        tick={(props) => {
                                          const value = props.payload.value;
                                          if (value === 0) {
                                            return (
                                              <text x={props.x - 4} y={props.y - 2} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }
                                          else if (value === 5) {
                                            return (
                                              <text x={props.x - 5} y={props.y + 1} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }
                                          else if (value >= 100) {
                                            return (
                                              <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }

                                          else {
                                            return (
                                              <text x={props.x - 10} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }

                                        }}
                                      />


                                      <ReferenceLine y={0} stroke="#a6c0c9" strokeWidth={1} />

                                      <CartesianGrid horizontal={false} stroke="#a6c0c9" strokeWidth={1} />
                                      {/* <Legend wrapperStyle={{ top: 290}} content={<CustomizedLegend/>}/> */}
                                      <Bar data={FormatActivityList(mainDataNonIAP.Breakfast, mainDataNonIAP.Lunch, mainDataNonIAP.Dinner, mainDataNonIAP.As_Needed)} dataKey="Dose" maxBarSize={1} name="Breakfast" fill="#2CACDC" stroke="#2CACDC" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={FormatActivityList(mainDataNonIAP.Lunch, mainDataNonIAP.Breakfast, mainDataNonIAP.Dinner, mainDataNonIAP.As_Needed)} dataKey="Dose" maxBarSize={1} name="Before Lunch" fill="#267F13" stroke="#267F13" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={FormatActivityList(mainDataNonIAP.Dinner, mainDataNonIAP.Lunch, mainDataNonIAP.Breakfast, mainDataNonIAP.As_Needed)} dataKey="Dose" maxBarSize={1} name="Before Dinner" fill="#EE8322" stroke="#EE8322" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={FormatActivityList(mainDataNonIAP.As_Needed, mainDataNonIAP.Dinner, mainDataNonIAP.Lunch, mainDataNonIAP.Breakfast)} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />

                                      {/* others */}
                                      <Bar data={mainDataNonIAP.Before_Exercise} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataNonIAP.After_Exercise} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataNonIAP.Snack} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataNonIAP.Just_Checking} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataNonIAP.AfterDinner} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataNonIAP.AfterLunch} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataNonIAP.AfterBreakfast} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />



                                    </BarChart>
                                  </ResponsiveContainer>

                                </div>
                              </div>
                              {/* <AutomaticAdjustment /> */}

                              {/* Automatic adjustment graph */}


                              {/* legends */}

                              <div className="FirstRow" style={{ marginLeft: "114px", marginTop: "10px" , position:"absolute" }}>
                                <div className="row" >

                                  <div className="col-sm-3">
                                    <img alt="icons"
                                      src={BlueLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("More than recommended dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "-4px" }}>{t("Common.Breakfast")}</div>
                                  </div>
                                  <div className="col-sm-3" style={{  }}>
                                    <img alt="icons"
                                      src={GreenLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("Less than recommended dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "4px" }}>{t("Common.Lunch")}</div>
                                  </div>
                                  <div className="col-sm-3" style={{  }}>
                                    <img alt="icons"
                                      src={OrangeLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("Less than recommended dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: '4px' }}>{t("Common.Dinner")}</div>
                                  </div>
                                  {/* <div className="col-sm-3" style={{ marginLeft: "-80px" }}>
                                    <img alt="icons"
                                      src={PinkLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("Less than recommended dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium" }}>Bedtime</div>
                                  </div> */}
                                  <div className="col-sm-3" style={{ }}>
                                    <img alt="icons"
                                      src={GreyLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("Less than recommended dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "-17px" , position:"relative",left:"9px" }}>{t("Common.AsNeeded")}</div>
                                  </div>
                                </div>
                              </div>
                            </> :
                            <>
                              <h2 className="loading-text-graph">{t("BloodGlucoseGraph.noDataAvailable")}</h2>
                            </>
                        }
                      </>
                    }

                  </div>
                </>
                : null
            }



            {/* Insulin Dose Bolus Regimen ends here*/}


            {/* Insulin Premixed */}
            {
              users?.isPremixUser === true ?
                <>
                  <p className='insulin-graph-heading' style={{ marginTop: '60px' }}>{t("DoseAdjustment.dailyInsulinPremixed")}</p>
                  <div className={selectedGraphTab === "2weeks" ? " " : "automatic-adjustment-graph"} >
                    {/* <p className='insulin-graph-heading'>Insulin Dose Summary</p> */}
                    {loader ?
                      <>
                        <div><Loader margin={"50px auto 0"} /></div>
                      </> :
                      <>
                        {
                          premixNonIap?.length > 0 ?
                            <>
                              <div className={selectedGraphTab === "4weeks" ? "main-wrapper-insulin" : ""}>
                                <div className={selectedGraphTab === "4weeks" ? "graph-wrapper-insulin" : ""}>
                                  {/* {selectedGraphTab === "4weeks" ? <Yaxis dataArr={}/> : null} */}

                                  <ResponsiveContainer
                                    width={selectedGraphTab === "4weeks" ? 1379 : "100%"}
                                    height={selectedGraphTab === "4weeks" ? 180 : 180}
                                    className={selectedGraphTab === "4weeks" ? "container-wrapper-insulin" : "container-wrapper-insulin1"}
                                  >

                                    <BarChart margin={{ left: 52 }} data={mainDataPremixNonIAP} barCategoryGap="17%">
                                      {selectedGraphTab === "4weeks" ?
                                        <XAxis
                                          dataKey="Date"
                                          stroke="#a6c0c9"
                                          strokeWidth={1}
                                          type="number"
                                          domain={domain(27)}
                                          interval={0}
                                          tickLine={false}
                                          tickFormatter={dateFormatter(27)}
                                          ticks={getXaxisTicks(27, 30)}
                                          scale='time'
                                          orientation="top"
                                          padding={{ right: 1 }}

                                          tick={({ x, y, payload, ...props }) => {
                                            let path = payload.value;
                                            return (
                                              <>

                                                <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                                  {moment(path).format('D')}
                                                </text>

                                                {props.index === 0 && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                                {moment(path).format('D') === "1" && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                              </>
                                            );
                                          }}
                                        /> : <XAxis
                                          dataKey="Date"
                                          stroke="#a6c0c9"
                                          strokeWidth={1}
                                          type="number"
                                          domain={domain(13)}
                                          interval={0}
                                          tickLine={false}
                                          tickFormatter={dateFormatter(13)}
                                          ticks={getXaxisTicks(13, 15)}
                                          scale='time'
                                          orientation="top"
                                          padding={{ right: 1 }}

                                          tick={({ x, y, payload, ...props }) => {
                                            let path = payload.value;
                                            return (
                                              <>

                                                <text x={x + 23} y={y + 30} textAnchor="middle" fill="#787885" font-size="12px" font-family="Inter-medium">
                                                  {moment(path).format('D')}
                                                </text>

                                                {props.index === 0 && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                                {moment(path).format('D') === "1" && (
                                                  <text x={x + 12} y={y} textAnchor="middle" font-size="12px" font-family="Inter-medium" fill="#787885">
                                                    {getMonthNameShort(moment(path).format('M') - 1)}
                                                  </text>
                                                )}
                                              </>
                                            );
                                          }}
                                        />}



                                      <Tooltip content={<BasalRegimenTooltip3NonIAP />} cursor={false} />
                                      {/* {selectedGraphTab === "4weeks" ?
                             <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
                               hide
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             /> : <YAxis
                               type="number"
                               stroke="#a6c0c9"
                               strokeWidth={1}
                               style={{
                                 fontSize: '1rem'
                               }}
           
                               tickCount={4}
                               padding={{ top: 40 }}
                               tickLine={false}
                               label={
                                 <AxisLabel1 x={0} y={100}></AxisLabel1>
                               }
                               ticks={getYaxisLabels(InsulinDoseDTO.MedAdminList)}
                               interval={0}
                               tick={(props) => {
                                 const value = props.payload.value;
                                 if (value === 0) {
                                   return (
                                     <text x={props.x - 10} y={props.y - 1} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 } else {
                                   return (
                                     <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="14px" font-family="Inter">
                                       {value}
                                     </text>
                                   );
                                 }
           
                               }}
                             />} */}

                                      <YAxis
                                        type="number"
                                        stroke="#a6c0c9"
                                        strokeWidth={1}
                                        style={{
                                          fontSize: '1rem'
                                        }}

                                        tickCount={4}
                                        padding={{ top: 40 }}
                                        tickLine={false}
                                        label={
                                          <AxisLabel1 x={0} y={100}></AxisLabel1>
                                        }
                                        ticks={getYaxisLabels(premixNonIap)}
                                        interval={0}
                                        tick={(props) => {
                                          const value = props.payload.value;
                                          if (value === 0) {
                                            return (
                                              <text x={props.x - 4} y={props.y - 2} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }
                                          else if (value === 5) {
                                            return (
                                              <text x={props.x - 5} y={props.y + 1} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }
                                          else if (value >= 100) {
                                            return (
                                              <text x={props.x - 14} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }

                                          else {
                                            return (
                                              <text x={props.x - 10} y={props.y + 5} textAnchor="right" font-size="10px" font-weight="bold" font-family="Inter-medium" fill="#000">
                                                {value}
                                              </text>
                                            );
                                          }

                                        }}
                                      />


                                      <ReferenceLine y={0} stroke="#a6c0c9" strokeWidth={1} />

                                      <CartesianGrid horizontal={false} stroke="#a6c0c9" strokeWidth={1} />
                                      {/* <Legend wrapperStyle={{ top: 290}} content={<CustomizedLegend/>}/> */}
                                      <Bar data={FormatActivityList(mainDataPremixNonIAP.Breakfast, mainDataPremixNonIAP.Lunch, mainDataPremixNonIAP.Dinner, mainDataPremixNonIAP.BedTime)} dataKey="Dose" maxBarSize={1} name="Breakfast" fill="#2CACDC" stroke="#2CACDC" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={FormatActivityList(mainDataPremixNonIAP.Lunch, mainDataPremixNonIAP.Breakfast, mainDataPremixNonIAP.Dinner, mainDataPremixNonIAP.BedTime)} dataKey="Dose" maxBarSize={1} name="Before Lunch" fill="#267F13" stroke="#267F13" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={FormatActivityList(mainDataPremixNonIAP.Dinner, mainDataPremixNonIAP.Lunch, mainDataPremixNonIAP.Breakfast, mainDataPremixNonIAP.BedTime)} dataKey="Dose" maxBarSize={1} name="Before Dinner" fill="#EE8322" stroke="#EE8322" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={FormatActivityList(mainDataPremixNonIAP.BedTime, mainDataPremixNonIAP.Dinner, mainDataPremixNonIAP.Lunch, mainDataPremixNonIAP.Breakfast)} dataKey="Dose" maxBarSize={1} name="BedTime" fill="#F53DC2" stroke="#F53DC2" strokeWidth={6} isAnimationActive={false} />

                                      {/* others */}
                                      <Bar data={mainDataPremixNonIAP.Before_Exercise} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataPremixNonIAP.After_Exercise} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataPremixNonIAP.Snack} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataPremixNonIAP.Just_Checking} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataPremixNonIAP.AfterDinner} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataPremixNonIAP.AfterLunch} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataPremixNonIAP.AfterBreakfast} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                      <Bar data={mainDataPremixNonIAP.As_Needed} dataKey="Dose" maxBarSize={1} name="Others" fill="#949494" stroke="#949494" strokeWidth={6} isAnimationActive={false} />
                                    </BarChart>
                                  </ResponsiveContainer>

                                </div>
                              </div>
                              {/* <AutomaticAdjustment /> */}

                              {/* Automatic adjustment graph */}

                              {/* legends */}

                              <div className="FirstRow" style={{ marginLeft: "114px", marginTop: "10px", position:"absolute" }}>
                                <div className="row" >

                                  <div className="col-sm-3">
                                    <img alt="icons"
                                      src={BlueLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("More than recommended dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "-4px" }}>{t("Common.Breakfast")}</div>
                                  </div>
                                  <div className="col-sm-3" style={{ }}>
                                    <img alt="icons"
                                      src={GreenLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("Less than recommended dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "4px" }}>{t("Common.Lunch")}</div>
                                  </div>
                                  <div className="col-sm-3" style={{  }}>
                                    <img alt="icons"
                                      src={OrangeLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("Less than recommended dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: '4px' }}>{t("Common.Dinner")}</div>
                                  </div>
                                  <div className="col-sm-3" style={{ }}>
                                    <img alt="icons"
                                      src={PinkLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("Less than recommended dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium" }}>{t("Common.BedTime")}</div>
                                  </div>
                                  {/* <div className="col-sm-3" style={{ marginLeft: "-74px" }}>
                                    <img alt="icons"
                                      src={GreyLegend}
                                      width="45"
                                      height="15"
                                      aria-label={t("Less than recommended dose")}
                                      tabIndex="0"
                                    /> <br />
                                    <div style={{ fontSize: "12px", fontWeight: 'bold', fontFamily: "Inter-medium", marginLeft: "-7px" }}>{t("Common.AsNeeded")}</div>
                                  </div> */}
                                </div>
                              </div>
                            </> :
                            <>
                              <h2 className="loading-text-graph">{t("BloodGlucoseGraph.noDataAvailable")}</h2>
                            </>
                        }
                      </>
                    }

                  </div>
                </>
                : null
            }

            {/* ends */}
          </> : null
      }



    </>
  )
}

export default Arif;




// css

.main-wrapper-insulin {
  /* max-width: 800px;
  position: relative;  */
  /* background-color: red;*/
}

.graph-wrapper-insulin {
  /* display: flex;
  flex-direction: row;
  height: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  position: relative; */
  /* margin-left: -10px; */
  /* background-color: blue; */
}


.insulin-graph-heading {
  /* font-family: "Inter";
  font-size: 21px;
  font-family: 'Inter-Medium';
  color: rgba(0, 0, 0, 1);
  letter-spacing: 0px;
  line-height: 32px;
  margin-top: 25px; */
  font-family: 'Inter-Medium';
  font-size: 21px;
  color: #000;
}

.container-wrapper-insulin {
  /* margin-left: 1.2px; */
  margin-left: 2.8px;
  position: relative;
  z-index: 99;
}

.container-wrapper-insulin1 {
  /* margin-left: 1.3px; */
  margin-left: 2.247px;
  position: relative;
  z-index: 99;
}

.graph-wrapper-insulin .y-axis-wrapper-insulin {
  background: white;
  position: sticky;
  left: 0;
  top: 0;
  z-index: 3;
  width: 110px;
  display: flex;
  justify-content: end;
}

.graph-wrapper-insulin::-webkit-scrollbar {
  height: 8px;
}

.graph-wrapper-insulin::-webkit-scrollbar-track {
  border: 1.5px solid rgba(165, 185, 205, 0.3);
  border-radius: 10px;
}

.graph-wrapper-insulin::-webkit-scrollbar-thumb {
  background-color: rgba(165, 185, 205, 0.605);
  border-radius: 10px;
}

.automatic-adjustment-graph {
  padding-bottom: 60px;
  overflow-x: auto;
  overflow-y: hidden;
}



/* .automatic-adjustment-graph::-webkit-scrollbar {
  width: 1px;
  height: 15px;
  background-color:#fff;
  border: 1px solid rgba(120, 120, 133, 1);
  border-radius: 20px;
}

.automatic-adjustment-graph::-webkit-scrollbar-track {
  height: 15px;
  padding: 10px;
}

.automatic-adjustment-graph::-webkit-scrollbar-thumb {
  height: 23px;
  width: 19px;
  background-color: rgba(225, 225, 227, 1);
  border-radius: 17px;
 
} */

.automatic-adjustment-graph::-webkit-scrollbar {
  width: 15px;
}

.automatic-adjustment-graph::-webkit-scrollbar-track {
  box-shadow: inset 0 0 1.5px black;
  -webkit-box-shadow : inset 0 0 1.5px black;
  border-radius: 10px;
  -webkit-border-radius: 10px;
}

.automatic-adjustment-graph::-webkit-scrollbar-thumb {
  background-color: rgba(225, 225, 227, 1);
  border: 3px solid transparent;
  border-radius: 9px;
  -webkit-border-radius: 9px;
  background-clip: content-box;
}




.automatic-adjust-left {
  border-top: 1.2px solid #949494;
  border-bottom: 1.2px solid #949494;
  min-height: 50px;
  /* background: #F7F8FC; */
  background-color: #f7f8fc;
  overflow-x: auto;
}

.adl-four-weeks {
  position: relative;
  /* left: 12px; */
  left:3px;
}

.automatic-adjust-left>span {
  font-family: "Inter";
  font-size: 12px;
  font-family: 'Inter-Bold';
  color: #787885;
  line-height: 16px;
  position: relative;
  top: 1px;
  left: 11px;
}

.automatic-adjust-right {
  display: flex;
  position: relative;
  left: -18.3px;
  width: 651px;
}

.fourweeks {
  width: 1268px;
}

.automatic-adjust-list {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter-Bold';
  width: 46.8px;
  min-height: 51px;
  border-left: 1.2px solid #949494;
  border-top: 0.6px solid #949494;
  border-bottom: 1.2px solid #949494;
  /* background: rgb(247, 248, 252); */
  background-color: #f7f8fc;
  font-size: 14px;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  cursor: pointer;
}

.fweeks {
  width: 45.8px;
}

/* .automatic-adjust-list:nth-child(14) {
  border-right: 1px solid rgb(148, 148, 148);
} */
/* .automatic-adjust-list:nth-child(15) {
  border-right: 1px solid rgb(148, 148, 148);
} */

.flask-img {
  position: relative;
  left: 0px;
  top: 3px;
}

.resumed {
  left: 0px !important;
  top:5px !important;
}

.flask-text {
  /* position: absolute; */
  /* bottom: 3px; */
  font-family: "Inter";
  font-size: 9.5px;
  font-family: 'Inter-Medium';
  color: rgba(0, 0, 0, 1);
  text-align: center;
  letter-spacing: 0px;
  line-height: 15px;
  position: relative;
    top: -1px;
}

div>.on-hover {
  display: none;
}

div>.on-hover-4weeks {
  display: none;
}

.hover-on-text:hover+div>.on-hover {
  display: block;
  position: absolute;
  top: -60px;
  /* left: -6px; */
  right: 34px;
  width: 310px;
  height: 110px;
  border: 1px solid;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 1px 2px rgba(58, 58, 68, 0.24),
    0px 2px 4px rgba(90, 91, 106, 0.24);
  border-radius: 8px;
  padding: 12px 20px 10px 20px;
  z-index: 99;
}

.tooltip-4weeks:hover+div>.on-hover-4weeks {
  display: block;
  position: absolute;
  top: -60px;
  left: 26px;
  /* right:34px; */
  width: 310px;
  height: 110px;
  border: 1px solid;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 1px 2px rgba(58, 58, 68, 0.24),
    0px 2px 4px rgba(90, 91, 106, 0.24);
  border-radius: 8px;
  padding: 12px 20px 10px 20px;
  z-index: 99;
}




.adjust-unit-hover {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  color: #000000;
  position: relative;
  top: 4px;
}

.tooltip-img {
  position: relative;
  top: 10px;
  left: 5px;
}

.adjust-text-hover {
  font-family: "Inter";
  font-style: normal;
  
  font-size: 14px;
  line-height: 143%;
  letter-spacing: 0.018em;
  color: #000000;
  text-align: left;
}

.ajust-hover-tooltip {
  position: relative;
  /* left: -55px; */
  top: -20px;
  left: 257px;
  transform: rotate(180deg);

}

.ajust-hover-tooltip-4weeks {
  position: relative;
  left: -60px;
  top: -20px;
  transform: rotate(360deg);

}

.last-vertical-line {
  position: relative;
  left: 650.6px;
  min-height: 50px;
  border-right: 1.3px solid #949494;
}

.last-vertical-line-four-weeks {
  position: relative;
  left: 1267.6px;
  min-height: 50px;
  border-right: 1.3px solid rgb(148, 148, 148);
}

.insulin-dose-graph-tooltip-container {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 1px 2px rgba(58, 58, 68, 0.24),
    0px 2px 4px rgba(90, 91, 106, 0.24);
  border-radius: 8px;
  position: relative;
  top: -15px;
}

.inner-padding-tooltip {
  padding: 15px 12px 10px 12px;
  width: 310px;
  min-height: 80px;
}

.dose-amount-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  margin-left: -10px;
  margin-top: 5px;
}

.dose-info-text {
  font-family: "Inter";
  font-style: normal;
  
  font-size: 14px;
  line-height: 143%;
  display: flex;
  align-items: center;
  letter-spacing: 0.018em;
  color: #000000;
}

.dotted-border-graph {
  border: 1px dashed #000000;
  height: 34px;
  width: 8px;
  position: relative;
  left: 11px;
}

.line-border-graph {
  border: 1px solid #000000;
  height: 34px;
  width: 8px;
  position: relative;
  left: 11px;
}

.filled-border-graph {
  background-color: #000000;
  height: 34px;
  width: 8px;
  position: relative;
  left: 11px;
}

.tooltip-main-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transform: translateY(-10px);
}

.tooltip-arrow:after,
.tooltip-arrow:before {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.tooltip-arrow:after {
  border-color: rgba(255, 255, 255, 0);
  border-right-color: #fff;
  border-width: 8px;
  margin-top: -6px;
}

.tooltip-arrow:before {
  border-color: rgba(211, 211, 211, 0);
  border-right-color: #d3d3d3;
  border-width: 8px;
  margin-top: -7px;
}

.tooltip-container {
  max-width: 420px;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  /* Shadow Dark / 2dp */

  box-shadow: 0px 1px 2px rgba(58, 58, 68, 0.24),
    0px 2px 4px rgba(90, 91, 106, 0.24);
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 20px;
  padding-bottom: 30px;
  padding-left: 22px;
  padding-right: 13px;
}

.tooltip-content-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tooltip-item-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  gap: 20px;
}

.tooltip-icon-insulin-dose {
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
}

.tooltip-number-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  /* or 24px */

  display: flex;
  align-items: center;
  text-align: center;

  /* Text Colors/Black Text Color */

  color: #000000;

  margin-left: 9px;

  max-width: 30px;
}

.tooltip-description-text {
  font-family: "Inter";
  font-style: normal;
  
  font-size: 14px;
  line-height: 143%;
  /* or 20px */

  display: flex;
  align-items: center;
  letter-spacing: 0.018em;

  /* Text Colors/Black Text Color */

  color: #000000;

  width: 220px;
}

.tooltip-icon-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: translate(0px, 5px);
}

.tooltip-icon-more-than-rec {
  width: 8px;
  height: 34px;
  border: 1px solid #000000;
}

.tooltip-icon-less-than-rec {
  width: 8px;
  height: 34px;
  border: 1px dashed #000000;
}

.tooltip-icon-insulin-dose {
  width: 8px;
  height: 34px;
  background: #000000;
}

.filled-green {
  background-color: #267f13;
}


div>.on-hover-4weeks-tt {
  display: none;
}

.tooltip-4weeks-tt+div>.on-hover-4weeks {
  display: block;
  position: absolute;
  top: -60px;
  /* left: -6px; */
  right: 34px;
  width: 310px;
  height: 110px;
  border: 1px solid;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 1px 2px rgba(58, 58, 68, 0.24),
    0px 2px 4px rgba(90, 91, 106, 0.24);
  border-radius: 8px;
  padding: 12px 20px 10px 20px;
  z-index: 99999;
}


div>.on-hover-4weeks-4t {
  display: none;
}


.tooltip-4weeks-4t:hover+div>.on-hover-4weeks-4t {
  display: block;
  position: absolute;
  top: -60px;
  /* left: -6px; */
  width: 310px;
  height: 110px;
  border: 1px solid;
  background: #fff;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 1px 2px rgba(58, 58, 68, 0.24),
    0px 2px 4px rgba(90, 91, 106, 0.24);
  border-radius: 8px;
  padding: 12px 20px 10px 20px;
  z-index: 99999;
  margin-left: -329px;
}

.ajust-hover-tooltip-4weeks-4t {
  position: relative;
  left: 255px;
  top: -20px;
  transform: rotate(180deg);


}

.loading-text-graph {
  color: #787885;
  font-family: 'Inter-Bold';
  font-size: 21px;
  
}

@media (max-width:1100px){
  .automatic-adjust-right {
    left: -12.3px;
    width: 613px;
}
.fourweeks {
  width: 1268px;
}
.last-vertical-line {
  left: 612.6px;
}
}


// state mangament


import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";



const initialState = {
    data:{},
    loading:true,
    insulinSummary:{},
    slotDetails:[],
    totalDosesCount:0,
    cgmUser:false,
    bu:false,
    bouser: false,
    premix:false,
    graphViewList:[],
    BGYaxisUOM:{},
    medGraphViewList:[],
    percentageMedAdherenceWeek:0,
    CarbGraphViewList:[],
    BPGraphViewList:[],
    WeightGraphViewList:[],
    ActivityGraphViewList:[],
    SleepGraphViewList:[],
    BPBucketList:[],
    titrationType: undefined,


    
}

export const setGraphDataAsync = createAsyncThunk(
    'graphData/fetchGraphData',
    
    async(data) => {
        const response = await GetGraphDetailsService(data);
        if (response?.response?.AutomaticAdjustmentList != undefined && response?.response?.AutomaticAdjustmentList != null
            && response?.response?.AutomaticAdjustmentList?.length > 0) {
            for (var i = 0; i < response.response.AutomaticAdjustmentList.length; i++) {
                let localDateTime = new Date(response.response.AutomaticAdjustmentList[i].Date);
                let UTCDateTime = new Date(localDateTime.getUTCFullYear(), localDateTime.getUTCMonth(), localDateTime.getUTCDate(), localDateTime.getUTCHours(), localDateTime.getUTCMinutes(), localDateTime.getUTCSeconds());
                response.response.AutomaticAdjustmentList[i].Date = UTCDateTime.getTime();               
            }
        }
        return response?.response;
    }
);

export const graphSlice = createSlice({
    name:"graphData",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(
            setGraphDataAsync.pending,
            state => {
                state.loading = true;
            }
        )
        .addCase(
            setGraphDataAsync.fulfilled,
            (state,action) => {
                state.data = action.payload;
                state.insulinSummary = action.payload?.InsulinSummary;
                state.slotDetails = action.payload?.InsulinSummary?.SlotDetails;
                state.loading = false;
                state.totalDosesCount = action.payload?.InsulinSummary?.TotalDosesCount;
                state.cgmUser = action.payload.isCGMUser;
                state.basalUser = action.payload.isBasalUser;
                state.bolusUser = action.payload.isBolusUser;
                state.premixUser = action.payload.isPremixUser;
                state.graphViewList = action.payload.GraphViewList;
                state.BGYaxisUOM = action.payload.BGYaxisUOM;
                state.CarbGraphViewList = action.payload.CarbGraphViewList;
                state.BPGraphViewList = action.payload.BPGraphViewList;
                state.WeightGraphViewList = action.payload.WeightGraphViewList;
                state.ActivityGraphViewList = action.payload.ActivityGraphViewList;
                state.SleepGraphViewList = action.payload.SleepGraphViewList;
                state.BPBucketList = action.payload.BPBucketList;
                state.medGraphViewList = action.payload.MedGraphViewList;
                state.percentageMedAdherenceWeek = action.payload.percentageMedAdherenceWeek;
                state.titrationType = action.payload.TitrationType;
                // state.agpDateTime = action.payload.AGPDateTime;
                // state.agpGraphDetails = action.payload.AgpGraphDetails;

                // state.agpDateTime = action.payload.AGPDateTime;
                // state.agpGraphDetails = action.payload.AgpGraphDetails;
                // state.agpPercentileLineList = action.payload.AgpGraphDetails.agpPercentileLineList;
                // state.get95Values = action.payload.AgpGraphDetails.agpPercentileLineList[0].agpDataPointList;
                // state.get75Values = action.payload.AgpGraphDetails.agpPercentileLineList[1].agpDataPointList;
                // state.get50Values = action.payload.AgpGraphDetails.agpPercentileLineList[2].agpDataPointList;
                // state.get25Values = action.payload.AgpGraphDetails.agpPercentileLineList[3].agpDataPointList;
                // state.get5Values = action.payload.AgpGraphDetails.agpPercentileLineList[4].agpDataPointList;
                
            }
        )
        .addCase(
            setGraphDataAsync.rejected,
            (state) => {
                state.data = {};
                state.loading = false;
            }
        )

    }

});

export default graphSlice.reducer;
