import React from "react";


export default class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state={
      time:''   
    }
  }
  render(){
    let url="https://cdn.windowsreport.com/wp-content/uploads/2019/08/Storm-Weather-1200x900.jpg?auto=compress&cs=tinysrgb&h=350"
  return (
    <div style={{  
      backgroundImage: `url(${url})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      width:'100%',
      height:'100%',
      backgroundRepeat: 'no-repeat'
    }}>
      
     </div>)
  }
}