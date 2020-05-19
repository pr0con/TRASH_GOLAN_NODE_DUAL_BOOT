import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import { AppContext } from './AppProvider.js';


const StyledErrors = styled.div`
	position:fixed;
	bottom: .5rem;
	left: 32rem;
	width: calc( 100vw - 32rem );
	
	font-size: 2rem;
`;

export function Errors() {
	const { errors } = useContext(AppContext);
	
	return(
		<StyledErrors>
			<ReactJson src={errors} collapsed={true} theme="paraiso" />
		</StyledErrors>
	)
}

