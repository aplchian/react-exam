const React = require('react')
const {BrowserRouter, Match, Link, Redirect} = require('react-router')
const {style} = require('glamor')
const xhr = require('xhr')

const Persons = React.createClass({
  getInitialState(){
    return {
      person: [],
      removed: false,
    }
  },
  handleRemove(e){
    e.preventDefault()
    if(confirm('Are you sure?')){
      xhr.del('http://localhost:4000/persons/' + this.state.person.id,(err,res,body) => {
        if(err) return console.log(err.message)
        this.setState({removed: true})
      })
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
        {this.state.removed ? <Redirect to="/persons" /> : null}
        <h1>{`${this.state.person.firstName} ${this.state.person.lastName} `}</h1>
          <Link to={`/persons/${this.state.person.id}/edit`}>edit</Link>
          <button onClick={this.handleRemove}>remove</button>
          <Link to="/persons">return</Link>
      </div>
    )
  }
})


module.exports = Persons
