import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import { AppContext } from './AppProvider.js';


const StyledState = styled.div`
	position:relative;
	top:0px;
	left:0px;
	width: 100%;
	height: 100%;
	background: #23234f;
`;

export function State() {
	const appContext = useContext(AppContext);
	
	return(
		<StyledState>
			<ReactJson src={appContext} collapsed={true} theme="apathy" />
		</StyledState>
	)
}

