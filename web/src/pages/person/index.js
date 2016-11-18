const React = require('react')
const {BrowserRouter, Match, Link} = require('react-router')
const {style} = require('glamor')
const xhr = require('xhr')

const Persons = React.createClass({
  getInitialState(){
    return {
      person: []
    }
  },
  componentDidMount(){
    xhr.get('http://localhost:4000/persons/'+this.props.params.id,{
      json: true
    }, (err,res,person) => {
      if(err) return console.log(err.message)
      this.setState({person})
    })
  },
  render(){
    console.log(this.state)
    return(
      <div>
        <h1>{`${this.state.person.firstName} ${this.state.person.lastName} `}</h1>
        <Link to="/persons">return</Link>
      </div>
    )
  }
})


module.exports = Persons
