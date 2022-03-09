import React, { Component } from 'react';
export default class MultipleImageUploadComponent extends Component {

    constructor(props) {
        super(props);
    this.state = {
        selectedFiles: undefined,
        previewImages: [],
        progressInfos: [],
        message: [],
        imagesName:[],
        imageInfos: [],
      }
      this.selectFiles = this.selectFiles.bind(this);
  
    }

    selectFiles(event) {
        let images = [];
        let imagesName = [];
        //  let {selectedFiles}= this.state
        for (let i = 0; i < event.target.files.length; i++) {
          images.push(event.target.files[i])
          let tempGetimg = event.target.files[i];
          imagesName.push({...imagesName,tempGetimg})
        }
        
        this.props.getImagedata(images)
        this.setState({
          progressInfos: [],
          message: [],
          selectedFiles: event.target.files,
          previewImages: images
        },() => {

          //  selectedFiles.map((files)=>{
          // })
         
        }
        )
        
      }

    render() {
        const { selectedFiles, previewImages, progressInfos, message, imageInfos } = this.state;
        return (
                <div>
                  <div className="row">
                    <div className="col-8">
                      <label className="btn btn-default p-0">
                        <input type="file" multiple accept="image/*" onChange={this.selectFiles} />
                      </label>
                    </div>
          
                    <div className="col-4">
                      <button
                        className="btn btn-success btn-sm"
                        disabled={!selectedFiles}
                        onClick={this.uploadImages}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
          
                  {progressInfos &&
                    progressInfos.map((progressInfo, index) => (
                      <div className="mb-2" key={index}>
                        <span>{progressInfo.fileName}</span>
                        <div className="progress">
                          <div
                            className="progress-bar progress-bar-info"
                            role="progressbar"
                            aria-valuenow={progressInfo.percentage}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: progressInfo.percentage + "%" }}
                          >
                            {progressInfo.percentage}%
                          </div>
                        </div>
                      </div>
                    ))}
          
                  {previewImages && (
                    <div>
                      {previewImages.map((img, i) => {
                        return <img className="preview" src={img} alt={"image-" + i}  key={i}/>;
                      })}
                    </div>
                  )}
          
                  {message.length > 0 && (
                    <div className="alert alert-secondary" role="alert">
                      <ul>
                        {message.map((item, i) => {
                          return <li key={i}>{item}</li>;
                        })}
                      </ul>
                    </div>
                  )}
          
                  <div className="card mt-3">
                    <div className="card-header">List of Files</div>
                    <ul className="list-group list-group-flush">
                      {imageInfos &&
                        imageInfos.map((img, index) => (
                          <li className="list-group-item" key={index}>
                            <p><a href={img.url}>{img.name}</a></p>
                            <img src={img.url} alt={img.name} height="80px" />
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              );
    }
}

