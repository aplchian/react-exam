const React = require('react')
const {BrowserRouter, Match, Link, Redirect} = require('react-router')
const {style} = require('glamor')
const xhr = require('xhr')

const Efforts = React.createClass({
  getInitialState(){
    return {
      effort: [],
      removed: false,
    }
  },
  handleRemove(e){
    e.preventDefault()
    if(confirm('Are you sure?')){
      xhr.del('http://localhost:4000/efforts/' + this.state.effort.id, (err,res,body) => {
        if(err) return console.log(err.message)
        this.setState({removed: true})
      })
    }

  },
  componentDidMount(){
    this.props.get(this.props.params.id,'efforts',(err,effort) => {
      if(err) return console.log(err.message)
      this.setState({effort})
    })
  },
  render(){
    console.log(this.state)
    return(
      <div>
        {this.state.removed ? <Redirect to="/efforts" /> : null}
        <h1>{this.state.effort.Name}</h1>
          <Link to={`/efforts/${this.state.effort.id}/edit`}>edit</Link>
          <button onClick={this.handleRemove}>remove</button>
          <Link to="/efforts">return</Link>
      </div>
    )
  }
})


module.exports = Efforts
