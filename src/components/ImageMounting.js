import React,{} from 'react'
import {connect} from 'react-redux'
import { loadedImage } from '../redux/action_creators/Partner_info_Load.js';


const mapStateToProps = (state) => {

    return {
      data: state,
      imgUrl:state.imgUrl
  
    }
  }
  
class ImageMounting extends React.Component {

  constructor(props) {
    super(props);
    //props.dispatch(loadedImage(props.imageIdentifier));

    console.log("MOUNTING COMPONENT", props, props)
    props.dispatch(loadedImage(props.imageIdentifier));

  }

  render() {
    return (<img width="50%" height="400px" src={this.props.imgUrl} />);
  }
}

export default connect(mapStateToProps)(ImageMounting);