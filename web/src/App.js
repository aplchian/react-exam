const React = require('react')
const Home = require('./pages/home')
const About = require('./pages/about')
const Person = require('./pages/person/')
const Persons = require('./pages/person/show')
const PersonForm = require('./pages/person/form')
const Efforts = require('./pages/efforts/show')
const Effort = require('./pages/efforts/')
const EffortForm = require('./pages/efforts/form')
const Locations = require('./pages/locations/show')
const Location = require('./pages/locations/')
const LocationForm = require('./pages/locations/form')
const {BrowserRouter, Match, Link , Miss} = require('react-router')
const Service = require('./components/service')

const NoMatch = () => (
  <div>
    <h3>Page Not Found</h3>
  </div>
)


const App = React.createClass({
  render(){
    return(
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Home} />
          <Match exactly pattern="/about" component={About} />

          <Match exactly pattern="/persons" component={Service(Persons)} />
          <Match exactly pattern="/persons/:id/show" component={Service(Person)} />
          <Match exactly pattern="/persons/new" component={Service(PersonForm)} />
          <Match pattern="/persons/:id/edit" component={Service(PersonForm)} />

          <Match exactly pattern="/efforts" component={Service(Efforts)} />
          <Match exactly pattern="/efforts/:id/show" component={Service(Effort)} />
          <Match exactly pattern="/efforts/new" component={Service(EffortForm)} />
          <Match pattern="/efforts/:id/edit" component={Service(EffortForm)} />

          <Match exactly pattern="/locations" component={Service(Locations)} />
          <Match exactly pattern="/locations/:id/show" component={Service(Location)} />
          <Match exactly pattern="/locations/new" component={Service(LocationForm)} />
          <Match pattern="/locations/:id/edit" component={Service(LocationForm)} />

          <Miss  component={NoMatch} />
        </div>
    </BrowserRouter>
    )
  }
})

module.exports = App
