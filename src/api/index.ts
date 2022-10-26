const calCelsius = (temp: number) => Math.floor(temp - 273.15);

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const fetchToday = async (latitude: number, longitude: number) => {
  try {

    const apiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0e84827f7b4ad592fb978de094bb6ace`
    );

    const response = await apiCall.json();
    const { dt, weather } = response;
    const date = new Date(dt * 1000);

    const today = {
      day: weekday[date.getDay()],
      icon: weather[0].icon,
      main: response.weather[0].main,
      allData: response,
      temp: calCelsius(response.main.temp),
    };

    return today;

  } catch (error) {
    console.error(error);
  }
};

export const fetchData = async (latitude: number, longitude: number) => {
  try {

    const apiCall = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=0e84827f7b4ad592fb978de094bb6ace`
    );

    const response = await apiCall.json();

    const { list } = response;
    const allDaysData = [];

    for (let i = 0; i < list.length; i += 8) {
      const obj = {
        dayName: weekday[new Date(list[i + 4].dt_txt).getDay()],
        temp: calCelsius(list[i].main.temp),
        icon: list[i].weather[0].icon,
      };
      allDaysData.push(obj);
    }

    return allDaysData;
    
  } catch (error) {
    console.error(error);
  }
};
