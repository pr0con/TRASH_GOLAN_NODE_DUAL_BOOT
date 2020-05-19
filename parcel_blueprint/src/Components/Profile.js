import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactJson from 'react-json-view';
import { AppContext } from './AppProvider.js';

const StyledProfile = styled.div`
	position:relative;
	top:0px;
	left:0px;
	width: 100%;
	height: 100%;
	background: #23234f;	
	padding: 1rem;
	
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto;
	
	#update-profile-info-form,
	#update-profile-password-form,
	#get-delete-user-form,
	#create-update-user-form {
		display: flex;
		
		#update-profile-info-form-submit,
		#update-profile-info-form-submit,
		#get-user-submit-button,
		#delete-user-submit-button,
		#create-user-submit-button,
		#update-user-submit-button {
			padding: .5rem;
			display: flex;
			text-align:center;
			justify-content:center;
			&:hover{
				cursor:pointer;
			}
		}
	}
`;

export function Profile() {
	const [ users, setUsers ] = useState([]);
	
	/* update info */
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	
	/* update password */
	const [ currentPassword, setCurrentPassword ] = useState(''); 
	const [ newPassword, setNewPassword ] = useState('');
	
	const [ viewUser, setViewUser] = useState({});	
	const [ userObj, setUserObj ] = useState('');
		
	const [ newUserUsername, setNewUserUsername ]  = useState('');	
	const [ newUserEmail, setNewUserEmail ]  = useState('');	
	const [ newUserPassword, setNewUserPassword ]  = useState('');			
		
	const { user, setErrors } = useContext(AppContext);

	useEffect(() => {
		if(user !== null && user.role === 'admin') {
			let options = {
				withCredentials: true		
			};			
			axios.get(`https://trash.pr0con.io:1200/api/v1/users/`, options).then((res) => {
				setUsers(res.data.data);
			}, (error) => {
				error.response.data.at = ' @ Profile - useEffect - getUsers ';
				setErrors(error.response.data);
			});				
		}
	},[]);
	
	useEffect(() => {
		if(user !== null) {
			setUsername(user.username);
			setEmail(user.email);
		}
	},[]);
				
	const doProfileUpdate = () => {
		if(username != "" && email != "") {
			let options = {
				headers: {
				    'Content-Type': 'application/json'
				},
				withCredentials: true		
			};			
			axios.put(`https://trash.pr0con.io:1200/api/v1/users/profile/update/`, { username, email }, options).then((res) => {
				console.log(res);
			}, (error) => {
				error.response.data.at = '@ Profile - doProfileUpdate';
				setErrors(error.response.data);
			});	
		}		
	}
	
	const doPasswordUpdate = () => {
		if(currentPassword != "" && newPassword != "") {
			let options = {
				headers: {
				    'Content-Type': 'application/json'
				},
				withCredentials: true		
			};			
			axios.put(`https://trash.pr0con.io:1200/api/v1/users/profile/update/password`, { currentPassword, newPassword }, options).then((res) => {
				console.log(res);
			}, (error) => {
				error.response.data.at = '@ Profile - doPasswordUpdate';
				setErrors(error.response.data);
			});				
		}
	}	
	
	const doGetUser = () => {
		if(userObj != "") {
			let options = {
				withCredentials: true		
			};			
			axios.get(`https://trash.pr0con.io:1200/api/v1/users/${userObj}`, options).then((res) => {
				setViewUser(res.data.user);
			}, (error) => {
				error.response.data.at = '@ Profile - doGetUser';
				setErrors(error.response.data);
			});				
		}
	}
	
	const doDeleteUser = () => {
		if(userObj != "") {
			let options = {
				withCredentials: true		
			};			
			axios.delete(`https://trash.pr0con.io:1200/api/v1/users/${userObj}`, options).then((res) => {
				console.log(res);
			}, (error) => {
				error.response.data.at = '@ Profile - doDeleteUser';
				setErrors(error.response.data);
			});				
		}
	}		
	
	const doCreateUser = () => {
		if(newUserUsername != "" && newUserEmail != "" && newUserPassword != "") {
			let options = {
				withCredentials: true		
			};			
			axios.post(`https://trash.pr0con.io:1200/api/v1/users/`, { username: newUserUsername, email: newUserEmail, password: newUserPassword }, options).then((res) => {
				console.log(res);
			}, (error) => {
				error.response.data.at = '@ Profile - doCreateUser';
				setErrors(error.response.data);
			});				
		}		
	}
	
	const doUpdateUser = () => {
		if(newUserUsername != "" || newUserEmail != "" || newUserPassword != "") {
			let options = {
				withCredentials: true		
			};			
			axios.put(`https://trash.pr0con.io:1200/api/v1/users/${userObj}`, { username: newUserUsername, email: newUserEmail, password: newUserPassword }, options).then((res) => {
				console.log(res);
			}, (error) => {
				error.response.data.at = '@ Profile - doCreateUser';
				setErrors(error.response.data);
			});					
		}
	}			
	
	return(
		<StyledProfile>
			<ReactJson src={users} collapsed={true} theme="apathy" />
			<div>
				<div id="update-profile-info-form">
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
					<input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
					<div id="update-profile-info-form-submit" onClick={(e) => doProfileUpdate()}>Submit</div>
				</div>
				<div id="update-profile-password-form">
					<input type="text" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" />
					<input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
					<div id="update-profile-info-form-submit" onClick={(e) => doPasswordUpdate()}>Submit</div>			
				</div>							
			</div>
			{ (user !== null && user.role === 'admin') &&
				<div>
					<ReactJson src={viewUser} collapsed={true} theme="apathy" />
					<div id="get-delete-user-form">
						<input type="text" value={userObj} onChange={(e) => setUserObj(e.target.value.replace(/['"]+/g, ''))} placeholder="User Object Id" />
						<div id="get-user-submit-button" onClick={(e) => doGetUser()}>Get</div>
						<div id="delete-user-submit-button" onClick={(e) => doDeleteUser()}>Delete</div>
					</div>
					<div id="create-update-user-form">
						<input type="text" value={newUserUsername} onChange={(e) => setNewUserUsername(e.target.value)} placeholder="New User Username" />
						<input type="text" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} placeholder="New User Email" />
						<input type="text" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} placeholder="New User Password" />
						<div id="create-user-submit-button" onClick={(e) => doCreateUser()}>Create</div>
						<div id="update-user-submit-button" onClick={(e) => doUpdateUser()}>Update</div>			
					</div>										
				</div>	
			}
		</StyledProfile>	
	)
}




