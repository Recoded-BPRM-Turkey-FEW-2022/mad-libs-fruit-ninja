/**
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 */
function parseStory(rawStory) {
  let allWords = [];
  //we will push our objects into this array later on.
  const adj = [/\[a\]/,"adj"];
  const noun = [/\[n\]/,"noun"];
  const verb = [/\[v\]/,"verb"];
  const punc = /[,.“”"':!?]/g; 
  //I made them an array , first one is our regex the second is the name of it.
  // Im gonna use them with their indexes to create a custom object pusher function.
  //used regex to not write that ugly thing over and over again :D now its just a cute letter.
  const splittedStory = rawStory.split(" ");

  //splitted the story into smaller bits. now we have to deal with Louis[n]etc.
  splittedStory.forEach(word => {
    // we can use .match too. .match returns a string .test returns a boolean.
    const objectPusher = (word,pos) => {
      // if(word.match(punc)){
      //   word= word.slice(0,-1);}
      allWords.push(
        {
          word: word.replace(pos[0],""),
          pos: pos[1],
        })
    }
      if(verb[0].test(word)){
        objectPusher(word,verb)
      }else if(adj[0].test(word)){
        objectPusher(word,adj);
      }else if(noun[0].test(word)){
        objectPusher(word,noun);
      }else {
        allWords.push({word: word})
      }
//    console.log(allWords);
  });
  return allWords;
};

function displayer(allWords){
  let previewP = document.querySelector(".previewP");
  let editP = document.querySelector(".editP");

  for(let i=0;i<allWords.length ;i++){
    if(!allWords[i].pos){
      editP.innerHTML += `<input maxLength="20" type="text" value="" placeholder="${allWords[i].word}"id="input${i}"> `;
      previewP.innerHTML += `<span id="preview${i}">_____</span>`;

      editP.addEventListener("input",()=>{
        let previewItem = document.getElementById("preview"+i);
        let editInput = document.getElementById("input"+i);
        previewItem.innerHTML = editInput.value+" ";
      });
    }else if(allWords[i].pos){
      editP.innerHTML += `${allWords[i].word} `;
      previewP.innerHTML += `${allWords[i].word} `;
    }
  }
}

getRawStory().then(parseStory).then((processedStory) => {
  displayer(processedStory);
});
/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */