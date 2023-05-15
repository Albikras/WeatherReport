var searchInput = document.getElementById('userTypedInfo');
var searchBtn = document.getElementById('searchBtn');
var userFormElement = document.getElementById('userFormElement');

var apiKey = '9be1ab40fb6c098c07f182a1724c0fbd';
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?";
var iconUrl = 'https://openweathermap.org/img/wn/';

var mainElement = $('#main');

var arrayDivs = ['1','2','3','4','5'];
var arrayListHistory = [];

function handleForm(event){
    event.preventDefault();
    var city = searchInput.value.trim()
    weather(city);
    searchInput.value = "";
}
var history = JSON.parse(localStorage.getItem("history")) || [];
async function weather(city){

    if(city === ''){
        alert('Please Enter A Valid Input!!!');
    }else{
    mainElement.empty();

    var response = await fetch(apiUrl +'q='+city+`&units=metric&appid=${apiKey}`)
    var apiInformation = await response.json()

    var responseTwo = await fetch(apiUrl2+'q='+city+`&units=metric&appid=${apiKey}`);
    var apiInformationTwo = await  responseTwo.json()

    var todaysdate = apiInformation.dt_txt;
    var formatedTodaysDate = dayjs(todaysdate).format('MM-DD-YYYY');

    var mainDiv = $('<div class="border border-black mainDivOne"></div>');
    var headerDiv = $('<div class="d-flex"></div>');
    var hearderDiv2 = $('<div class="maxFlex"></div>');
    var largeDivBlock = $('<div class="d-flex gap-2"></div>');

    var h1City = $('<h1></h1>').text(city+' ('+formatedTodaysDate+')');
    var imgPrimary = $('<img></img>').attr('src', iconUrl+apiInformation.weather[0].icon+'.png');
    var pOne = $('<p></p>').text('Temperature: '+Math.round(apiInformation.main.temp)+'°C');
    var pTwo = $('<p></p>').text('Wind: '+apiInformation.wind.speed+'m/s');
    var pThree = $('<p></p>').text('Humidity: '+apiInformation.main.humidity+'%');
   
    mainElement.append(mainDiv, headerDiv, largeDivBlock);

    mainDiv.append(h1City, imgPrimary, pOne, pTwo, pThree);

    headerDiv.append(hearderDiv2);
    var headerOne = $('<h1></h1>').text('5-Day Forecast:');
    
    hearderDiv2.append(headerOne);

    localStorage.setItem('history', JSON.stringify(city));

    var x = 7;

    for(i = 0; i<arrayDivs.length; i++){

        var futuresDate = apiInformationTwo.list[x].dt_txt;
        var formatedFuturesDate = dayjs(futuresDate).format('MM-DD-YYYY');

        var smallDivBlock = $('<div class="seperateFlex bg-primary"><div>');
        var headerTwo = $('<h2></h2>').text(formatedFuturesDate);
        var img = $('<img></img>').attr('src', iconUrl+apiInformationTwo.list[x].weather[0].icon+'.png');
        var pOne = $('<p></p>').text('Temp: '+Math.round(apiInformationTwo.list[x].main.temp)+'°C');
        var pTwo = $('<p></p>').text('Wind: '+apiInformationTwo.list[x].wind.speed+'m/s');
        var pThree = $('<p></p>').text('Humidity: '+apiInformationTwo.list[x].main.humidity+'%');

        largeDivBlock.append(smallDivBlock);
        smallDivBlock.append(headerTwo, img, pOne, pTwo, pThree);

        x +=8;
    }
    searchHistory(city);
}
} 

function searchHistory(city){
    
    var previousSearchHistory = $('#previousSearchHistory');
    var buttons = previousSearchHistory.find('button');
  
    var cityExists = false;

    buttons.each(function() {
      if ($(this).text() === city) {
        cityExists = true;
        return false;
      }
    });
  
    if (!cityExists) {
      var button = $('<button class="btn btn-secondary gap-2"></button>').text(city);
      previousSearchHistory.append(button);
      localStorage.setItem('history', JSON.stringify(city));

}}

userFormElement.addEventListener('submit',handleForm);