import Vue from 'vue'
const state = {
  defaultLocation: null,
  cityDetails: {
    key: '',
    regionID: '',
    city: '',
    tempC: '',
    tempF: '',
    WeatherText: '',
    fiveForecast: [],

  },
  searchField: '',
  autoCompleteTxT: [],
  autoCompleteKey:[],

}
const getters = {
  defaultLocation: state => {
    return state.defaultLocation;
  },
  cityDetails: contex => {
    return contex.state.cityDetails;
  },
  getAutoCompleteTxT: state =>{
    return state.autoCompleteTxT;
  },
}
const actions = {
  setUserLocationByDefault: contex => {
    navigator.geolocation.getCurrentPosition(position => {
      contex.state.defaultLocation = position;

      contex.dispatch('getDefaultLocation')
    })
  },
  getDefaultLocation: contex => {

    const lat = contex.state.defaultLocation.coords.latitude;
    const lon = contex.state.defaultLocation.coords.longitude;
    const fullURL = contex.getters.gpURL + contex.getters.apiKey +'&q='   + lat + '%2C' + lon + '&language=en&toplevel=true';

          Vue.axios.get(fullURL)
            .then(response => {
              const data = response.data;
              contex.state.cityDetails.city = data.EnglishName;
              contex.state.cityDetails.key = data.Key;
              contex.state.cityDetails.regionID = data.Country.ID;
              contex.dispatch('getWeather');
              contex.dispatch('getFiveForecast');
              
            })
            .catch(err => {
              Vue.toasted.show(err.message,contex.getters.toastOptions);

            })
            

  },
  setAutoComplete: (contex,search) =>{

    if (search !== '' && search !== undefined) {

      const found = contex.state.autoCompleteKey.find(e=> e.cityNameDesc === search);
      if((typeof found) !== 'undefined')
      {
        contex.state.cityDetails.city = found.cityName;
        contex.state.cityDetails.key = found.key;
        contex.state.cityDetails.regionID = found.ID;
        contex.dispatch('getWeather');
        contex.dispatch('getFiveForecast');
      }
      else{
      const fullURL = contex.state.autoCompSearchURL +contex.getters.apiKey +'&q=' + search + '&language=en';
      Vue.axios.get(fullURL)
      .then(response =>{
        const data = response.data;
        contex.state.autoCompleteTxT = [];
        contex.state.autoCompleteKey = [];
        for(let i=0 ; i < data.length ; i++)
        {
          contex.state.autoCompleteTxT.push(data[i].LocalizedName + ' , ' + data[i].Country.LocalizedName);
          const city = {key: data[i].Key
          ,cityNameDesc: data[i].LocalizedName + ' , ' + data[i].Country.LocalizedName
          ,ID: data[i].Country.ID
          ,cityName:  data[i].LocalizedName}
          contex.state.autoCompleteKey.push(city);
        }
      })
      .catch( err=>{
        Vue.toasted.show(err.message,contex.getters.toastOptions);

      })
    }
      
    }

}
}

const mutations = {

}

export default {
  state,
  getters,
  mutations,
  actions,

  
}