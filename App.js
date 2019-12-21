//--------------- importing ---------------
import "./App.css";
import React from "react";
// import ReactDOM from 'react-dom';
import "./tictactoe.css";
//--------------- some background stuff //  found on https://stackoverflow.com/questions/42464888/how-do-i-change-the-background-color-of-the-body ---------
document.body.style = "background: teal;";



//==================== BUTTON VARIABLES ===================

//--------------------- New Button -----------------------
function ClearStory(props) {
  return (
    <p>
      <button onClick={props.onClick} className="testbutton">
        Clear Story
      </button>
    </p>
  );
}
function SaveStory1Button(props) {
  return (
    <p>
      <button onClick={props.onClick} className="savestorybutton">
        Save Story
      </button>
    </p>
  );
}

function SaveButton(props) {
  return (
    <p>
      <button onClick={props.onClick} className="savepointsbutton">
        Save Points
      </button>
    </p>
  );
}
//--------------------- Makes Story1 Button ---------------------
function Story1SubmitButton(props) {
  return (
    <p>
      <button onClick={props.onClick} className="submitbutton">
        Submit
      </button>
    </p>
  );
}
//-------------------Creates button for Existing User Login--------------
function ExistingUserLogin(props) {
  return (
    <p className="userlogin">
      {props.value}
      <button onClick={props.onClick}>Login</button>
    </p>
  );
}
//---------------- Creates button for new users ----------------------
function CreateNewUser(props) {
  return (
    <p>
      <button onClick={props.onClick} className="newuser">
        New User
      </button>
    </p>
  );
}
//------------------- variables used to interact with the database -----------
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      story1sentences: [],
      currentuser: "No User",
      story1: "Click button to change sentence",
      textVal: "",
      currentUserPoints: 0
    };
  }

  //==================== BACKEND FUCNTIONS =========================

  //-------------- Old ignore this  ----------------
  // handleTestFunction(evt) {
  //   var periodDetector = this.state.textVal;
  //   console.log((periodDetector.match(/./g) || []).length);
  // }
  handleSaveStory1(){
    var story1 = this.state.story1sentences
    console.log(story1)
    fetch("http://localhost:9000/storyAPI",{
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storyBody: story1,
        storyName: 'Story00'
      })
    })
    .then(res => {
      console.log("story saved")
    })
  }

  //--------------Verifies that user exists----------------
  handleVerifyUser() {
    var userName = prompt("Enter Username ", "Type Username Here");
    console.log("verifying user...");
    fetch("http://localhost:9000/userAPI", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: userName })
    })
      .then(res => {
        console.log("user logged in");
        return res.json();
      })
      .then(res => {
        console.log(res[0].username, 'has', res[0].score, 'points saved');
        this.setState({ currentuser: res[0].username });
        this.setState({ currentUserPoints: res[0].score});
        if (res[0].score === undefined){
          this.setState({currentUserPoints: 0})
        }
      });
  }
  //-------------- Saves points by editing the user's points in the db ----
  handleSavePoints() {
    fetch("http://localhost:9000/userAPI", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userScore: this.state.currentUserPoints,
      userName: this.state.currentuser
    })
    })
    .then(res =>{
    console.log(res.body);
  })
}
handleClearStory(){
  this.setState({story1sentences: ""})
  fetch("http://localhost:9000/storyAPI",{
    method: "delete",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({nameOfStory: 'Story00'})
  })
  .then(res =>{
    console.log("story cleared")
  })
}

  //--------------- Saves textbox value and turns it into the story text // copied from stack overflow-----------
  // maybe add this next to evt.target.value // .substr(0, 100) // not sure what its purpose is

  handleChangeSentenceStory1(evt) {
    this.setState({ textVal: evt.target.value });
  }
  //-------------- Sends state of Story 1 Sentence ----------
  handleSaveStory1Sentence(evt) {
    var textBoxVal = this.state.textVal;
    console.log(textBoxVal);
    console.log("Sending Sentence to Database");
    fetch("http://localhost:9000/storyAPI", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recentSentence: textBoxVal,
        storyID: 1
      })
    })
      .then(res => {
        console.log(res);
      })
      .then(res => {
        console.log("Sentence Saved");
      })
      .then(res => {
        var textBoxValue = this.state.textVal;
        var charactersTyped1 = (textBoxValue.match(/./g) || []).length;
        this.setState({
          currentUserPoints: this.state.currentUserPoints + charactersTyped1
        });
        // copied from stack overflow -- this is how to push item into the story array.
        var joined = this.state.story1sentences.concat(this.state.textVal);
        this.setState({ story1sentences: joined })
        console.log(this.state.story1sentences)
      });
  }
  //--------------- Creates User by sending post to the database --------------
  handleCreateUser() {
    var newUserName = prompt("Enter New Username ", "Type New Username");
    console.log(newUserName);
    console.log("sending a put");
    fetch("http://localhost:9000/userAPI", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newUserName: newUserName })
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log("user", res.username, "has been created");
      });
  }
  //--------------------- gets the story to show it at the beginning --------
  getStory1() {
    fetch("http://localhost:9000/storyAPI")
    .then(res => {
      return res.json();
    })
    .then(res => {
      this.setState({story1sentences: res[0].story})
      console.log(res[0].story)
    })
  }
  componentDidMount(){
    this.getStory1();
  }

  //====================CREATION OF FRONT END==============


  //------------ This Render is what puts all of the website together ------------------

  render() {
    return (
      <div>
        <div className="board-row">
        <div className="allign">
        <div className="big">



          <h1 className="rainbow">
          JacksonStory
          </h1>

          <h4 className="rainbow">
          Collaborative Story Creation Website
          </h4>
          <div>
            <ExistingUserLogin onClick={this.handleVerifyUser.bind(this)} />{" "}
            <CreateNewUser onClick={this.handleCreateUser} />
          </div>
          <div>{this.state.currentuser} Is Logged In</div>
          <div>
          {this.state.currentuser} has {this.state.currentUserPoints} points

              <SaveButton onClick={this.handleSavePoints.bind(this)} />
          </div>
          <h1 className="story1header"> <div className="rainbow">Story 1</div></h1>
          <div id="outputText">
          {this.state.story1sentences}
          </div>
          <br>
          </br>
          <input
            type="text"
            value={this.state.textVal}
            onChange={this.handleChangeSentenceStory1.bind(this)}
          />
          <div>
            <Story1SubmitButton onClick={this.handleSaveStory1Sentence.bind(this)}/>
            <SaveStory1Button onClick={this.handleSaveStory1.bind(this)}/>
            <ClearStory onClick={this.handleClearStory.bind(this)}/>
          </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
//------------------------ Compiles files that interact with back end -------------------
class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <HomePage />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
// --------------- Dont know waht this does// pretty sure its important ----------------
export default App;

// ====================== Space for Slashed out Code =====================
