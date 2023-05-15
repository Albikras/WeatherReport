//Declare variables
var previousSearchHistory = $('#previousSearchHistory');
var userTypedInfo = $('#userTypedInfo');
var userFormElement = $('#userFormElement');
//declare api vaiable

var searchHistory = function (event){
    event.preventDefault();
    var searchedValue = userTypedInfo.val();
    console.log(searchedValue);
    if (searchedValue){
        previousSearches(searchedValue);
        console.log(searchedValue);
    }
    else{
        alert('please enter a valid value');
    }


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
