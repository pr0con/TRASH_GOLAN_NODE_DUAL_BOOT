import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledServers = styled.div`	
	position:relative;
	top:0px;
	left:0px;
	width: 100%;
	height: 100%;
	background: #23234f;
	
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;	
	
	input[type="text"] {
		background: transparent;
		border: 0px;
		border-bottom: 1px solid #fff;
		min-height: 3rem;
		color: #fff;
	}
	
	.servers-form-actions {
		display:flex;
		flex-direction: row-reverse;
		align-items: center;
	}		
`;



//https://uppy.io/docs/react/ file upload interface filepond alternative...

import { GetServers } from './Forms/GetServers.js';
import { AddUpdateServer } from './Forms/AddUpdateServer.js'; 
import { GetDeleteServer } from './Forms/GetDeleteServer.js';

export function Servers() {
	return(
		<StyledServers>
			<GetServers />
			<AddUpdateServer />
			<GetDeleteServer />			
		</StyledServers>
	)
}