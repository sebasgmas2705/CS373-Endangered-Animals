  import React from 'react';

  import NavMain from './NavMain';
  import PageHeader from './PageHeader';
  import PageFooter from './PageFooter';
  import Row from '../../src/Row';
  import Col from '../../src/Col';
  import Thumbnail from '../../src/Thumbnail';


  var axios = require('axios');

  export default class Page extends React.Component {

    constructor(props) {
      super(props);

      this.renderCountry = this.renderCountry.bind(this);
      this.state = {
        animal: {}
      };

      console.log(global.animal);
      var that = this;
      axios.create({
        baseURL: 'https://swe-endangered-animals.appspot.com/',
        headers: {"Access-Control-Allow-Origin": "*"}
      }).get('/single_animal_data/?animal_name='+global.animal)
        .then(function(data) {
          console.log("data!");
          console.log(data);
          that.setState({
            animal: data.data
          });
      });
    };

    shouldComponentUpdate() {
      return true;
    };

    renderCountry() {
      return (
        <Thumbnail src={this.state.animal.imageLink}>
            <h3>{global.animal}</h3>
            <p><b>Scientific name: &nbsp; </b>{this.state.animal.scientificName}</p>
            <p><b>Vulnerability status: &nbsp; </b>{this.state.animal.vulnerability}</p>
            <p><b>Threats: &nbsp; </b></p>
              <p className="pre-scrollable" max-height="150">{this.state.animal.assoc_threats}</p>


            <p><b>Habitats:</b></p>
              <p className="pre-scrollable" max-height="150">
                {this.state.animal.assoc_habitats}
              </p>

          </Thumbnail>
      );
    };

    render() {
      return (
        <div>
          <NavMain activePage="animals" />

          <PageHeader
            title={ global.animal } />

            <div className="container bs-docs-container bs-docs-single-col-container">
              <div className="bs-docs-section">
            
                { /* Countries */ }
                <Row>
                  { 
                    this.renderCountry()
                  }
                </Row>

              </div>
            </div>

          <PageFooter />
        </div>
      );
    };
  }
