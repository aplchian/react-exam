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


const Locations = React.createClass({
  getInitialState(){
    return {
      locations: []
    }
  },
  componentDidMount(){
    this.props.allDocs('locations',(err,locations) => {
      if(err) return console.log(err.message)
      this.setState({locations})
    })
  },
  render(){
    console.log(this.state)
    const listPerson = (location,i) =>
      <li {...styles.listFont} key={i}>
        <Link to={`/locations/${location.id}/show`}>
          { location.name }
        </Link>
      </li>

    return(
      <div>
        <h1 {...styles.headerFont}>Locations</h1>
        <Link to="/locations/new">Add New</Link>
        <ul>
        {this.state.locations.map(listPerson)}
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
})


module.exports = Locations
