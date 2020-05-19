import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import axios from 'axios';
import { AppContext } from '../AppProvider.js';

const StyledGetDeleteServer = styled.div`
	position:relative;	
	padding: 2rem;
	
	display: flex;
	flex-direction: column;
`;

export function GetDeleteServer() {
	const [ resp, setResp ] = useState({});
	const [ serverId, setServerId ] = useState('');
	const {  setErrors } = useContext(AppContext);	

	const doFetch = async () => {
		if(serverId !== "") {
			await axios.get(`https://trash.pr0con.io:1200/api/v1/servers/${serverId}`).then((res) => {
				setResp(res.data);
			}).catch((error) => {
				error.response.data.at = '@ Fetch - Single Server';
				setErrors(error.response.data);
			});			
		}
	}	

	
	const doDelete = async () => {
		if(serverId !== "") {
			await axios.delete(`https://trash.pr0con.io:1200/api/v1/servers/${serverId}`,{withCredentials: true}).then((res) => {
				setResp(res.data);
			}).catch((error) => {
				error.response.data.at = '@ Delete - Servers';
				setErrors(error.response.data);
			});					
		}
	}		
	
	
	return(
		<StyledGetDeleteServer>
			<ReactJson src={resp} collapsed={false} theme="apathy" />
			<input type="text" onChange={(e) => setServerId(e.target.value.replace(/['"]+/g, ''))} value={serverId} placeholder="Enter Server Id."/>
			<div className="servers-form-actions">
				<button onClick={(e) => doFetch()}>Fetch</button><button onClick={(e) => doDelete()}>Delete</button>
			</div>				
		</StyledGetDeleteServer>
	)	
}

