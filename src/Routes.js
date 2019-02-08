import React, {Component} from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Movies from './component/Movies';
import Seat from './component/Seat';
import Verify from './component/Verify';

export default class Routes extends Component<{}> {
    render(){
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                	<Scene key = "movies" component={Movies} title='Movies'/>
                	<Scene key = "seat" component={Seat} title='Seat'/>
                	<Scene key = "verify" component={Verify} title='Verify'/>
                </Stack>
            </Router>
        );

    }
}