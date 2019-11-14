import React, { Component } from 'react'
import axios from 'axios'
import API from "../utils/API";
import { Redirect } from 'react-router-dom'
import SingleTeam from "../components/TeamsListItem/teamslistitem";



class Test extends Component {

	constructor () {
		super()
		this.state = {
      loggedin: null,
      email: null,
      id: null,
      teamName: null,
      teams: []
		}

		this.handleTeamSubmit = this.handleTeamSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)    
		
	}


  fetchUser() {
    API.checkForSession()
      .then(res => {
        console.log("check for session", res)
        return API.getUser(res.data.user._id);
      })
      .then(res => {
        console.log("the user returned from api call", res)
        this.setState({id: res.data._id});
      })
      .catch(() => {});
  }

  componentDidMount() {
    this.fetchUser();
  }


    handleTeamSubmit(event) {

    event.preventDefault()

      let teamName = {
        teamName: this.state.teamName}

      let userId = this.state.id

      API.createTeam(teamName)
      .then(res => {
        let team = {
          teamId: res.data._id
        }
        console.log("response", res)
        
        return API.addTeamToParticipant(userId, team)
      })
      .then(res => {
        this.setState({
          teams: res.data.teams
        })

      })
      .catch(console.error)


    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

render() {


  return(
  <div>
  <h4>create a team</h4>
  <form>
      team name:<br/>
    <input type="text" name="teamName" onChange={this.handleChange}/><br/>
    <input type="submit" value="Submit" onClick={this.handleTeamSubmit}/>
  </form>
    <div>
  <h2> teams i'm on </h2>
           <ul>
          {this.state.teams.map (team =>{
            return(
              <SingleTeam item={team}>
              </SingleTeam>
              )
          })}
          </ul> 
  </div>
  </div>

  );
  }
}

export default Test;