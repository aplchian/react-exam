const React = require('react')
const Home = require('./pages/home')
const About = require('./pages/about')
const {BrowserRouter, Match, Link} = require('react-router')


const App = React.createClass({
  render(){
    return(
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <Match exactly pattern="/" component={Home} />
          <Match exactly pattern="/about" component={About} />
        </div>
    </BrowserRouter>
    )
  }
})

module.exports = App
