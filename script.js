const formy = document.getElementById("formy")
const texty = document.getElementById("texty")
const results = document.querySelector(".results");
const loading = document.getElementById("loading")
const main = document.getElementById("main")
const resolt = document.querySelector(".resolt");
const bored = document.querySelector('.board');
const realDict = buttface.split("\n");
const resultThing = document.querySelector(".result");
var board = [
    ['','','',''],
    ['','','',''],
    ['','','',''],
    ['','','','']
]
main.addEventListener("submit", (e) => {
  e.preventDefault();
  let good = true;
  document.querySelectorAll(".grid").forEach(grid => {
    if(!/^[a-zA-Z]*$/.test(grid.value)){
      good = false;
    }
  });
  if(!good) alert("Please enter valid letters");
  else {
    for(let i=0; i < 4; i++){
      for(let j=0; j < 4; j++){
        board[i][j] = document.getElementById(`input-${i}-${j}`).value;
      }
    }
    for(let i=0; i < 4; i++){
    for(let j=0; j < 4; j++){
      findWords(visited, "", i, j);
    }
    }
    resultThing.style.display = "block";
    resolt.innerHTML = "";
    wordList.forEach(word => resolt.innerHTML += `<li class="result-item">${word}</li>`);
  }
})


var wordList = [];

var visited = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false]
]
function inBounds(num){
  return !(num > 3 || num < 0);
}
function findWords(visited, word, x, y){
    word += board[x][y];
        word = word.toUpperCase();
    visited[x][y] = true;
    if(word.length > 2){
      if(isAWord(word)){
        if(wordList.indexOf(word) == -1){
          wordList.push(word);
        }
      }else {
      if(!doesBegin(word)){
        visited[x][y] = false;
        word = word.substring(0, word.length - 2);
        return false;
      }
      }
    }
    for(let r=-1; r <= 1; r++){
      for(let c=-1; c <= 1; c++){
        if(inBounds(x+c) && inBounds(y+r) && !(r == 0 && c == 0) && !visited[x+c][y+r]){
          findWords(visited, word, x+c, y+r);
        }
      }
    }
    visited[x][y] = false;
    word = word.substring(0, word.length - 2);
  }

function isAWord(word){
      let l = 0;
      let r = realDict.length-1;
      let m, res;
      while (l <= r){
        m = Math.floor((l+r)/2);
        res = word.localeCompare(realDict[m]);
        if(res == 0){
          return true;
        }else if(res > 0){
          l = m+1;
        }else {
          r = m-1;
        }
      }
      return false; 
    }
function doesBegin(word) {
      let l = 0;
      let r = realDict.length-1;
      let m, res;
      while (l <= r){
        m = Math.floor((l+r)/2);
        res = word.localeCompare(realDict[m].substring(0, word.length));
        if(res == 0){
          return true;
        }else if(res > 0){
          l = m+1;
        }else {
          r = m-1;
        }
      }
      return false;
    }

