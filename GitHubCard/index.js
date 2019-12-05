/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

let ghData = axios.get("https://api.github.com/users/aalvinlin");

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

// console.log(ghData);

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

let cards = document.querySelector(".cards");
cards.appendChild(createCard(ghData));

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = axios.get("https://api.github.com/users/aalvinlin/followers").map(follower => {
  
  let followerData = axios.get("https://api.github.com/users/" + follower.login);
  cards.appendChild(createCard(followerData));

});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:
*/

function createCard(data) {

  let divCard = document.createElement("div");
  divCard.classList.add("card");

  let img = createAndAppend("img", divCard, {src: data["avatar_url"]});

  let cardInfo = createAndAppend("div", divCard);

    let h3 = createAndAppend("h3", cardInfo, {textContent: data.name});
    let pUsername = createAndAppend("p", cardInfo, {class: "username", textContent: data.login});
    let pLocation = createAndAppend("p", cardInfo, {textContent: "Location: " + data.location});
    let pProfile = createAndAppend("p", cardInfo, {textContent: "Profile: "});
      let profileLink = createAndAppend("a", pProfile, {href: data.url, textContent: data.url});
    let pfollowers = createAndAppend("p", cardInfo, {textContent: "Followers: " + data.followers});
    let pfollowing = createAndAppend("p", cardInfo, {textContent: "Following: " + data.following});
    let pBio = createAndAppend("p", cardInfo, {textContent: "Bio: " + data.bio});
  
  return divCard;
}

function createAndAppend(element, parent, data)
{
  let newElement = document.createElement(element);
  
  for (key in data)
    {
      if (key === "textContent")
        { newElement.textContent = data[key]; }
      else
        { newElement.setAttribute(key, data[key]); }
    }

  parent.appendChild(newElement);
  
  return newElement;
}