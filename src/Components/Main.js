import React from 'react';
import { Route } from 'react-router-dom';
import Sources from './Sources';
import Headlines from './Headlines';
/**
 * Application routing 
 * 
 */
export default function () {
    return <main id="main">
        {/* https://reacttraining.com/react-router/web/example/url-params */}
        <Route exact strict path="/" component={Sources} />
        <Route exact strict path="/headlines/:page" component={Headlines} />
        <Route exact strict path="/headlines:source:language" component={Headlines} />
        <Route exact strict path="/headlines" component={Headlines} />
        <Route exact strict path="/headlines/:source/:page" component={Headlines} />
    </main>
}