

var fight = function(enemy) {

  //keep track of who goes first
  var isPLayerTurn = true;

  //randomly change turn order
  if(Math.random() > 0.5){
    isPLayerTurn = false;
  }

    while (playerInfo.health > 0 && enemy.health > 0) {

      if(isPLayerTurn){

        //ask player if they'd like to fight or skip using fightOrSkip function 
        if(fightOrSkip()){

          //if true, leave fight by breaking loops
          break;
        }

        // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
        //generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

        console.log(playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.');

         // check enemy's health
        if (enemy.health <= 0) {
          window.alert(enemy.name + ' has died!');
    
          // award player money for winning
          playerInfo.money = playerInfo.money + 20;
          // leave while() loop since enemy is dead
          break;
        } 
        else {
          window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
        }
      }

      //player gets attacked first
      else{

        
        //generate random damage value based on enemy's attack power
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        // remove players's health by subtracting the amount set in the enemy.attack variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        console.log(enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.');

        // check player's health
        if (playerInfo.health <= 0) {
          window.alert(playerInfo.name + ' has died!');
          // leave while() loop if player is dead
          break;
        } else {
          window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
        }
      }
     
      //switch turn order for next round
      // the operator "!" flip the boolean values of the isPlayerTurn 
      //Notice how the "!", known as the not operator, is used in the value switching operation to reassign the isPlayerTurn. This step is critical for exchanging turns.
      isPLayerTurn = !isPLayerTurn; 

    } // end of while loop
  }; // end of fight function



var startGame = function(){

  //reset player stats
  playerInfo.reset();

  for(var i = 0; i < enemyInfo.length; i++){
    
    if(playerInfo.health > 0){

        //let player know what round they are in, that arrays start at 0 so it needs to have 1 added to it
        window.alert("welcome to Robot Gladiator! Round " + (i+1));

        //pick new enemy to fight based on the index of the enemy.names array
        var pickedEnemyObj = enemyInfo[i];

        //reset enemy.health before starting new fight
        pickedEnemyObj.health = randomNumber(40,60);

        //pass the picked enemy.names variable's value into the fight function, where it will assume the value of the enemy.name parameter
        fight(pickedEnemyObj);

        //if we're not at the last enemy in the array
        if(playerInfo.health > 0 && i < enemyInfo.length -1){

          //ask if player wants to use the store before next round
          var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

          //if yes, take them to the store() function 
          if(storeConfirm){
            shop();
          }
        }
    }
    else{
        window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
  }
  //after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

//function to end the entire game
var endGame = function(){
  window.alert("The game has now ended. let's see how you did!");

  //check localStorage for high score, if it's not there, use 0
  var highScore = localStorage.getItem("highscore");

  if(highScore === null){
    highScore = 0;
  }

  //if player has more money than the high score, player has new high score
  if(playerInfo.money > highScore){
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
  }
  else{
    alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
  }

  /*
  //if player is still alive, player wins!
  if(playerInfo.health > 0){
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else{
    window.alert("You've lost you robot in battle.");
  }
  
  //asl player if the'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again!");
  */

  if(playAgainConfirm){

    //restart the game
    startGame();
  }
  else{
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

//shop functionality to buy perks and refill health
var shop = function(){
  
  //ask player what they'd like to do 
  var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one, 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");

  shopOptionPrompt = parseInt(shopOptionPrompt);
  //use switch to carry out action 
  switch(shopOptionPrompt){

    
    case 1: 
      playerInfo.refillHealth();
      break;
    
    
    case 2: 
      playerInfo.upgradeAttack();
      break;

    
    case 3: 
      
      window.alert("Leaving the store");

      //do nothing, so function will end
      break;

    default: window.alert("You did not pick a valid option. try again.");

      //call shop() function again to force player to pick a valid option 
      shop();
      break;
  }
};

//function to generate a random numeric values
var randomNumber = function(min, max){

  var value = Math.floor(Math.random() * (max - min - 1) + min);

  return value;
}

//function to set a name
var getPlayerName = function(){

  var name = "";

  while(name === "" || name === null){
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

var fightOrSkip = function(){

   // ask player if they'd like to fight or run
   var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

   //Conditional Recursive Function Call
   if(promptFight === "" || promptFight === null){
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
   }

    promptFight = promptFight.toLowerCase();

   // if player picks "skip" confirm and then stop the loop
   if (promptFight === "skip") {

     // confirm player wants to skip
     var confirmSkip = window.confirm("Are you sure you'd like to quit?");

     // if yes (true), leave fight
     if (confirmSkip) {
       window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');

       // subtract money from playerInfo.money for skipping
       playerInfo.money = Math.max(0, playerInfo.money - 10);
       console.log("player money", playerInfo.money);

       //return true if player wants to leave
       return true;
     }
   }
   return false;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,

  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function(){
    if(this.money >= 7){
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else{
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function(){
    if(this.money >= 7){
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else{
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10,14)
  }
];
//start the game when the page loads
startGame();