const React = require('react')
const {BrowserRouter, Match, Link, Redirect} = require('react-router')
const {style} = require('glamor')
const xhr = require('xhr')

const Locations = React.createClass({
  getInitialState(){
    return {
      locations: [],
      removed: false,
    }
  },
  handleRemove(e){
    e.preventDefault()
    if(confirm('Are you sure?')){
      xhr.del('http://localhost:4000/locations/' + this.state.locations.id, (err,res,body) => {
        if(err) return console.log(err.message)
        this.setState({removed: true})
      })
    }

  },
  componentDidMount(){
    this.props.get(this.props.params.id,'locations',(err,locations) => {
      if(err) return console.log(err.message)
      this.setState({locations})
    })
  },
  render(){
    console.log(this.state)
    return(
      <div>
        {this.state.removed ? <Redirect to="/locations" /> : null}
        <h1>{this.state.locations.name}</h1>
          <Link to={`/locations/${this.state.locations.id}/edit`}>edit</Link>
          <button onClick={this.handleRemove}>remove</button>
          <Link to="/locations">return</Link>
      </div>
    )
  }
})


module.exports = Locations
