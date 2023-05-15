//Declare variables
var previousSearchHistory = $('#previousSearchHistory');
var userTypedInfo = $('#userTypedInfo');
var userFormElement = $('#userFormElement');
//declare api vaiable
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=seattle&appid&units=metric";
var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q=seattle&appid&units=metric";
//  + cityName + "&appid=" + APIKey + '&units=metric";
var apiKey = '9be1ab40fb6c098c07f182a1724c0fbd';

var main = $('#main');

var cityName = $('#cityName');//
var temp = $('#Temprature');//
var wind = $('#Wind');//
var humidity = $('#Humidity');//
var icon = $('#Icon');//

var date1 = $('#Date1');
var temp1 = $('#Temprature2');
var wind1 = $('#Wind2');
var humidity1 = $('#Humidity2');
var icon1 = $('#Icon2');

var date2 = $('#Date2');
var temp2 = $('#Temprature3');
var wind2 = $('#Wind3');
var humidity2 = $('#Humidity3');
var icon2 = $('#Icon3');

var date3 = $('#Date3');
var temp3 = $('#Temprature4');
var wind3 = $('#Wind4');
var humidity3 = $('#Humidity4');
var icon3 = $('#Icon4');

var date4 = $('#Date4');
var temp4 = $('#Temprature5');
var wind4 = $('#Wind5');
var humidity4 = $('#Humidity5');
var icon4 = $('#Icon5');

var date5 = $('#Date5');
var temp5 = $('#Temprature6');
var wind5 = $('#Wind6');
var humidity5 = $('#Humidity6');
var icon5 = $('#Icon6');

 

var searchHistory =  async function (event){
    event.preventDefault();
    main.removeClass('hide');
    var searchedValue = userTypedInfo.val();
    if (searchedValue){
        previousSearches(searchedValue);
        console.log(searchedValue);
    }
    else{
        alert('please enter a valid value');
    }
    var response = await fetch(apiUrl +`&appid=${apiKey}`);
    var informationPortion = await response.json()
    
    var iconImage = 'https://openweathermap.org/img/wn/'+ informationPortion.weather[0].icon + '.png';

    var date = informationPortion.dt_txt;
    var properDate = dayjs(date).format('MM-DD-YYYY');
    
    console.log(properDate);

    console.log(informationPortion);
    
    cityName.text(informationPortion.name +" "+ "("+properDate+")");
    icon.attr('scr', iconImage);
    
    temp.text('Temperature: '+Math.round(informationPortion.main.temp+'\u00B0'));
    wind.text('Wind: '+informationPortion.wind.speed+'m/s');
    humidity.text('Humidity: '+informationPortion.main.humidity+'%');

    var response2 = await fetch (apiUrl2 +`&appid=${apiKey}`);
    var infoPort = await response2.json();

    var day2 = infoPort.list[7].dt_txt;
    var properDay2 = dayjs(day2).format('MM-DD-YYYY');
    
    date1.text(properDay2);
    icon1.attr('scr', iconImage);
    temp1.text('Temperature: '+Math.round(infoPort.list[7].main.temp+'\u00B0'));
    wind1.text('Wind: '+infoPort.list[7].wind.speed+'m/s');
    humidity1.text('Humidity: '+infoPort.list[7].main.humidity+'%');//

    var day3 = infoPort.list[15].dt_txt;
    var properDay3 = dayjs(day3).format('MM-DD-YYYY');
    
    date2.text(properDay3);
    icon2.attr('scr', iconImage);
    temp2.text('Temperature: '+Math.round(infoPort.list[15].main.temp+'\u00B0'));
    wind2.text('Wind: '+infoPort.list[15].wind.speed+'m/s');
    humidity2.text('Humidity: '+infoPort.list[15].main.humidity+'%');//

    var day4 = infoPort.list[23].dt_txt;
    var properDay4 = dayjs(day4).format('MM-DD-YYYY');
    
    date3.text(properDay4);
    icon3.attr('scr', iconImage);
    temp3.text('Temperature: '+Math.round(infoPort.list[23].main.temp+'\u00B0'));
    wind3.text('Wind: '+infoPort.list[23].wind.speed+'m/s');
    humidity3.text('Humidity: '+infoPort.list[23].main.humidity+'%');//

    var day5 = infoPort.list[31].dt_txt;
    var properDay5 = dayjs(day5).format('MM-DD-YYYY');
    
    date4.text(properDay5);
    icon4.attr('scr', iconImage);
    temp4.text('Temperature: '+Math.round(infoPort.list[31].main.temp)+'\u00B0');
    wind4.text('Wind: '+infoPort.list[31].wind.speed+'m/s');
    humidity4.text('Humidity: '+infoPort.list[31].main.humidity+'%');//

    var day6 = infoPort.list[39].dt_txt;
    var properDay6 = dayjs(day6).format('MM-DD-YYYY');
    
    date5.text(properDay6);
    icon5.attr('scr', iconImage);
    temp5.text('Temperature: '+Math.round(infoPort.list[39].main.temp+'\u00B0'));
    wind5.text('Wind: '+infoPort.list[39].wind.speed+'m/s');
    humidity5.text('Humidity: '+infoPort.list[39].main.humidity+'%');//


}
function previousSearches(searchedValue){
    console.log(searchedValue);
    var creatingBtn = $('<button></button>');
    
    creatingBtn.addClass('btn bg-secondary');
    creatingBtn.attr('type', 'sumbit');
   
    previousSearchHistory.append(creatingBtn);
    
    
    creatingBtn.text(searchedValue);


    previousSearchHistory.on('submit', searchHistory);
}
function whatever(){
    
    creatingBtn = searchedValue.val();
    return searchHistory;
}




userFormElement.on('submit', searchHistory)
