import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {navigate, usePath} from 'hookrouter';
import { AppContext } from './AppProvider.js';

const StyledLogin = styled.div`
	position:relative;
	top:0px;
	left:0px;
	width: 100%;
	height: 100%;
	background:  #000000;	
	
	pre {
		font-size: 1.4rem;
	}
	
	#center-login-register-containers {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		display: flex;
		
		#login-panel-blue  {
			position: relative;
			min-width: 32rem;
			min-height: 50rem;
			background: #1f252f;
			
			display: flex;
			flex-direction: column;
			
			padding: 2rem;
			margin-right: 1rem;
			
			
			svg.login-panel-blue-close {
				position: absolute;
				top: .5rem;
				right: 1rem;
				color: #fcfffc;
				width: 1.2rem;
			}
						
			#login-panel-blue-header-wrapper {
				display: flex;
				justify-content: center;
				margin: 0 0 2rem 0;
				
				svg.login-panel-blue-header{
					height: 6rem;
					color: #44aece;
				}			
			}
			
			#login-panel-blue-form {
				margin: 1rem 0 1rem 0;
				.login-panel-blue-form-field-wrapper {
					border-bottom: 1px solid #bec2c8;
					width: 100%;
					padding: 1rem;
					
					display: flex;
					flex-direction: row;
					align-items: center;
					
					svg {
						width: 3rem;
						height: 3rem;
						margin-right: 1rem;
					}				
					input {
						height: 3rem;
						width: 100%;
						background: transparent;
						color: #fff;
						border: 0px;
						font-size: 2rem;
					}					
																
				}
				#login-panel-blue-login-button,
				#login-panel-blue-sign-in-button {
					with: 100%;
					height: 4rem;
					background: #42aecf;
					color: #00405b;
					display: flex;
					align-items: center;
					justify-content:center;
					margin: 2rem 0 1rem 0;
					font-size: 1.6rem;
				}
				#login-panel-blue-register-button {
					margin-top: 1rem;
					width: 100%;
					border: 1px solid #d8dce5;
					height: 4rem;
					display: flex;
					align-items: center;
					justify-content:center;	
					font-size: 1.6rem;				
				}				
				#login-panel-blue-login-button:hover,
				#login-panel-blue-sign-in-button:hover,
				#login-panel-blue-register-button:hover {
					cursor:pointer;
				}				
				
			}
			
			#login-panel-blue-social-login-with	{
				width: 100%;
				margin: 2rem 0 1rem 0;
				text-align:center;
				font-size: 1.4rem;	
			}
			
			#login-panel-blue-social-icons {
				display: flex;
				justify-content: space-around;
				
				.login-panel-blue-social-icon-wrapper {
					width: 5rem;
					height: 5rem;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 1.5px solid #44aece;
					border-radius: 50%;
					
					svg.login-panel-blue-social-icon {					
						height: 3.5rem;
						color: #44aece;
					}
					transition: all .2s;
					
					&:hover{
						background: #44aece;
						cursor: pointer;
					}
					&:hover svg {
						color: #1f252f;
					}																				
				}								
			}					
		}
		#login-panel-orange {
			position: relative;	
			background: #04181e;
			min-width: 32rem;
			min-height: 50rem;
			
			display: flex;
			flex-direction: column;
			
			padding: 2rem;
			
			svg.login-panel-orange-close {
				position: absolute;
				top: .5rem;
				right: 1rem;
				color: #fcfffc;
				width: 1.2rem;
			}
			
			svg {
				color: #ff8300;
			}			
			#login-panel-orange-header {
				width: 100%;
				display: flex;
				justify-content: center;
				
				svg{
					width: 10rem;
					height: 10rem;	
				}
				
				margin: 1rem 0 2rem 0;
			}
			.login-panel-orange-form-field-wrapper {
				width: 100%;
				display: flex;
				
				svg {
					width: 3rem;
					height: 3rem;
					margin-right: .5rem;
				}
				input {
					background: transparent;
					border: 0px;
					border-bottom: 1px solid #ff8300;
					color: #fff;
					font-size: 1.8rem;
				}
				
				margin: 0 0 2.5rem 0;
			}
			#login-panel-orange-forgot-password-links {
				width: 100%;
				margin: 1rem 0 3rem 0;
				font-size: 1.6rem;
				text-align:center;				
			}
			#login-panel-orange-Login-button {
				width: 100%;
				height: 4rem;
				background: #ff8300;
				color: #fff;
				display:flex;
				align-items:center;
				text-align:center;
				justify-content:center;
				font-size: 1.6rem;
			}
			#login-panel-orange-signup-link {
				margin-top: 4rem; 
				widht: 100%;
				text-align:center;
				font-size: 1.6rem;
			}
			#login-panel-orange-forgot-password-links:hover,
			#login-panel-orange-Login-button:hover,
			#login-panel-orange-signup-link:hover {
				cursor:pointer;
			}												
		}
		
		
		
		#register-panel-orange {
			position: relative;
			background: #04181e;
			min-width: 32rem;
			min-height: 50rem;
			
			
			display: flex;
			flex-direction: column;
			
			padding: 2rem;	
			
			svg.register-panel-orange-close {
				position: absolute;
				top: .5rem;
				right: 1rem;
				color: #fcfffc;
				width: 1.2rem;
			}			
			input[type="text"] {
				border: 1px solid #ff8300;
				background: transparent;
				height: 3rem;
				margin-bottom: 1rem;
				color: #fff;
				text-indent: 1rem;
			}
			#register-panel-orange-header {
				display: flex;
				svg {
					width: 5rem;
					height: 5rem;
					margin-right: 2rem;
					color: #ff8300;
				}
				font-size: 2rem;
				margin-bottom: 2rem;
			}
			#register-panel-orange-fn-ln-wrapper {
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-gap: 2rem;
			}			
			#register-panel-orange-accept-cb-wrapper {
				display: flex;
				align-items: center;
				
				#register-panel-orange-accept-cb {
					width: 2rem;
					height: 2rem;
					border: 2px solid #ff8300;
					border-radius: .5rem;
					
					&:hover {
						cursor:pointer;
					}
					
					display: flex;
					align-items: center;
					justify-content: center;					

					margin-right: 1rem;
					transition: all .2s;					
					
					svg { width: 0px; height: 0px; color: transparent; }
				}
				#register-panel-orange-accept-cb.true {
					background: #ff8300;
					svg { width: auto; height: 2rem; color: #fff; }
				}									
			}
			#register-panel-orange-signup-button-wrapper {
				width: 100%;
				display: flex;
				justify-content: center;
				#register-panel-orange-signup-button {
					width: 22rem;
					text-align:center;
					display:flex;
					align-items: center;
					justify-content: center;
					height: 4rem;
					color: #fff;
					background: #ff8300;
					border: 1px solid #fff;
					border-radius: 1rem;
					margin-top: 4rem;
					&:hover{ cursor:pointer; }
				}					
			}
			#register-panel-orange-login-link {
				width: 100%;
				text-align:center;
				font-size: 1.6rem;
				margin-top: 3rem;
				&:hover{ cursor:pointer; }
			}			
								
		}
	}
	
	#reset-password {
		position: absolute;
		bottom: 5rem;
		left: 50%;
		border: 1px solid #ccc;
		padding: 1rem;
		transform:translateX(-50%);
		display:flex;
		
		#reset-password-submit {
			padding: .5rem;
			border: 1px solid #ccc;
			display: flex;
			align-items:center;
			text-align:center;
			&:hover {
				cursor:pointer;
			}
		}
	}	
`;

export function Login() {
	const path = usePath();
	const { setErrors, setUser, setJwt, setPma } = useContext(AppContext);
	
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');	
	
	const [ svgHover, setSvgHover ] = useState('');
	const [ regAccept, setRegAccept ] = useState(false);

	const [ aliasOrEmail, setAliasOrEmail ] = useState('');//holds alias or email for reset
	

	const doLogin = () => {
		if(username != "" && password != "") {
			let payload = {
				username,
				password,
			}
			
			let options = {
				headers: {
				    'Content-Type': 'application/json'
				},
				withCredentials: true //Need this to store cookie...
			};
			axios.post('https://trash.pr0con.io:1200/api/v1/auth/login', payload, options).then((res) => {
				('user' in res.data) ? setUser(res.data.user) : '';
				('token' in res.data) ? setJwt(res.data.token) : '';
			}, (error) => {
				error.response.data.at = '@ Login.js - doLogin';
				setErrors(error.response.data);
			});												
		}else {
			setErrors({
				type: '@Interface',
				where: 'doLogin',
				msg: 'Provide both a username and password.'
			})		
		}
	}
	
	const doRegister = () => {
		if(username != "" && password != "" && email != "") {
			let payload = {
				username,
				password,
				email
			}
	
			let options = {
				headers: {
				    'Content-Type': 'application/json'
				},
				withCredentials: true //Need this to store cookie...		
			};
			
			axios.post('https://trash.pr0con.io:1200/api/v1/auth/register', payload, options).then((res) => {
				('user' in res.data) ? setUser(res.data.user) : '';
				('token' in res.data) ? setJwt(res.data.token) : '';			
			}, (error) => {
				error.response.data.at = '@Login.js - doRegister';
				setErrors(error.response.data);
			});
		} else {
			setErrors({ message: 'All fields required.' });
		}						
	}

	const doReset = () => {
		if(aliasOrEmail != "") {
			let payload =  {
				username: aliasOrEmail
			}	
			
			let options = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
		
			axios.post('https://trash.pr0con.io:1200/api/v1/auth/recover/password', payload, options).then((res) => {
				console.log(res);
			}, (error) => {
				error.response.data.at = '@ Login - doReset';
				setErrors(error.response.data);
			});					
			
		}
	}

	return(
		<StyledLogin>
          <pre>{`	          
	Pro Designer Tips.	          
	          
 1) Make the social icons significantly smaller
 2) On orange sign up button, choose border or fill but never do both border and fill together
 3) Username and password icons can be a smidge smaller
 4) center all content so equal space from edge of top and edge of bottom background rectangle
 		
 		Emilee Hazelden.
          
          `}</pre>	
		    <div id="center-login-register-containers">
				<div id="login-panel-blue">	
					<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="login-panel-blue-close svg-inline--fa fa-times fa-w-10 fa-2x"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>
					<div id="login-panel-blue-header-wrapper">
						<svg  aria-hidden="true" focusable="false" data-prefix="fal" data-icon="paw-claws" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="login-panel-blue-header svg-inline--fa fa-paw-claws fa-w-16 fa-3x"><path fill="currentColor" d="M318.55 222.61c40.16 10.56 69.55-34.86 77.46-63.87 8.44-30.94 3.01-61.05-12.01-78.75L320 0v74.96c-15.94 11.26-29.49 30.37-36.02 54.29-11.84 43.42 3.64 85.22 34.57 93.36zm-3.7-84.93c18.22-66.79 66.59-47.08 50.29 12.65-18.19 66.71-66.59 47.12-50.29-12.65zm178.65 52.69L448 128v66.94c-19.83 6.55-37.51 24.43-44.72 48.46-10.4 34.65 4.77 68.38 33.89 75.34 30.46 7.29 61.64-17.11 71.55-50.13 8.85-29.51-1.55-59.5-15.22-78.24zm-15.43 69.03c-12.72 42.35-56.89 35.65-44.15-6.81 12.69-42.26 56.91-35.72 44.15 6.81zM256 256c-79.41 0-191.99 122.76-191.99 200.25 0 34.91 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.84 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C447.99 378.76 335.41 256 256 256zm120.26 224c-20.3 0-37.81-5.77-56.34-11.88-19.68-6.49-40.02-13.19-63.91-13.19-23.65 0-43.85 6.67-63.39 13.12-18.64 6.15-36.25 11.96-56.87 11.96-39.74 0-39.74-17.88-39.74-23.75C96.01 393.35 196.19 288 256 288s159.99 105.35 159.99 168.25c0 5.87 0 23.75-39.73 23.75zM108.73 243.39c-7.21-24.03-24.89-41.91-44.72-48.46V128L18.5 190.37C4.81 209.13-5.57 239.11 3.29 268.61c10 33.3 41.36 57.35 71.55 50.13 29.11-6.97 44.29-40.7 33.89-75.35zM33.94 259.4c-12.84-42.77 31.51-48.87 44.15-6.81 12.8 42.69-31.5 48.95-44.15 6.81zm159.51-36.79c30.94-8.14 46.42-49.94 34.58-93.36-6.53-23.92-20.07-43.04-36.02-54.29V0L128 79.99c-15.02 17.7-20.45 47.82-12.01 78.75 7.65 28.05 37.08 74.5 77.46 63.87zm3.7-84.93c16.2 59.39-32 79.74-50.3 12.65-16.19-59.39 32-79.75 50.3-12.65z" className=""></path></svg>
					</div>
					<div id="login-panel-blue-form">
						<div className="login-panel-blue-form-field-wrapper">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-alien" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-user-alien fa-w-14 fa-2x"><path fill="currentColor" d="M252,288h40a60.00047,60.00047,0,0,0,60-60V204a12.0006,12.0006,0,0,0-12-12H300a60.00047,60.00047,0,0,0-60,60v24A12.0006,12.0006,0,0,0,252,288Zm20-36a28.03146,28.03146,0,0,1,28-28h20v4a28.03146,28.03146,0,0,1-28,28H272Zm-76,36a12.0006,12.0006,0,0,0,12-12V252a60.00047,60.00047,0,0,0-60-60H108a12.0006,12.0006,0,0,0-12,12v24a60.00047,60.00047,0,0,0,60,60Zm-68-60v-4h20a28.03146,28.03146,0,0,1,28,28v4H156A28.03146,28.03146,0,0,1,128,228ZM352,352h-8.81445c39.14843-43.77734,72.8789-96.6582,72.8789-149.36719C416.06445,76.73633,330.05273,0,224,0,117.918,0,31.93555,76.73633,31.93555,202.63281c0,52.709,33.73047,105.58985,72.8789,149.36719H96A95.99975,95.99975,0,0,0,0,448v16a47.99987,47.99987,0,0,0,48,48H400a47.99987,47.99987,0,0,0,48-48V448A95.99975,95.99975,0,0,0,352,352ZM63.93555,202.63281C63.93555,100.57227,128.25977,32,224,32s160.06445,68.57227,160.06445,170.63281c0,87.58789-121.332,185.05664-158.51953,212.84571a2.5483,2.5483,0,0,1-3.0918-.002C185.26758,387.68945,63.93555,290.2207,63.93555,202.63281ZM416,464a16.01833,16.01833,0,0,1-16,16H48a16.01833,16.01833,0,0,1-16-16V448a64.07333,64.07333,0,0,1,64-64h39.79883a744.84828,744.84828,0,0,0,67.5,57.11133,34.54892,34.54892,0,0,0,41.40234,0A744.84828,744.84828,0,0,0,312.20117,384H352a64.07333,64.07333,0,0,1,64,64Z"></path></svg>							
							<input type="text" className="login-panel-blue-form-field-input" onChange={(e) => setUsername(e.target.value)} placeholder="Username" value={username}/>
						</div>
						<div className="login-panel-blue-form-field-wrapper">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="key-skeleton" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-key-skeleton fa-w-16 fa-2x"><path fill="currentColor" d="M329.37 137.37c-12.49 12.5-12.49 32.76 0 45.26 12.5 12.5 32.76 12.5 45.26 0 12.49-12.5 12.49-32.76 0-45.26-12.5-12.49-32.76-12.49-45.26 0zm64-64c-12.49 12.5-12.49 32.76 0 45.26 12.5 12.5 32.76 12.5 45.26 0s12.5-32.76 0-45.26c-12.5-12.49-32.76-12.49-45.26 0zM448 0H320c-35.35 0-64 28.65-64 64v128c0 11.85 3.44 22.8 9.05 32.32L2.34 487.03c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c3.12 3.12 8.19 3.12 11.31 0l48.7-48.7 46.4 46.4c6.16 6.16 16.2 6.22 22.43 0l44.86-44.86c6.19-6.19 6.19-16.23 0-22.43l-46.4-46.4 28.71-28.72 46.4 46.4c6.16 6.16 16.2 6.22 22.43 0l44.86-44.86c6.19-6.19 6.19-16.23 0-22.43l-46.4-46.4 50.72-50.72c9.52 5.61 20.47 9.05 32.32 9.05h128c35.35 0 64-28.65 64-64V64C512 28.65 483.35 0 448 0zM153.71 451.28l-22.43 22.43-35.18-35.18 22.43-22.43 35.18 35.18zm96-96l-22.43 22.43-35.19-35.19 22.43-22.43 35.19 35.19zM480 192c0 17.64-14.36 32-32 32H320c-17.64 0-32-14.36-32-32V64c0-17.64 14.36-32 32-32h128c17.64 0 32 14.36 32 32v128z"></path></svg>
							<input type="password" className="login-panel-blue-form-field-input" onChange={(e) => setPassword(e.target.value)} placeholder="Password" value={password}/>
						</div>
						
						{ path === '/login' &&
							<div id="login-panel-blue-login-button" onClick={(e) => doLogin()}>Login</div>
						}					
						{ path === '/signup' &&
							<>
								<div className="login-panel-blue-form-field-wrapper">
									<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-envelope fa-w-16 fa-2x"><path fill="currentColor" d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z"></path></svg>
									<input type="email" className="login-panel-blue-form-field-input" onChange={(e) => setEmail(e.target.value)} placeholder="Email" value={email}/>
								</div>
								<div id="login-panel-blue-sign-in-button" onClick={(e) => {navigate('/login'); setPma('Logging In'); }}>Sign In</div>
								<div id="login-panel-blue-register-button" onClick={(e) => doRegister()}>Register</div>	
							</>
						}																		
					</div>
					<div id="login-panel-blue-social-login-with">login with {svgHover}</div>
					<div id="login-panel-blue-social-icons">
						<div className="login-panel-blue-social-icon-wrapper" onMouseOver={(e) => setSvgHover('facebook')} onMouseOut={(e) => setSvgHover('')}><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="login-panel-blue-social-icon svg-inline--fa fa-facebook-f fa-w-10 fa-2x"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" className=""></path></svg></div>
						<div className="login-panel-blue-social-icon-wrapper" onMouseOver={(e) => setSvgHover('google')} onMouseOut={(e) => setSvgHover('')}><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="login-panel-blue-social-icon svg-inline--fa fa-google fa-w-16 fa-2x"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" className=""></path></svg></div>
						<div className="login-panel-blue-social-icon-wrapper" onMouseOver={(e) => setSvgHover('twitter')} onMouseOut={(e) => setSvgHover('')}><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="login-panel-blue-social-icon svg-inline--fa fa-twitter fa-w-16 fa-2x"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" className=""></path></svg></div>						
					</div>					
          		</div>
			  	{ path === '/login' &&
					<div id="login-panel-orange">
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="login-panel-orange-close svg-inline--fa fa-times fa-w-10 fa-2x"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>						
						<div id="login-panel-orange-header">
							<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="react" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="login-orange-header-svg svg-inline--fa fa-react fa-w-16 fa-3x"><path fill="currentColor" d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z" ></path></svg>				
						</div>

						<div className="login-panel-orange-form-field-wrapper">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-secret" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-user-secret fa-w-14 fa-2x"><path fill="currentColor" d="M383.9 308.3l23.9-62.6c4-10.5-3.7-21.7-15-21.7h-43.2c1.5-7.8 2.4-15.8 2.4-24 0-7.2-.9-14.2-2.2-21.1 40.5-9.8 66.2-24.2 66.2-40.2 0-16.5-27-31.2-69.3-41-8.9-33.6-27.4-67.9-41.3-85.4-6.3-8-15.7-12.3-25.3-12.3-9.5 0-12.3 2.4-41.8 17.2-12.8 6.4-24.3 2.1-28.6 0C179.9 2.3 177.3 0 167.9 0c-9.6 0-18.9 4.3-25.2 12.2-13.9 17.5-32.4 51.8-41.3 85.4C59 107.4 32 122.2 32 138.7c0 16.1 25.7 30.5 66.2 40.2-1.3 6.9-2.2 13.9-2.2 21.1 0 8.2.9 16.2 2.4 24H56.3c-11.5 0-19.2 11.7-14.7 22.3l25.8 60.2C27.3 329.8 0 372.7 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-48.4-25.8-90.4-64.1-114.1zM128 200c0-2.7.3-5.3.6-7.9 1.3.8 5.1 3.3 5.8 5.4 3.9 11.9 7 24.6 16.5 33.4 8 7.4 47 25.1 64-25 2.8-8.4 15.4-8.4 18.3 0 16 47.4 53.9 34.4 64 25 9.5-8.8 12.7-21.5 16.5-33.4.7-2.1 4.4-4.6 5.8-5.4.3 2.6.6 5.2.6 7.9 0 52.9-43.1 96-96 96S128 252.9 128 200zm-.7-75.5c.7-2.7 12.3-57 40.5-92.5 28.7 14.4 37.7 20.5 56.2 20.5 18.6 0 27.7-6.3 56.2-20.5l.1.1c28.1 35.4 39.7 89.6 40.4 92.4 21.4 4.9 35.8 7.9 51 14.2-24.3 9.9-75.4 21.3-147.7 21.3s-123.4-11.4-147.7-21.3c15.2-6.3 29.9-9.3 51-14.2zM44.8 480c-7.1 0-12.8-5.7-12.8-12.8v-44.8c0-36.5 19.2-69.5 51.4-88.2L108 320l-27.4-64h28.9c4.7 9.6 64.3 108.5 64.3 108.5L142.9 480H44.8zm131.2 0l32-120-21.9-38.4c12.1 3.8 24.6 6.4 37.9 6.4s25.9-2.6 37.9-6.4L240 360l32 120h-96zm240-12.8c0 7.1-5.7 12.8-12.8 12.8h-98.1l-30.8-115.5s59.6-98.9 64.3-108.5h31l-25 65.6 22.5 13.9c30.6 18.9 48.9 51.4 48.9 86.9v44.8z" ></path></svg>				
							<input type="text" placeholder="Username"/>
						</div>
						<div className="login-panel-orange-form-field-wrapper">
							<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="lock-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-lock-alt fa-w-14 fa-2x"><path fill="currentColor" d="M224 420c-11 0-20-9-20-20v-64c0-11 9-20 20-20s20 9 20 20v64c0 11-9 20-20 20zm224-148v192c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48h16v-64C64 71.6 136-.3 224.5 0 312.9.3 384 73.1 384 161.5V224h16c26.5 0 48 21.5 48 48zM96 224h256v-64c0-70.6-57.4-128-128-128S96 89.4 96 160v64zm320 240V272c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16z" ></path></svg>
							<input type="text" placeholder="Password"/>
						</div>
						<div id="login-panel-orange-forgot-password-links">Forgot Password?</div>
						<div id="login-panel-orange-Login-button">Login</div>
						<div id="login-panel-orange-signup-link" onClick={(e) => { navigate('/signup'); setPma('Signing Up'); }}>Sign Up</div>												
					</div>
				}
				{ path === '/signup' &&
					<div id="register-panel-orange">
						<svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="register-panel-orange-close svg-inline--fa fa-times fa-w-10 fa-2x"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>
						<div id="register-panel-orange-header">
							<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="react" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="register-orange-header-svg svg-inline--fa fa-react fa-w-16 fa-3x"><path fill="currentColor" d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z" ></path></svg>					
							<span>Registration form</span>
						</div>
						<div id="register-panel-orange-fn-ln-wrapper">
							<input type="text" placeholder="First Name"/>
							<input type="text" placeholder="Last Name"/>
						</div>
						
						<input type="text" placeholder="Alias"/>
						<input type="text" placeholder="Email"/>
						<input type="text" placeholder="Password"/>						
						
						<div id="register-panel-orange-accept-cb-wrapper">
							<div id="register-panel-orange-accept-cb" className={regAccept ? 'true' : 'false'} onClick={(e) => setRegAccept(!regAccept)}>
								<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-check fa-w-16 fa-2x"><path fill="currentColor" d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>		
							</div>
							<span>I Accept the Terms and Conditions</span>							
						</div>	
						<div id="register-panel-orange-signup-button-wrapper"><div id="register-panel-orange-signup-button">Sign Up</div></div>
						<div id="register-panel-orange-login-link" onClick={(e) => navigate('/login')}>Log In</div>											
					</div>	
				}	
			</div>
			
			<div id="reset-password">
				<input type="text" placeholder="alias or email" onChange={(e) => setAliasOrEmail(e.target.value)} />
				<div id="reset-password-submit" onClick={(e) => doReset()}>Recover</div>
			</div>
		</StyledLogin>
	)	
}




