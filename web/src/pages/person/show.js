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


const Persons = React.createClass({
  getInitialState(){
    return {
      persons: [{firstName: 'Bob', lastName: 'Marley'}]
    }
  },
  componentDidMount(){
    this.props.allDocs((err,persons) => {
      if(err) return console.log(err.message)
      this.setState({persons})
    })
  },
  render(){
    const listPerson = (person,i) =>
      <li {...styles.listFont} key={i}>
        <Link to={`/persons/${person.id}/show`}>
          { person.firstName + ' ' + person.lastName }
        </Link>
      </li>

    return(
      <div>
        <h1 {...styles.headerFont}>Persons</h1>
        <Link to="/persons/new">Add New</Link>
        <ul>
        {this.state.persons.map(listPerson)}
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
})


module.exports = Persons
