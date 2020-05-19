import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const StyledProjects = styled.div`		
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
	
	.projects-form-actions {
		display:flex;
		flex-direction: row-reverse;
		align-items: center;
		
		button:not(:last-child) {
			
		}
	}	
`;

import { GetProjects } from './Forms/GetProjects.js';
import { AddUpdateProject } from './Forms/AddUpdateProject.js';
import { GetDeleteProject } from './Forms/GetDeleteProject.js';

export function Projects() {	
	return(
		<StyledProjects>
			<GetProjects />
			<AddUpdateProject />
			<GetDeleteProject />
		</StyledProjects>
	)
}

