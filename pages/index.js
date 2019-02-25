import React from "react";
import Head from "next/head";

import "../styles.scss";
import Form from './form';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <Head>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
            <title>Appointment Form</title>
        </Head>
        <div className="container">
            <div style={{ textAlign: "center" }} className="example">
                Request an appointment {this.props.userAgent}
            </div>
            <Form />
        </div>
      </div>
    );
  }
}
