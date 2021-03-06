import star from '../star.png'
import { useState,useEffect } from 'react';
import '../style/App.css';

import CardEle from './cardForNew'
import CardA from './cardForActiveJobs'
import CardC from './cardForComp'
export default function DashBoard(props){
  // const [flag,setFlag]= useState(false)
  const [flag,setFlag]= useState(false)
  const [jobs,setJobs]= useState([]);

  useEffect(()=>{getJobs()},[flag]);
  const changebychild=()=>{
    setFlag(!flag)
  }
    const getJobs=()=>{
          fetch('https://techwreckback.herokuapp.com/partnerJobs', { credentials: "include"})
        .then(r => {
          if(r.ok) {
            return r.json();
          } else {
            setJobs([]);     
            return { success: false };
          }
        }).then(r => {
          if(r.success !== false) {
          
            setJobs(r)
           // console.log(jobs)
          }else{
            console.log(r.error)
          }
        });
        //props.fun();
      }
    return (
      <div className="ptani" style={{display:"flex",flexWrap:"wrap-reverse"}}>
     
    <div className="dashBoard">
   
    <h4>New Jobs</h4>
    <p>Your new Jobs will come here.</p>
    {jobs.filter((job)=>job.FullStatus==='Not Started').map((job,key)=>{return <CardEle job={job} key={key} fun={changebychild}/>})}
    <h4>Active Jobs</h4>
    <p>Your Active Jobs will come here.</p>
    {jobs.filter((job)=>job.FullStatus==='Started').map((job,key)=>{return <CardA job={job} key={key} fun={changebychild}/>})}
    <h4>Completed  Jobs</h4>
    <p>Your completed Jobs will come here.</p>
    {jobs.filter((job)=>job.FullStatus==='Resolved').map((job,key)=>{return <CardC job={job} key={key} fun={changebychild}/>})}
    </div>
    <div className="ratings-box"><h4>Ratings</h4><br></br><h2>{props.ratings}/10</h2><img alt="ratings" width="100px" height="100px" src={star}/>

    </div>
    {/* <CardEle job={jobs[0]}/>
      <CardEle job={jobs[0]}/> */}
      </div> 
      );
}