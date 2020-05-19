import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios  from 'axios';
import useInterval from './Hooks/useInterval.js';
import { AppContext } from './AppProvider.js';

const StyledDashboard = styled.div`	
	position:relative;
	top:0px;
	left:0px;
	width: 100%;
	height: 100%;
	background: #23234f;
	
	#splash {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		
		display: flex;
		flex-direction: column;
		
		#splash-header {
			display:flex;
			svg {
				width: 10rem;
				margin-right: 1rem;
			}
			
			#splash-text {
				display: flex;
				flex-direction: column;
				justify-content: center;
				
				#splash-text-line-one {
					font-size: 4rem;
					text-transform: uppercase;	
				}
				#splash-text-line-two {
					font-size: 2.4rem;
					background: linear-gradient(to right, #e66465, #9198e5);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;					
				}
			}
		}
		#splash-time {
			width: 100%;
			font-size: 3rem;
			text-align: center;
			margin-top: 1rem;
		}
		#splash-date-string {
			width: 100%;
			color: #9381d3;
			font-size: 1.4rem;
			text-align:center;
			margin-top: .5rem;			
		}	
	}
	
	#hidden-reset-form {
		position: absolute;
		bottom: 5rem;
		left: 50%;
		border: 1px solid #ccc;
		transform: translateX(-50%);
		
		display: flex;
		flex-direction: column;
		
		background: #000;
		padding: 1rem;
		
		#hidden-reset-form-wrapper {
			display: flex;
			#reset-form-submit {
				padding: .5rem;
				border: 1px solid #ccc;
				display: flex;
				align-items:center;
				text-align:center;
				&:hover{
					cursor:pointer;
				}
			}
		}		
	}
`;

export function Dashboard() {
	const [ curTime, setCurTime ] = useState('00:00:00');
	const [ dateString, setDateString ] = useState('');

	const [ rt, setRt ] = useState(null);
	const [ rp, setRp ] = useState('');	

	useInterval(() => {
		let today = new Date();
		let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		
		setCurTime(time);	
	}, 1000);	
	
	
	useEffect(() => {
		let d = new Date();
		let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		let day = days[ d.getDay() ];

		
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let month = months[d.getMonth()];
		
		setDateString(`${day}, ${month} ${d.getDate()}, ${d.getFullYear()}`);
	},[]);
	
	
	useEffect(() => {
		if(location.search.startsWith('?prt=')) {
			setRt(location.search.split('?prt=')[1])
		}
	},[]);
	
	
	const doReset = () => {
		if(rp != "") {
			let payload = {
				password: rp
			}
			
			let options = {
				headers: {
					'Content-Type': 'application/json'
				}
			}
		
			axios.put(`https://trash.pr0con.io:1200/api/v1/auth/reset/password/${rt}`, payload, options).then((res) => {
				console.log(res);
			}, (error) => {
				error.response.data.at = '@Dashboad.js - doReset';
				setErrors(error.response.data);
			});						
		}		
	}
	
	return(
		<StyledDashboard>
			<div id="splash">
				<div id="splash-header">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 265.59 316.46">
						<defs>  
						   <linearGradient id="gradient">  
						     <stop offset="0" stopColor="#e66465" stopOpacity="0.5" />  
						     <stop offset="1" stopColor="#e66465" stopOpacity="1" />  
						   </linearGradient>
						   
						   <mask id="gradient-mask">  
						     <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)"  />  
						   </mask>  
						</defs>
						
					
						<g id="Layer_2" data-name="Layer 2" mask="url(#gradient-mask)">
							<g id="Layer_1-2" data-name="Layer 1" fill="#f188c4">
								<path className="cls-1" d="M132.79,316.46a35.76,35.76,0,0,1-18.8-5.4l-95.2-58.95C7.2,244.92,0,231.55,0,217.19V99.27C0,84.92,7.2,71.54,18.79,64.36L114,5.41a35.37,35.37,0,0,1,37.6,0l95.2,59c11.6,7.18,18.8,20.56,18.8,34.91V217.19c0,14.35-7.2,27.73-18.8,34.91l-95.2,59A35.76,35.76,0,0,1,132.79,316.46Zm0-305.82a26.27,26.27,0,0,0-13.84,4l-95.2,59A30.23,30.23,0,0,0,9.92,99.27V217.19c0,10.57,5.3,20.42,13.83,25.7l95.2,59a26.49,26.49,0,0,0,27.68,0l95.2-59c8.54-5.29,13.84-15.14,13.84-25.7V99.27c0-10.56-5.3-20.41-13.84-25.7l-95.2-58.95A26.25,26.25,0,0,0,132.79,10.64Z"/>
								<path className="cls-1" d="M137.52,289.84l51.33-29.63A31.26,31.26,0,0,0,148,240.12c-5.21,1.92-5.21,1.92-6.52-3.46l-6.84-35.72a17.39,17.39,0,0,1-4.19.76,17.47,17.47,0,0,1-4.2-.76l-6.84,35.72c-1.31,5.38-1.31,5.38-6.52,3.46A31.26,31.26,0,0,0,72.19,259.8l52,30A13.51,13.51,0,0,0,137.52,289.84Z"/>
								<path className="cls-2" d="M147.71,158.17l.33-3c.4-4,2-16,2-17.77V137c0-48.28-19-74.54-19.16-74.8l-.77-.74-.6.76c-8.61,12.09-19.09,34.89-19.09,74.79v.4c0,1.87,1.37,14,1.56,16.57,0,.36.21,2.29.21,2.29l.12,1.69,0,0-8,6.27a2,2,0,0,0-.58,2.26l2.54,6.74,7.62,15.35.24-.07,0,.07v-.07l.39-.11-.45-1.67-.45-12.91c.27.06.51.15.77.21,1.74.43,3.58.76,5.47,1l2.23,5.94a22.4,22.4,0,0,0,15.91,0l2.23-5.94c1.7-.26,3.37-.55,4.95-.92.41-.09.79-.21,1.19-.32l-.31,11.47-.71,2.75,1,.9,7-15.54,2.57-6.83a2,2,0,0,0-.58-2.26l-7.62-6.17m-1.24.91h0l0,.05Z"/>
								<path className="cls-3" d="M130.35,116.59a9.79,9.79,0,1,1,9.78-9.78A9.8,9.8,0,0,1,130.35,116.59Zm0-16.07a6.29,6.29,0,1,0,6.29,6.29A6.29,6.29,0,0,0,130.35,100.52Z"/>
							</g>
						</g>
					</svg>
					<div id="splash-text">
						<div id="splash-text-line-one">Pr0con.io</div>
						<div id="splash-text-line-two">Advance</div>
					</div>					
				</div>
				<div id="splash-time">{ curTime }</div>
				<div id="splash-date-string">{ dateString }</div>
			</div>
			{ rt !== null &&
				<div id="hidden-reset-form">
					<div id="reset-token">{ rt }</div>
					<div id="hidden-reset-form-wrapper">
						<input type="text" placeholder="New Password" onChange={(e) => setRp(e.target.value)} value={rp} />
						<div id="reset-form-submit" onClick={(e) => doReset()}>Do Reset</div>
					</div>
				</div>
			}
		</StyledDashboard>
	)
}