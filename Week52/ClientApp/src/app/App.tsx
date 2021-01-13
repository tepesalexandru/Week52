import * as React from 'react';
import Layout from '../components/Layout';

import { RenderComponentRoutes } from './routes/routeHelper';
import { routes } from './routes/routes';

export default () => (
    <Layout>
        {RenderComponentRoutes(routes)}
    </Layout>
);
