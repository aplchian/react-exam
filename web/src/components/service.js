const React = require('react')
const xhr = require('xhr')
const API_URL = process.env.REACT_APP_API

const Service = Component => React.createClass({
  allDocs(cb){
    xhr.get(API_URL + '/persons',{json: true}, (err,res,body) =>{
      cb(err,body)
    })
  },
  get(id,cb){
    xhr.get(API_URL+'/persons/'+id,{json: true}, (err,res,body) =>{
      cb(err,body)
    })
  },
  render(){
    return(
      <Component {...this.props}
          allDocs={this.allDocs}
          get={this.get}
          post={this.post}
          put={this.put}
          remove={this.remove}
      />
    )
  }
})

module.exports = Service
