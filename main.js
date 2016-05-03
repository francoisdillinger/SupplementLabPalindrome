// Creating the module
var app = angular.module('Main', ['ngRoute']);

// Configuring the routes
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    // Sets the route for the reverse page
    .when('/reverse',{
        templateUrl: 'views/reverse.html',
        controller: 'ReverseCtrl'
    })
    // Sets the route for the main view
    .when('/',{
        templateUrl: 'views/main.html',
        controller: 'RegularCtrl'
    });
}]);

// Creating the controller for the main page
app.controller('RegularCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope){
    // Function called when the 'Click me' button is pressed
    $scope.buttonOne = function(){
        // Assigns the input value to a variable then passes it to the rootScope
        var initialInput = $scope.input;
        $rootScope.input = initialInput;
            // Checks to make sure the input is not null or empty
            if(initialInput == null || initialInput == ''){
                alert('You need to enter a word.');
            }
            // If a value has been entered properly then it runs this code switching to the other view
            else{
                $location.path('/reverse');
            }
    }    
}]);

// This is the controller for the reverse view
app.controller('ReverseCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope){
        
        // This function splits the letters into an array, reverses them, and rejoins them
        String.prototype.reverse = function() {
                return this.split('').reverse().join('');
        }
        // Assigns the rootScope value to a variable
        var passedInput = $rootScope.input;
        // Turns that value into all lowercase
        var value = passedInput.toLowerCase();
        // Runs the reverse function on the word
        var reverseInput = value.reverse();
        // Assigning a string value to two variables that will be printed onto the screen
        var yourInputNormal = 'You typed the word ' + value + '.';       
        var yourInputReversed = 'Your word reversed is ' + reverseInput + '.';
        // Attaching the variable values to the local scope which will push it to the screen
        $scope.normal = yourInputNormal;
        $scope.reverse = yourInputReversed;
            // If the two words are the same normal and reversed, this code will run letting the user know they match
            if(value == reverseInput){
                $scope.palindrome = 'It is a palindrome!';
            }
            // If not it will print this code to the screen
            else{
                $scope.palindrome = "It is not a palindrome!";
            }
        // This function runs when the 'Try again' button is clicked
        $scope.home = function() {
            // Clears the value of the input on the main page
            $rootScope.input = '';
            // Sets the location path which brings up the main view
            $location.path('/')    
        }
}]);