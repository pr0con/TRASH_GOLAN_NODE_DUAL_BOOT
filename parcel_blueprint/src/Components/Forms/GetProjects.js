import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import axios from 'axios';
import { AppContext } from '../AppProvider.js';

const StyledGetProjects = styled.div`		
	position:relative;	
	padding: 2rem;
	
	display: flex;
	flex-direction: column;		
`;

/*
	With Projection
	https://trash.pr0con.io:1200/api/v1/projects?select=name,description	
*/	

export function GetProjects() {
	const [ serverId, setServerId ]  = useState('');
	
	const [ projects, setProjects ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const { setErrors } = useContext(AppContext);	
	
	const requestProjects = async () => {
		setIsLoading(true);
		try {
			const result = await axios.get('https://trash.pr0con.io:1200/api/v1/projects');
			setProjects(result.data);
		} catch(error) {
			error.response.data.at = '@ Fetch - Projects';
			setErrors(error.response.data);				
		}
		setIsLoading(false);		
	}
	
	const requestProjectsAtServer = async() => {
		if(serverId != "") {
			setIsLoading(true);
			try {
				//const result = await axios.get(`https://trash.pr0con.io:1200/api/v1/projects`);
				const result = await axios.get(`https://trash.pr0con.io:1200/api/v1/servers/${serverId}/projects`);
				setProjects(result.data);
			} catch(error) {
				error.response.data.at = '@ Fetch - Projects at Server';
				setErrors(error.response.data);				
			}
			setIsLoading(false);
		}			
	}	
	
	useEffect(() => {
		requestProjects();
	},[])			
	
	return(
		<StyledGetProjects>
			{ isLoading === true && <>Loading Data...</> }
			{ isLoading === false && 'data' in projects && projects.data.length > 0 &&
				<ReactJson src={projects} collapsed={true} theme="apathy" />  
			}
			<input type="text" name="sid" placeholder="Server Id" onChange={(e) => setServerId(e.target.value.replace(/['"]+/g, ''))} value={serverId}/>	
	
							
			<div className="projects-form-actions">
				<button onClick={(e) => requestProjects()} type="button">Get All Projects</button>
				<button onClick={(e) => requestProjectsAtServer()} type="button">Get Project At Server</button>
			</div>				
								
		</StyledGetProjects>
	)
}