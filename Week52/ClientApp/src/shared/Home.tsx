import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const Home = () => (
  <div>
   <Redirect to="/weekly-goals"/>
  </div>
);

export default connect()(Home);
