import React, { Component } from "react";
import { IWeather } from "../../types/weather";

type MyProps = {
  allDaysData: IWeather[];
  todayData: IWeather;
};

type MyState = {};

export default class TabPanel extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
  }

  render() {

    const today = this.props.todayData;
    const allDay = this.props.allDaysData.slice(1);
    
    return (
      <>

        <div className="panel-top">
          <p>Today</p>
          <div className="today-data">
            <img
              src={`https://openweathermap.org/img/w/${today.icon}.png`}
              alt={today.main}
            />
            <div className="d">
              <h4 className="data">{today.temp}° </h4> 
              <p className="type"> {today.main} </p>
            </div>
          </div>
        </div>

        <div className="panel-down">
          {allDay.map((day: IWeather, i: number) => {
            return (
              <div className="day" key={i}>
                <p> {day.dayName} </p>
                <img
                  src={`https://openweathermap.org/img/w/${day.icon}.png`} 
                  alt={day.dayName}
                />
                <h6> {day.temp}° </h6>
              </div>
            );
          })}
        </div>

      </>
    );
  }
}
