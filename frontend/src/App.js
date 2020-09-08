import React from 'react';
import axios from 'axios';
import { bufferToBase64, } from './utils'

const base64Flag = 'data:image/jpeg;base64,';
const url = "http://localhost:5000/upload"

class App extends React.Component {

  state = {
    file: null,
    imageSrc: "",
    uploadedFiles: [],
    imageName: ""
  };

  componentDidMount(){
    this.fetchImages();
  }

  fetchImages = () => {
    axios.get(url)
    .then(res => {
      this.setState({ uploadedFiles: res.data.img })
    })
    .catch(err => console.log('err', err))
  }

  handleChange = (e) => {
    if(e.target.files){
      this.setState({ 
        file: e.target.files[0],
        imageSrc: URL.createObjectURL(e.target.files[0]) 
      });
    }
    if(e.target.name === "imagename"){
      this.setState({ imageName: e.target.value})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', this.state.imageName);
    data.append('attachment', this.state.file);
    axios.post(url, data)
      .then((res) => {
        alert(res.data.message)
        this.setState({ file: null, imageSrc: "", uploadedFiles: [...this.state.uploadedFiles, res.data.data]})
        this.myFormRef.reset();
      })
      .catch((err) => alert(err));
  }

  render() {
    return (
      <>
        <h1>MERN Stack File Upload</h1>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data" ref={(el) => this.myFormRef = el}>
          <input type="file" onChange={this.handleChange} required />
          <button type="submit">Upload</button>
          <button type="reset" onClick={() => this.setState({ imageSrc: "" })}>Clear</button>
          <input type="text" name="imagename" onChange={this.handleChange} placeholder="Enter image name" required />
        </form>
        {this.state.imageSrc && <img src={this.state.imageSrc} width="150" height="auto" alt="people" />}
        <div className="grid">
          {this.state.uploadedFiles.map((img,i) => {
            return <div className="uploaded-image" key={i}>
              <img src={base64Flag+bufferToBase64(img.img.data.data)} alt="mongo" />
              <p>{img.imageName}</p>
            </div>
          })}
        </div>
      </>
    )
  }
}

export default App;