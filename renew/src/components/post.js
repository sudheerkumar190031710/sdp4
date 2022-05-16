import axios from "axios";
import React from "react";

class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          item_name: '',
          item_description: '',
          item_type: '',
          item_brand:'',
          item_year:'',
          item_place:'',
          item_price:'',
          item_img:'',
          
        };
    }
    handleImgChange(e){
        this.setState({item_img:e.target.files[0]})
    }
    handleItemNameChange(e){
        this.setState({item_name:e.target.value});
    }
    handleItemDescriptionChange(e){
        this.setState({item_description:e.target.value});
    }
    handleItemTypeChange(e){
        this.setState({item_type:e.target.value});
    }
    handleItemYearChange(e){
        this.setState({item_year:e.target.value});
    }
    handleItemBrandChange(e){
        this.setState({item_brand:e.target.value});
    }
    handleItemPriceChange(e){
        this.setState({item_price:e.target.value});
    }
    handleItemPlaceChange(e){
        this.setState({item_place:e.target.value});
    }
    handlePost(e){
        e.preventDefault();
        const item_name=this.state.item_name.trim();
        const item_description=this.state.item_description.trim();
        const item_type=this.state.item_type.trim();
        const item_brand=this.state.item_brand.trim();
        const item_con=document.getElementById('radio_1').value;
        const item_year=this.state.item_year.trim();
        const item_img=this.state.item_img;
        const item_place=this.state.item_place.trim();
        const item_price=this.state.item_price.trim();
        let form_data=new FormData();
        form_data.append('img', item_img);
        form_data.append('user', "sudheer");
        form_data.append('name', item_name);
        form_data.append('description', item_description);
        form_data.append('type', item_type);
        form_data.append('year', item_year);
        form_data.append('brand', item_brand);
        form_data.append('condition', item_con);
        form_data.append('price', item_price);
        form_data.append('place', item_place);
        let url="http://127.0.0.1:8000/user/post/"
        axios.post(url,form_data,{headers: {'content-type': 'multipart/form-data'}})
            .then((res) => {alert(res)})
            .catch((err) => {alert(err)});
    };
    render(){
    return(
        <div className="root">
            <div className="banner">
        <h1>Posting Ads</h1></div>
        <form onSubmit={this.handlePost.bind(this)}>
            <div className="item">
            <label for="name">Name<span>*</span></label>
        <input type="text" placeholder="Name"  id="name" value={this.state.item_name} onChange={this.handleItemNameChange.bind(this)}/></div>
        <div className="item">
          <label for="comment">Description<span>*</span></label>
        <textarea placeholder="description" name="item_description" id="comment" rows="3" onChange={this.handleItemDescriptionChange.bind(this)}/></div>
        <div className="item">
          <label for="type">Type<span>*</span></label>
        <input type="text" placeholder="type" name="item_type" id="type" onChange={this.handleItemTypeChange.bind(this)}/></div>
        <div className="item">
          <label for="brand">Brand<span>*</span></label>
        <input type="text" placeholder="brand" name="item_brand" id="brand"onChange={this.handleItemBrandChange.bind(this)}/></div>
        <div className="item">
          <label for="year">Year<span>*</span></label>
        <input type="number" placeholder="year" name="item_year" id="year" onChange={this.handleItemYearChange.bind(this)}/></div>
        <div  className="item">
             <label for="condition">Item Condition<span>*</span></label>
          </div>
          <div className="question">
          <div className="question-answer">
            <div>
              <input type="radio" value="Good" id="radio_1" name="availability" required/>
              <label for="radio_1" className="radio"><span>Good</span></label>
            </div>
            <div>
              <input  type="radio" value="Average" id="radio_1" name="availability"/>
              <label for="radio_2" className="radio"><span>Avergae</span></label>
            </div>
             <div>
              <input  type="radio" value="Bad" id="radio_1" name="availability"/>
              <label for="radio_3" className="radio"><span>Bad</span></label>
            </div>
          </div>
          </div>
          <div className="item">
          <label for="place">Place<span>*</span></label>
        <input type="text" placeholder="Place" name="place" id="item_place" onChange={this.handleItemPlaceChange.bind(this)}/></div>
        <div className="item">
          <label for="price">Price<span>*</span></label>
        <input type="number" step="any" placeholder="Price" name="price" id="item_price" onChange={this.handleItemPriceChange.bind(this)}/></div>
        <div className="item">
           <label for="photo">Photo<span>*</span></label>
        <input type="file" id="photo" name="item_img" accept="image/*" onChange={this.handleImgChange.bind(this)}/></div><br/>
        <div classNameName="btn-block">
        <center><input type="submit" value="post"/></center>
        </div>
        </form>
        </div>
    );
    }
    
}
export default Post;