const React = require('react')
const {BrowserRouter, Match, Link} = require('react-router')
const {style} = require('glamor')
const xhr = require('xhr')


let styles = {
  listFont: style({
    color: 'blue',
    ':hover': {
      color: 'black'
    }
  }),
  headerFont: style({
    color: 'red',
  })
}


const Efforts = React.createClass({
  getInitialState(){
    return {
      persons: []
    }
  },
  componentDidMount(){
    this.props.allDocs('efforts',(err,persons) => {
      if(err) return console.log(err.message)
      this.setState({persons})
    })
  },
  render(){
    const listEffort = (effort,i) =>
      <li {...styles.listFont} key={i}>
        <Link to={`/efforts/${effort.id}/show`}>
          { effort.Name }
        </Link>
      </li>

    return(
      <div>
        <h1 {...styles.headerFont}>Efforts</h1>
        <Link to="/efforts/new">Add New</Link>
        <ul>
        {this.state.persons.map(listEffort)}
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
})


module.exports = Efforts
