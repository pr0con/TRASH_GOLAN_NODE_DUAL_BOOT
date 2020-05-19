import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import uniqid from 'uniqid';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { AppContext } from '../AppProvider.js';

const StyledAddUpdateProject = styled.div`
	padding: 1rem;
	form {
		.select-server {	
			margin-top: .5rem;	
		}	
		
		display: flex;
		flex-direction: column;	
		

		input:not(:first-child),
		input:not(input[type="submit"]) {
			margin-top: .5rem;
		}
		textarea {
			margin-top: .5rem;
		}
	}	
`;

export function AddUpdateProject() {
	const [ upid, setUpid ] = useState('');
	const [ selectedServer, setSelectedServer ] = useState('Select Server');
	
	const [ servers, setServers ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const { setErrors } = useContext(AppContext);	
	const { register, handleSubmit, watch, errors } = useForm();

	/* Styled Select Options */
	const CustomStyles = {
	  option: (base, state) => ({
	    ...base,
	    color: '#000',
	  })
	}
	
	const handleSelectChange = (selectedOption) => {
	   setSelectedServer(selectedOption.value); 
	}
	
		
	useEffect(() => {
		(async () => {
			try {
				const result = await axios.get('https://trash.pr0con.io:1200/api/v1/servers?select=id,name');
				console.log(result.data);
				let serverSelects = [];
				
				result.data.data.forEach((s) => {
					serverSelects.push({ value: s._id, label: s.name  });
				});
				
				setServers(serverSelects);				
			}catch(error) {
				error.response.data.at = '@ Fetch - Projects';
				setErrors(error.response.data);					
			}
			setIsLoading(false);
		})()
	},[]);	
	
		
	
	const onSubmit = data => { 
		if(selectedServer != "Select Server") {
			data['server'] = selectedServer;
			data['resource_links'] = data['resource_links'].split(',');
			let options = {
				headers: {
				    'Content-Type': 'application/json'
				},
				withCredentials: true	//To use cookie token
			};
			console.log(data);
			//axios.post('https://trash.pr0con.io:1200/api/v1/projects', data, options).then((res) => {     			
			axios.post(`https://trash.pr0con.io:1200/api/v1/servers/${selectedServer}/projects`, data, options).then((res) => {
				console.log(res);
			}, (error) => {
				error.response.data.at = '@ Create - Project';
				setErrors(error.response.data);
			});	
			
			setSelectedServer('Select Server');				
						
		}
	}
	
	const doUpdate = () => {
		if(upid !== "") {		
			let updateValues = {}
			let dvs = document.querySelectorAll('#add-project-form input[type="text"]');
			dvs.forEach((el) => {
				(el.value !== "") ? updateValues[el.name] = el.value : '';
			});	
			
			(selectedServer != "") ? updateValues['server'] = selectedServer : '';
			(document.querySelector('#add-project-form textarea[name="resource_links"]').value != "") ? updateValues['resource_links'] = document.querySelector('#add-project-form textarea[name="resource_links"]').value.split(',') : '';
						
			let options = {
				headers: {
				    'Content-Type': 'application/json'
				},
				withCredentials: true	//To use cookie token		
			};			
			axios.put(`https://trash.pr0con.io:1200/api/v1/projects/${upid}`, updateValues, options).then((res) => {
				console.log(res);
			}, (error) => {
				error.response.data.at = '@ Update - Project';
				setErrors(error.response.data);
			});				
						
		}
	}
	
	return(
		<StyledAddUpdateProject  id="add-project-form">
			{ isLoading === true && <>Loading...</> }
			{ (isLoading === false &&  servers.length > 0) &&
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="text" name="pid"  placeholder="Update Project Oid" onChange={(e) => setUpid(e.target.value.replace(/['"]+/g, ''))} value={upid}/>
					<Select options={servers} onChange={handleSelectChange} className="select-server" styles={CustomStyles}/>
					<input type="text" name="title" 	  placeholder="Project title" ref={register}/>	
					<input type="text" name="description" placeholder="Description"  ref={register}/>
					<textarea name="resource_links" placeholder="comma seperated list of urls" ref={register}/>	
					<div className="projects-form-actions">
						<input type="submit" /><button onClick={(e) => doUpdate()} type="button">Update</button>
					</div>						
				</form> 
			}			
		</StyledAddUpdateProject>
	)	
}






