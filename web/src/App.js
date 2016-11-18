const React = require('react')
const Home = require('./pages/home')
const About = require('./pages/about')
const Persons = require('./pages/persons/')
const Person = require('./pages/person/')
const {BrowserRouter, Match, Link , Miss} = require('react-router')

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
          <Match exactly pattern="/persons" component={Persons} />
          <Match exactly pattern="/persons/:id/show" component={Person} />
          <Miss  component={NoMatch} />
        </div>
    </BrowserRouter>
    )
  }
})

module.exports = App
