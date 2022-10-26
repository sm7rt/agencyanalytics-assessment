import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TabPanelComponent from "./TabPanel";
import { fetchData, fetchToday } from "../../api";
import Loader from "../loader";
import cities from "../../assets/cities.json";
import { ICity } from "../../types/city";
import { v4 as uuidv4 } from "uuid";

import "react-tabs/style/react-tabs.css";
import "./style.less";

type MyProps = {};
type MyState = {
  latitude: number;
  longitude: number;
  isLoading: boolean;
  allDaysData: any;
  todayData: any;
};

export default class TabComponent extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      latitude: 43.65107,
      longitude: -79.347015,
      allDaysData: null,
      todayData: null,
      isLoading: true,
    };
  }

  async setLatLong(latitude: number, longitude: number) {
    this.setState(() => ({
      latitude,
      longitude,
      isLoading: false,
    }));

    this.setState({
      allDaysData: await fetchData(latitude, longitude),
      todayData: await fetchToday(latitude, longitude),
    });
  }

  async componentDidMount() {
    const { latitude, longitude } = this.state;
    this.setState({
      allDaysData: await fetchData(latitude, longitude),
      todayData: await fetchToday(latitude, longitude),
      isLoading: false,
    });
  }

  render() {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="tab-area">
        <Tabs>
          <TabList>
            {cities.map((city: ICity) => (
              <Tab
                onClick={() => this.setLatLong(city.latitude, city.longitude)}
                key={uuidv4()}
              >
                <p>{city.name}</p>
              </Tab>
            ))}
          </TabList>

          <div className="panel">
            <div className="panel-inner">
              {cities.map(() => (
                <TabPanel>
                  {this.state.allDaysData && this.state.todayData && (
                    <TabPanelComponent
                      todayData={this.state.todayData}
                      allDaysData={this.state.allDaysData}
                    />
                  )}
                </TabPanel>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}
