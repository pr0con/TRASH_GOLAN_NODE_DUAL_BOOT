import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ReactJson from 'react-json-view';
import axios from 'axios';
import { AppContext } from '../AppProvider.js';

const StyledGetServers = styled.div`		
	position:relative;	
	padding: 2rem;
	
	display: flex;
	flex-direction: column;		
`;


/* 
	Advanced queries 
	https://trash.pr0con.io:1200/api/v1/servers?services[in]=MySql
	https://trash.pr0con.io:1200/api/v1/servers?services[in]=MySql&location.city=Lake Placid	
	https://trash.pr0con.io:1200/api/v1/servers?services[in]=MySql&location.city=Tupper Lake
	
	With Projection
	https://trash.pr0con.io:1200/api/v1/servers?select=name,description
	
	With Sort
	https://trash.pr0con.io:1200/api/v1/servers?select=name,description&sort=name
	https://trash.pr0con.io:1200/api/v1/servers?select=name,description&sort=-name
	
	Page Skip Limit - avail on backed can implement
	https://trash.pr0con.io:1200/api/v1/servers?select=name,description&sort=-name&limit=2
	https://trash.pr0con.io:1200/api/v1/servers?select=name,description&sort=-name&page=2&limit=2
*/


export function GetServers() {
	const [ zipcode, setZipcode ]  = useState('');
	const [ miles, setMiles ]  = useState('');
	
	const [ servers, setServers ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const {  setErrors } = useContext(AppContext);
	
	const requestServers = async () => {
		setIsLoading(true);
		try {
			const result = await axios.get('https://trash.pr0con.io:1200/api/v1/servers');
			console.log(result.data);
			setServers(result.data);
		}catch(error) {
			error.response.data.at = '@ Fetch - Servers';
			setErrors(error.response.data);				
		}
		setIsLoading(false);		
	}	

	const requestServerWithinRadius = async () => {
		if(zipcode != "" && miles != "") {
			await axios.get(`https://trash.pr0con.io:1200/api/v1/servers/radius/${zipcode}/${miles}`).then((res) => {
				setServers(res.data);
			}).catch((error) => {
				error.response.data.at = '@ Fetch - Servers within miles';
				setErrors(error.response.data);
			});	
		}			
	}

	useEffect(() => {
		requestServers();			
	},[]);
		
	return(
		<StyledGetServers>
			{ isLoading === true && <>Loading Data...</> }
			{ isLoading === false && 'data' in servers && servers.data.length > 0 &&
				<ReactJson src={servers} collapsed={true} theme="apathy" />  
			}
							
			<input type="text" name="zipcode" placeholder="zipcode" onChange={(e) => setZipcode(e.target.value)} value={zipcode}/>	
			<input type="text" name="miles"   placeholder="miles"   onChange={(e) => setMiles(e.target.value)} value={miles} />
								
			<div className="servers-form-actions">
				<button onClick={(e) => requestServers()} type="button">Get All Servers</button>
				<button onClick={(e) => requestServerWithinRadius()} type="button">Get Servers Within Specs</button>
			</div>										
		</StyledGetServers>	
	)	
}
