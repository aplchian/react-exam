const React = require('react')
const {BrowserRouter, Match, Link} = require('react-router')
const {style} = require('glamor')
const xhr = require('xhr')

// let styles = style({
//   color: 'blue',
//   ':hover': {
//     color: 'black'
//   }
// })

let styles = {
  listFont: style({
    color: 'blue',
    ':hover': {
      color: 'black'
    }
  }),
  headerFont: style({
    color: 'red',
    ':hover': {
      color: 'black'
    }
  })
}


const Persons = React.createClass({
  getInitialState(){
    return {
      persons: [{firstName: 'Bob', lastName: 'Marley'}]
    }
  },
  componentDidMount(){
    xhr.get('http://localhost:4000/persons',{
      json: true
    }, (err,res,persons) => {
      if(err) return console.log(err.message)
      this.setState({persons})
    })
  },
  render(){
    const listPerson = (person,i) =>
      <li {...styles.listFont} key={i}> { person.firstName + ' ' + person.lastName } </li>

    return(
      <div>
        <h1 {...styles.headerFont}>Persons</h1>
        <ul>
        {this.state.persons.map(listPerson)}
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
})


module.exports = Persons
