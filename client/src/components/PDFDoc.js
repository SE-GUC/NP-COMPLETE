// import React, { Component } from 'react'
// import { Document, Page } from 'react-pdf'

// export class PDFDoc extends Component {
//   constructor (props) {
//     super(props)
//     this.state = { numPages: null, pageNumber: 1 }

//     this.onDocumentLoadSuccess = ({ numPages }) => {
//       this.setState({ numPages })
//     }

//     this.goToPrevPage = () =>
//       this.setState(state => ({ pageNumber: state.pageNumber - 1 }))
//     this.goToNextPage = () =>
//       this.setState(state => ({ pageNumber: state.pageNumber + 1 }))
//   }

//   render () {
//     const { pageNumber, numPages } = this.state

//     return (
//       <div>
//         <nav>
//           <button onClick={this.goToPrevPage}>Prev</button>
//           <button onClick={this.goToNextPage}>Next</button>
//         </nav>

//         <div style={{ width: 600 }}>
//           <Document
//             file={`template/${this.props.companyId}.pdf`}
//             onLoadSuccess={this.onDocumentLoadSuccess}
//           >
//             <Page pageNumber={pageNumber} width={600} />
//           </Document>
//         </div>

//         <p>
//           Page {pageNumber} of {numPages}
//         </p>
//       </div>
//     )
//   }
// }

// export default PDFDoc

import React from 'react';
import { Container, Header, Grid, Form } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';
class PDFDoc extends React.Component {
  state = {
    file: null,
    numPages: 0,
    pageNumber: 1
  }
  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
  nextPage = () => {
    const currentPageNumber = this.state.pageNumber;
    let nextPageNumber;
    if (currentPageNumber + 1 > this.state.numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }
    this.setState({
      pageNumber: nextPageNumber
    });
  }
  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <Container>
        <br />
        <Header textAlign="center">PDF Preview</Header>
        <Form>
          <input type="file" onChange={this.onFileChange}>
          </input>
        </Form>
        <Grid centered columns={2}>
          <Grid.Column textAlign="center" onClick={this.nextPage}>
            <Document file={this.state.file} 
                      onLoadSuccess={this.onDocumentLoadSuccess}
                      onLoadError={console.error}
                      noData={<h4>Please select a file</h4>}>
              <Page pageNumber={pageNumber} />
            </Document>
            {this.state.file ? <p>Page {pageNumber} of {numPages}</p> : null}
          </Grid.Column>
        </Grid>
      </Container>
    )
  } 
}

export default PDFDoc
