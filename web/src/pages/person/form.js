const React = require('react')
const labelStyle = {display: 'block'}
const {Link,Redirect} = require('react-router')
const xhr = require('xhr')

const Form = React.createClass({
  getInitialState(){
    return({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      success: false
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
      xhr.put('http://localhost:4000/persons/' + this.state.id,{
        json: this.state
      },(err,res) => {
        if(err) return console.log(err)
        this.setState({success: true})
      })
    }else {
      xhr.post('http://localhost:4000/persons/',{
        json: this.state
      },(err,res) => {
        if(err) return console.log(err)
        this.setState({success: true})
      })
    }
  },
  componentDidMount(){
    if(this.props.params.id){
      xhr.get('http://localhost:4000/persons/' + this.props.params.id,
      {json: true}, (err,res,person) => {
        if(err) return console.log(err.message)
        this.setState(person)
      })
    }
  },
  render(){
    const formState = this.state.id ? 'Edit' : 'New'
    return(
      <div>
        {this.state.success ? <Redirect to="/persons" /> : null}
        <h1>{formState} Person</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label style={labelStyle}>First Name</label>
            <input
              onChange={this.handleChange('firstName')}
              value={this.state.firstName}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input
              onChange={this.handleChange('lastName')}
              value={this.state.lastName}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>E-mail</label>
            <input
              onChange={this.handleChange('email')}
              value={this.state.email}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input
              onChange={this.handleChange('phone')}
              value={this.state.phone}
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
