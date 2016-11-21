const React = require('react')
const labelStyle = {display: 'block'}
const {Link,Redirect} = require('react-router')
const xhr = require('xhr')

const Form = React.createClass({
  getInitialState(){
    return({
      name: '',
      lat: '',
      long: '',
    })
  },
  handleChange(field){
    return e => {
      const newState = {}
      newState[field] = e.target.value
      this.setState(newState)
    }
  },
  handleSubmit(e){
    e.preventDefault()
    if(this.state.id){
      xhr.put('http://localhost:4000/locations/' + this.state.id,{
        json: this.state
      },(err,res) => {
        if(err) return console.log(err)
        this.setState({success: true})
      })
    }else {
      xhr.post('http://localhost:4000/locations/',{
        json: this.state
      },(err,res) => {
        if(err) return console.log(err)
        console.log('success!!',this.state)
        this.setState({success: true})
      })
    }
  },
  componentDidMount(){
    if(this.props.params.id){
      xhr.get('http://localhost:4000/locations/' + this.props.params.id,
      {json: true}, (err,res,location) => {
        if(err) return console.log(err.message)
        this.setState(location)
      })
    }
  },
  render(){
    const formState = this.state.id ? 'Edit' : 'New'
    return(
      <div>
        {this.state.success ? <Redirect to="/locations" /> : null}
        <h1>{formState} Location</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Latitude</label>
            <input
              onChange={this.handleChange('lat')}
              value={this.state.lat}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Longitude</label>
            <input
              onChange={this.handleChange('long')}
              value={this.state.long}
              type="text" />
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
