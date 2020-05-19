import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import axios from 'axios';
import { AppContext } from '../AppProvider.js';

const StyledGetDeleteProject = styled.div`
	position:relative;	
	padding: 2rem;
	
	display: flex;
	flex-direction: column;
`;

export function GetDeleteProject() {
	const [ resp, setResp ] = useState({});
	const [ projectId, setProjectId ] = useState('');
	const { setErrors } = useContext(AppContext);	
	
	
	
	const doFetch = async () => {
		if(projectId !== "") {
			await axios.get(`https://trash.pr0con.io:1200/api/v1/projects/${projectId}`).then((res) => {
				setResp(res.data);
			}).catch((error) => {
				error.response.data.at = '@ Fetch - Single Project';
				setErrors(error.response.data);
			});			
		}
	}
	
	const doDelete = async () => {
		if(projectId !== "") {
			await axios.delete(`https://trash.pr0con.io:1200/api/v1/projects/${projectId}`,{withCredentials: true}).then((res) => {
				setResp(res.data);
			}).catch((error) => {
				error.response.data.at = '@ Delete - Projects';
				setErrors(error.response.data);
			});					
		}
	}		
	
	return(
		<StyledGetDeleteProject>
			<ReactJson src={resp} collapsed={false} theme="apathy" />
			<input type="text" onChange={(e) => setProjectId(e.target.value.replace(/['"]+/g, ''))} value={projectId} placeholder="Enter Project Id."/>
			<div className="Projects-form-actions">
				<button onClick={(e) => doFetch()}>Fetch</button><button onClick={(e) => doDelete()}>Delete</button>
			</div>				
		</StyledGetDeleteProject>
	)	
}