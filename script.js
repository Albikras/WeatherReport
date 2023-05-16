var searchInput = document.getElementById('userTypedInfo');//declaring variable searchInput and setting it equal to id of userTypedInfo 
var searchBtn = document.getElementById('searchBtn');//declaring variable searchBtn and setting it equal to id of searchBtn 
var userFormElement = document.getElementById('userFormElement');//declaring variable userFormElement and setting it equal to id of userFormElement 

var apiKey = '9be1ab40fb6c098c07f182a1724c0fbd';//declare variable apiKey and set equal to the api key
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?";//declare variable apiUrl and set equal to api link
var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?";//declare variable apiUrl2 and set equal to api link
var iconUrl = 'https://openweathermap.org/img/wn/';//declare variable iconUrl and set equal to a linkf or the icons

var mainElement = $('#main');//declare variable mainElement and set equal to id of main

var arrayDivs = ['1','2','3','4','5'];//declare variable of arrayDivs and set equal to an array with 5 elements

/**
 * function handleForm with parameters of event, prevent the default then get the input from the user
 * and pass that vlaue into the weather function 
 */
function handleForm(event){
    event.preventDefault();
    var city = searchInput.value.trim()
    weather(city);
    searchInput.value = "";
}

var history = JSON.parse(localStorage.getItem("history")) || [];// declare variable history and set equal to the parse of localstorage

/**
 * declare an async function in order to use await within the function pass the value of city to this function 
 */
async function weather(city){

    if(city === ''){//if city is an empty string 
        alert('Please Enter A Valid Input!!!');
    }else{
    mainElement.empty();//use to clear the function so the values do not repeat on the webpage

    var response = await fetch(apiUrl +'q='+city+`&units=metric&appid=${apiKey}`)//declare variable response set to await(make it so it has to grab value of fetch first) fetch the apiUrl with inputed values
    var apiInformation = await response.json()//declare variable apiInformation set to await for the response.json()

    var responseTwo = await fetch(apiUrl2+'q='+city+`&units=metric&appid=${apiKey}`);//declare variable responseTwo set to await(make it so it has to grab value of fetch first) fetch the apiUrl with inputed values
    var apiInformationTwo = await  responseTwo.json()//declare variable apiInformationTwo set to await for the responseTwo.json()

    var todaysdate = apiInformation.dt_txt;//declare variable todaysDate and set equal to apiInformation.dt_txt which is the date within the object
    var formatedTodaysDate = dayjs(todaysdate).format('MM-DD-YYYY');//declare variable formatedTodaysDate and set equal to dayjs.format to format the previous date properly

    var mainDiv = $('<div class="border border-black mainDivOne"></div>');//declare a variable mainDiv and set it equal to created element div with classes
    var headerDiv = $('<div class="d-flex"></div>');//declare a variable headerDiv and set it equal to created element div with classes
    var hearderDiv2 = $('<div class="maxFlex"></div>');//declare a variable hearderDiv2 and set it equal to created element div with classes
    var largeDivBlock = $('<div class="d-flex gap-2"></div>');//declare a variable largeDivBlock and set it equal to created element div with classes

    var h1City = $('<h1></h1>').text(city+' ('+formatedTodaysDate+')');//declare vairable h1city and set equal to created element h1 and then set text equal to variable city and formatedTodaysDate
    var imgPrimary = $('<img></img>').attr('src', iconUrl+apiInformation.weather[0].icon+'.png');//declare variable imgPrimary and set equal to element img and set attr src to the image from iconUrl and icon from object of apiInformation
    var pOne = $('<p></p>').text('Temperature: '+Math.round(apiInformation.main.temp)+'°C');//declare variable pOne and set equal to element p then set text equal to rounded value from apiInformation object
    var pTwo = $('<p></p>').text('Wind: '+apiInformation.wind.speed+'m/s');//declare variable pTwo and set equal to element p then set text equal to  apiInformation object
    var pThree = $('<p></p>').text('Humidity: '+apiInformation.main.humidity+'%');//declare variable pTwo and set equal to element p then set text equal to  apiInformation object
   
    mainElement.append(mainDiv, headerDiv, largeDivBlock);// append variables mainDiv, headerDiv, largeBlockDiv to mainElement

    mainDiv.append(h1City, imgPrimary, pOne, pTwo, pThree);// append variables h1City, imgPrimary, pOne, pTwo, and pThree to mainDiv


    headerDiv.append(hearderDiv2);// append variable hearderDiv2 to headerDiv
    var headerOne = $('<h1></h1>').text('5-Day Forecast:');//declare variable headerOne and set equal to element h1 and set text equal to a string
    
    hearderDiv2.append(headerOne);// append variable headerOne to hearderDiv2

    var x = 7;// declare variable x and set equal to 7

    /**
     * for loop to loop through previous array in order to create our 5 div blocks with context
     */
    for(i = 0; i<arrayDivs.length; i++){

        var futuresDate = apiInformationTwo.list[x].dt_txt;//declare variable futuresDate and set equal to apiInformationTwo.list[x].dt_txt which is the date within the object
        var formatedFuturesDate = dayjs(futuresDate).format('MM-DD-YYYY');//declare variable formatedFuturesDate and set equal to dayjs.format to format the previous date properly

        var smallDivBlock = $('<div class="seperateFlex bg-primary"><div>');//declare a variable smallDivBlock and set it equal to created element div with classes
        var headerTwo = $('<h2></h2>').text(formatedFuturesDate);//declare variable headerTwo and set equal to created element h2 and then set text equal to formatedFuturesDate
        var img = $('<img></img>').attr('src', iconUrl+apiInformationTwo.list[x].weather[0].icon+'.png');//declare variable img and set equal to element img and set attr src to the image from iconUrl and icon from object of apiInformationTwo
        var pOne = $('<p></p>').text('Temp: '+Math.round(apiInformationTwo.list[x].main.temp)+'°C');//declare variable pOne and set equal to element p then set text equal to rounded value from apiInformationTwo object
        var pTwo = $('<p></p>').text('Wind: '+apiInformationTwo.list[x].wind.speed+'m/s');//declare variable pTwo and set equal to element p then set text equal to  apiInformationTwo object
        var pThree = $('<p></p>').text('Humidity: '+apiInformationTwo.list[x].main.humidity+'%');//declare variable pThree and set equal to element p then set text equal to  apiInformationTwo object

        largeDivBlock.append(smallDivBlock);// append variable smallDivBlock to largeDivBlock
        smallDivBlock.append(headerTwo, img, pOne, pTwo, pThree);// append variables headerTwo, img, pOne, pTwo, and pThree to smallDivBlock

        x +=8;//increment variable x by 8
    }
    searchHistory(city);//call to function search history and pass variable city
}
} 

/**
 * declare function searchHistory with the parameters of city 
 */
function searchHistory(city){
    
    var previousSearchHistory = $('#previousSearchHistory');//declare variable previousSearchHistory and set equal to id of previousSearchHistory
    var buttons = previousSearchHistory.find('button');//declare vairable buttons and set equal to previousSearchHistory at method find to excute on each element of button
  
    var cityExists = false;//declare varible cityExists and set equal to false

    /**
     * variable function, for each element within the array put it through this function
     */
    buttons.each(function() {
      if ($(this).text() === city) {//if buttons text is equal to the vairble city 
        cityExists = true;//then cityExist is equal to true
        return false;//return as false
      }
    });
  
    if (!cityExists) {//if it does not equal cityExists
      var button = $('<button class="btn btn-secondary gap-2"></button>').text(city);//declare variable button equal to created element of button with classes
      previousSearchHistory.append(button);// append button to previousSearchHistory
      localStorage.setItem('history', JSON.stringify(city));//set the string version of city to localstorage

}}

userFormElement.addEventListener('submit',handleForm);//add an event listerner to userFormElement, when submitted it will go to function handleForm