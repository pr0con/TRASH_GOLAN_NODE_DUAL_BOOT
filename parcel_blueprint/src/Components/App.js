import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import {navigate, useRoutes} from 'hookrouter';


import AppProvider from './AppProvider.js'; 
import { AppContext } from './AppProvider.js';

const StyledApp = styled.div`
	position: relative;
	top: 0px;
	left: 0px;
	width: 100vw;
	height: 100vh;
	
	display: grid;
	grid-template-columns: 32rem 1fr;
	
	color: #dbebee;
	
	#app-wrapper-right {
		display: grid;
		grid-template-rows: 8rem 1fr;
	}
`;

import { Nav } from './Nav.js';
import { Sidebar } from './Sidebar.js';
import { Dashboard } from './Dashboard.js';

import { Login } from './Login.js';
import { Servers } from './Servers.js';
import { Projects } from './Projects.js';
import { Profile } from './Profile.js';
import { Tasks } from './Tasks.js';
import { Expenses } from './Expenses.js';
import { State } from './State.js';

import { Errors } from './Errors.js';

function App() {
	const routes = {
		'/': () => <Dashboard />,
		'/login': () => <Login />,
		'/signup': () => <Login />,
		'/servers': () => <Servers />,
		'/projects':() => <Projects />,
		'/profile':() => <Profile />,
		'/tasks':() => <Tasks />,
		'/expenses':() => <Expenses />,
		'/state': () => <State />,
	}
	const routeResult = useRoutes(routes);
		
	return(
		<AppProvider>
			<AppContext.Consumer>
				{({ }) => (			
					<StyledApp>
						<Sidebar />
						<div id="app-wrapper-right">
							<Nav />
							{ routeResult }
						</div>
						<Errors />
					</StyledApp>					
				)}
			</AppContext.Consumer>			
		</AppProvider>					
	)
}

if (document.getElementById('react_root')) {
    ReactDOM.render(<App />, document.getElementById('react_root'));
}