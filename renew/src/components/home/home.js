import React from "react";
import axios from "axios";

class Home extends React.Component{
    state = {
        details : [],
    }
  
    componentDidMount() {
  
        let data ;
        
        axios.get('http://127.0.0.1:8000/user/post/')
        .then(res => {
            data = res.data;
            this.setState({
                details : data    
            });
        })
        
        .then((res) => {})
    }
    
    render(){
        return(
            <div>
            {this.state.details.map((a, id) =>  (
            <div key={id}>
            <div >
                  <div >
                  <img src={a.Image} width="500px" height="300px" ></img>
                  <br/>
                        <h4>User: {a.User}</h4>
                        <h4>Item Name: {a.Name} </h4>
                        <h4>Item description: {a.Description}</h4>
                        <h4>Item Brand: {a.Brand} </h4>
                        <h4>Item Type: {a.Type}</h4>
                        <h4>Item Price: {a.Price} </h4>
                        <h4>Item Location: {a.Place}</h4>
                        <h4>Item Year: {a.Year} </h4>
                        <h4>Item Condition: {a.Condition}</h4>
                        
                        
                        <br/>
                  </div>
            </div><br/>
            </div>
            )
        )}
      </div>
        );
    }
}
export default Home; 