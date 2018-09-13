import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import API_KEY from './api.js';
import Form from './components/form.jsx';
import Events from './components/events.jsx';
import Map from './components/map.jsx';
import $ from 'jquery';
import Contact from './components/Comments.js';
import Navigation from './components/Navigation.js';
import Comments from './components/feedback.jsx';
// import Nav from './components/nav.js';
import Fire from './components/fire.jsx';
import Login from './components/login.jsx';
class App extends Component {
 constructor (props){
   super(props);
   this.state = {
     eventList: [],
     lat: null,
     lon: null,
     description:'',
     category: '',
     user: {},
   }

   this.getEvent = this.getEvent.bind(this);
   this.getCategory = this.getCategory.bind(this);
   this.addComment = this.addComment.bind(this);

 }


 addComment(description) {

   $.ajax({
     url:'/events',
     type: "POST",
     contentType: 'application/json',
     data: JSON.stringify({
       description: description
     }),
     success: (data)=> {
     },
     error: (xhr,status,error) => {
     }
   });
 }


  async getEvent() {
   await fetch (`http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${this.state.lat}, ${this.state.lon}&within=14&t=thisweek`)
    .then(res => res.json())
    .then(data => {
    this.setState({
        eventList: data.events.event
      })
    })
 }

 getCategory(categorySelected) {
    fetch (`http://api.eventful.com/json/events/search?app_key=${API_KEY}&location=${this.state.lat}, ${this.state.lon}&within=14&t=thisweek&c=${categorySelected}`)
    .then(res => res.json())
    .then(data => {
      if (data.events === null) {
        return alert('Sorry!!..there are no '+ categorySelected +' events scheduled today');
      }
    this.setState({
        eventList: data.events.event
      })
    })
 }

 componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        lat: location.coords.latitude,
        lon: location.coords.longitude
      })
      this.getEvent();
    });
 }

 authListener(){
   fire.auth().onAuthStateChanged((user) => {
     console.log(user);
     if (user) {
       this.setState({ user });
       localStorage.setItem('user'. user.uid);
     } else {
       this.setState({ user: null});
     }
   });
 }

 render() {

   var eventInfo = this.state.eventList.map((item) =>
      [item.title, item.venue_name, item.longitude, item.latitude, item.start_time, item.description]);

   var locations = eventInfo.map((location) =>
      [location[3], location[2], location[0], location[1], location[5]]);

   return (

     <div>

        <Form getCategory={this.getCategory} getEvent={this.getEvent}/>

        <div>
          {this.state.user ? (<home />) : (<login/>)}
          <Login events={eventInfo}/>
           </div>
             <div style={{width:'100%', height:600}}>

               <Map locationInfo = {locations} />

              </div>

             <Events eventInfo ={eventInfo} />

    </div>

   );
 }
}

export default App;
