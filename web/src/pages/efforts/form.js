const React = require('react')
const labelStyle = {display: 'block'}
const {Link,Redirect} = require('react-router')
const xhr = require('xhr')
const {filter,flatten,propEq,find,forEach,compose,map} = require('ramda')

const Form = React.createClass({
  getInitialState(){
    return({
          form: {
            "Name": "",
            "Description": "",
            "startdate": "",
            "enddate": "",
            "phase": "planning",
            "team": []
          },
          persons: []
        })
  },
  handleChange(field){
    return e => {
      const newState = this.state['form']
      newState[field] = e.target.value
      this.setState({
        form: newState
      })
    }
  },
  handleSubmit(e){
    e.preventDefault()
    // this.setState({
    //   startdate: new Date(this.state.form.startdate).toISOString(),
    //   enddate: new Date(this.state.form.enddate).toISOString()
    // })
    // if(this.state.name === ""){
    //   return alert('Name is required!')
    // }
    if(this.state.form.Name === ""){
      return alert('Name is required!')
    }

    const teamToArray = function(member){
      return member.id.toString()
    }
    const teamArray = this.state.form.team.map(teamToArray)
    this.setState({
      form: {
        "Name": this.state.form.Name,
        "Description": this.state.form.Description,
        "startdate": this.state.form.startdate,
        "enddate": this.state.form.enddate,
        "phase": this.state.form.phase,
        team: teamArray
      }
    }, _ => {
      if(this.props.params.id){
        console.log('submitforrrm',this.state)
        xhr.put('http://localhost:4000/efforts/' + this.props.params.id,{
          json: this.state.form
        },(err,res) => {
          if(err) return console.log(err)
          this.setState({success: true})
        })
      }else {
        xhr.post('http://localhost:4000/efforts/',{
          json: this.state.form
        },(err,res) => {
          if(err) return console.log(err)
          this.setState({success: true})
        })
      }
    })
  },
  componentDidMount(){

    if(this.props.params.id){
      xhr.get('http://localhost:4000/efforts/' + this.props.params.id,
      {json: true}, (err,res,effort) => {
        if(err) return console.log(err.message)
        console.log('effort',effort)
        this.setState({
          form: effort
        },console.log('yodel',this.state))
      })
    }
    // this.props.allDocs('persons',(err,persons) => {
    //   var stringifyID = function(item){
    //     item.id = item.id.toString()
    //     return item
    //   }
    //   if(err) return console.log(err.message)
    //   persons.unshift({"firstName": "Take ", lastName: "Your Pick!", id: 'null'})
    //   persons = map(stringifyID,persons)
    //   this.setState({
    //     persons: persons
    //   })
    //     const findPerson = (person) => {
    //       return find(propEq('id',person.toString()))(this.state.persons)
    //     }
    //     const team = map(findPerson,this.state.form.team)
    //     console.log('TEEAM',team)
    //     this.setState({
    //       form: {
    //         "Name": this.state.Name,
    //         "Description": this.state.Description,
    //         "startdate": this.state.startdate,
    //         "enddate": this.state.enddate,
    //         "phase": this.state.phase,
    //         team: team
    //       }
    //     })
    // })

  },
  editTeamMember(index){
    return e => {
      const getPerson = person => {
        return e.target.value.toString() === person.id.toString()
      }
      const theTeam = this.state.form.team
      theTeam[index] = filter(getPerson,this.state.persons)[0]
      this.setState({
        form: {
          "Name": this.state.Name,
          "Description": this.state.Description,
          "startdate": this.state.startdate,
          "enddate": this.state.enddate,
          "phase": this.state.phase,
          team: theTeam
        }
      })

    }
  },
  addPhase(e){
    e.preventDefault()
    console.log('good!')
    const currentTeam = this.state.form.team
    console.log(currentTeam)
    currentTeam.push({name:null, id: 'null'})
    console.log(currentTeam)
    this.setState({
      form: {
        "Name": this.state.Name,
        "Description": this.state.Description,
        "startdate": this.state.startdate,
        "enddate": this.state.enddate,
        "phase": this.state.phase,
        "team": currentTeam
      }
    })
  },
  render(){
    console.log('STATE',this.state)
    const formState = this.state.form.id ? 'Edit' : 'New'
    function personOption(person){
      return <option value={person.id} key={person.id}>{`${person.firstName} ${person.lastName}`}</option>
    }
    const selectTeam = state => {
      return (member, index) => {
        return (
          <select
            value={member.id}
            onChange={this.editTeamMember(index)}
            key={member.id}
            >
            {state.persons.map(personOption)}
          </select>
        )
      }
    }
    return(
      <div>
        {this.state.success ? <Redirect to="/efforts" /> : null}
        <h1>{formState} Effort</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              onChange={this.handleChange('Name')}
              value={this.state.form.Name}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              onChange={this.handleChange('Description')}
              value={this.state.form.Description}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Start Date(DD-MM-YYY)</label>
            <input
              onChange={this.handleChange('startdate')}
              value={this.state.form.startdate}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>End Date(DD-MM-YYY)</label>
            <input
              onChange={this.handleChange('enddate')}
              value={this.state.form.enddate}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Team</label>
            {this.state.form.team.map(selectTeam(this.state))}
            <button type="button" onClick={this.addPhase}>+1</button>
          </div>
          <div>
            <label style={labelStyle}>Phase</label>
            <select
              onChange={this.handleChange('phase')}
              value={this.state.form.phase}>
              <option value="started">started</option>
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
            </select>
          </div>
          <button>Submit</button>
          <Link to="/">cancel</Link>
        </form>
        <pre>
          {JSON.stringify(this.state,null,2)}
        </pre>
      </div>
    )
  }
})


module.exports = Form
