import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';

//https://uppy.io/docs/react
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';

import Uppy from '@uppy/core';
import XHRUpload  from '@uppy/xhr-upload';
import { DragDrop } from '@uppy/react';

import { AppContext } from '../AppProvider.js';

const StyledAddUpdateServer = styled.div`
	position:relative;	
	padding: 2rem;
	
	form {
		display: flex;
		flex-direction: column;	
		
		input:not(:first-child),
		input:not(input[type="submit"]) {
			margin-top: .5rem;
		}
		
		#server-services-checkbox-group {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			margin-top: .5rem;
			
			label {
				display: flex;
				align-items: center;
				input{ margin-right: 1rem; }
			}
		}
	}
`;

export function AddUpdateServer() {
	const [ uoid, setUoid ] = useState('');
	const [ services, setServices ] = useState([]);
	const { register, handleSubmit, watch, errors } = useForm();
	const { setErrors } = useContext(AppContext);	
	
	const uppy = Uppy({
	  meta: { type: 'avatar' },
	  restrictions: { maxNumberOfFiles: 1 },
	  autoProceed: true
	})
	uppy.use(XHRUpload, {
	  endpoint: `https://trash.pr0con.io:1200/api/v1/servers/${uoid}/photo`,
	  fieldName: 'file'
	});	
	
	
	const handleServiceSelect = (e) => {
		e.persist();
		if(e.target.checked) {
			setServices((s) => [ ...services, e.target.name]);
		} else {
			const filteredItems = services.filter(item => item !== e.target.name);
			setServices(filteredItems);
		}
	}
	
	const onSubmit = data => { 
		data['services'] = services;
		
		let options = {
			headers: {
			    'Content-Type': 'application/json'
			},
			withCredentials: true		
		};
		console.log(data);
		axios.post('https://trash.pr0con.io:1200/api/v1/servers', data, options).then((res) => {
			console.log(res);
		}, (error) => {
			error.response.data.at = '@ Create - Server';
			setErrors(error.response.data);
		});	
	}
	
	const doUpdate = () => {
		if(uoid !== "") {
		
			let updateValues = {}
			let dvs = document.querySelectorAll('#add-server-form input[type="text"]');
			dvs.forEach((el) => {
				(el.value !== "") ? updateValues[el.name] = el.value : '';
			});	
			updateValues['services'] = services;
			
			let options = {
				headers: {
				    'Content-Type': 'application/json'
				},
				withCredentials: true		
			};			
			axios.put(`https://trash.pr0con.io:1200/api/v1/servers/${uoid}`, updateValues, options).then((res) => {
				console.log(res);
			}, (error) => {
				error.response.data.at = '@ Update - Server';
				setErrors(error.response.data);
			});	
		}
	}		
		
	return(
		<StyledAddUpdateServer id="add-server-form">
			<form onSubmit={handleSubmit(onSubmit)}>
				<input type="text" name="sid" placeholder="Update Server Oid" onChange={(e) => setUoid(e.target.value.replace(/['"]+/g, ''))} value={uoid}/>
				<DragDrop
			        uppy={uppy}
			        locale={{
			          strings: {
			            // Text to show on the droppable area.
			            // `%{browse}` is replaced with a link that opens the system file selection dialog.
			            dropHereOr: 'Drop here or %{browse}',
			            // Used as the label for the link that opens the system file selection dialog.
			            browse: 'browse'
			          }
			        }}
			     />
				<input type="text" name="name" 		  placeholder="Server Name" ref={register}/>	
				<input type="text" name="description" placeholder="Description"  ref={register}/>	
				<input type="text" name="website" 	  placeholder="Website"  ref={register}/>
				<input type="text" name="address"     placeholder="Address"  ref={register}/>			     					
				<div id="server-services-checkbox-group">
		        	<label><input type="checkbox" name="Go"     onChange={(e) => handleServiceSelect(e)} /><span> Go </span></label>
		        	<label><input type="checkbox" name="Node"   onChange={(e) => handleServiceSelect(e)} /><span> Node </span></label>
					<label><input type="checkbox" name="Python" onChange={(e) => handleServiceSelect(e)} /><span> Python </span></label>
					<label><input type="checkbox" name="Mongo"  onChange={(e) => handleServiceSelect(e)} /><span> Mongo </span></label>
					<label><input type="checkbox" name="MySql"  onChange={(e) => handleServiceSelect(e)} /><span> MySql </span></label>
					<label><input type="checkbox" name="Docker" onChange={(e) => handleServiceSelect(e)} /><span> Docker </span></label>
					<label><input type="checkbox" name="Nginx"  onChange={(e) => handleServiceSelect(e)} /><span> Nginx </span></label>				
				</div>
				<div className="servers-form-actions">
					<input type="submit" /><button onClick={(e) => doUpdate()} type="button">Update</button>
				</div>				
			</form>
		</StyledAddUpdateServer>
	)	
}