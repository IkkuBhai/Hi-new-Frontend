import React, { useEffect, useState } from 'react';
 import '../styles/userProfile.css';
import { Routes, Link, Route, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import { Box, Button, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import avatar from "../images/avatar.jpg";
import {FiEdit2} from "react-icons/fi";
import Multiselect from "multiselect-react-dropdown";
import { primarySkills,secondarySkills } from '../constraints/arrays';
const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        background: 'linear-gradient(45deg, #63A4FF 30%, #83EAF1 90%)',
        border: 0,
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 130,
        marginBottom: "30px",
        padding: '0 30px',

    },
    hgt: {
        flexGrow: 1,
        background: 'linear-gradient(45deg, #63A4FF 30%, #83EAF1 90%)',
        border: 0,
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 30,
        marginBottom: "30px",
        padding: '0 30px',

    },

    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        background: 'linear-gradient(45deg, #F6D285 30%, #BBF0F3 90%)',
        color: theme.palette.primary.main,
        marginBottom: theme.spacing(0.5),

    },
    avatar: {
        display: 'flex',
        width: theme.spacing(20),
        height: theme.spacing(20),
        '& > *': {
            margin: theme.spacing(30),

        },
    },


}));

function UserProfile() {

    const classes = useStyles()

    const Navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userDetails"))

    if (!user) Navigate("/login")

    const [userInfo, setUserInfo] = useState([])


    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem("userDetails"))
        console.log(user._id)
        fetch(`http://localhost:8000/personal/${user._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => { console.log(data); setUserInfo(data.data) })
            .catch(err => console.log(err))
        console.log(userInfo)

    }, [])

    ///Pop-Ups start
        // 


        
        
        function updateSkill() {
            let item = {primary}
            console.warn("item",item)
            fetch(`http://localhost:8000/personal/${user._id}`, {
                method: 'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(item)            

            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    userInfo()
                })
            })
        }
           
        const [showModal, setShowModal] = useState(false)

        const [primary,setPrimary] = useState([])
        
        const MyModal = () => {
           
            return (
                <>
                    <div className="modal-wrapper">
                        <div className="modal-container">
                            <Multiselect
                               isObject={false}
                               options={primarySkills}
                               value={primary}
                               onChange={(e)=> setPrimary(e.target.value)}
                            />
                            <buttons className="modal-btn" onClick={updateSkill}>save</buttons>
                            <button className="modal-btn" onClick={() => setShowModal(false)}>cancel</button>
                        </div>
                    </div>
                </>
            )
        }

        function updateSkillT() {
            let item = {secondary}
            console.warn("item",item)
            fetch(`http://localhost:8000/personal/${user._id}`, {
                method: 'PUT',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(item)            

            }).then((result) => {
                result.json().then((resp) => {
                    console.warn(resp)
                    userInfo()
                })
            })
        }

        const [showModalT,setShowModalT] = useState(false)
        const [secondary,setSecondary] = useState([])


        const MyModalT = () => {

            return (
                <>
                    <div className="modal-wrapper">
                        <div className="modal-container">
                            <Multiselect
                               isObject={false}
                               options={secondarySkills}
                               value={secondary}
                               onChange={(e)=> setSecondary(e.target.value)}
                            />
                            <buttons className="modal-btn" onClick={updateSkillT}>save</buttons>
                            <button className="modal-btn" onClick={() => setShowModalT(false)}>cancel</button>
                        </div>
                    </div>
                </>
            )
        }




    //pop-ups end

 

     
    

    return (

        <div >
            
            <div className="nav">
                <div className="logo">
                    <a href="#hi"><h1>Hic<span>LOUSIA</span></h1></a>
                </div>
                <div className="menu">
                    <ul>
                        <li><a href="#job">Jobs</a></li>
                        <li><a href="#car">Career Profile</a></li>
                        <li><a href="#up">Upskilling </a></li>
                        <li><a href="#sh">Share</a></li>
                        <li><a href="#my">My Docs</a></li>
                    </ul>
                </div>
            </div>

            <div class="page">

                <div class="div1">

                </div>

                <div class="div2">

                    <div >

                        <Container maxWidth="xs" >
                            <CssBaseline>
                                <Avatar alt="Remy Sharp" src={avatar} className={classes.avatar} />
                                <Grid container spacing={1}>
                                    <Grid item xs={8} sm={8} key={user._id} >
                                        <Typography variant="subtitle1" gutterBottom className={classes.hgt} >
                                            {user.firstName} {user.lastName}
                                        </Typography>

                                    </Grid>

                                </Grid>
                            </CssBaseline>
                        </Container>
                    </div>

                    <Typography variant="subtitle1" gutterBotto className={classes.container} maxWidth="xs"  >
                        Education :
                    </Typography>
                    <Container maxWidth="xs" className={classes.root}>
                        <CssBaseline>

                            <Grid container spacing={1}>

                                {userInfo.educationData?.map((education) => (
                                    <Grid item xs={8} sm={8} key={education._id} >
                                        
                                        {/* <Typography variant="subtitle1" gutterBottom > */}
                                            {education.educationLevel} passedout from {education.collegeName}
                                        {/* </Typography> */}

                                        

                                    </Grid>
                                ))}
                            </Grid>
                        </CssBaseline>
                    </Container>
                    <Typography variant="subtitle1" gutterBotto className={classes.container} maxWidth="xs"   >
                        Contact :
                    </Typography>
                    <Container maxWidth="xs" className={classes.root} >
                        <CssBaseline>
                            <Grid container spacing={1}>
                                {userInfo.user?.map((userData) => (
                                    <Grid item xs={8} sm={8} key={userData._id} >
                                        <Typography variant="subtitle1" gutterBottom >
                                           {userData.email}
                                        </Typography>

                                    </Grid>
                                ))}
                            </Grid>
                        </CssBaseline>
                    </Container>

                </div>

                <div class="div3">

                    <div class="div3-1">
                        {/* <button id="I-am-a">I am a</button> */}
                        <Typography variant="subtitle1" gutterBottom maxWidth="xs" className={classes.container}>
                            PrimarySkills : <button onClick={()=> setShowModal(true)} className="add"><FiEdit2/></button>
                                                     {showModal && <MyModal/>}
                        </Typography>
                        <Container maxWidth="xs" className={classes.root} >
                            <CssBaseline>
                                <Grid container spacing={1}>

                                    {userInfo.skills?.map((skill) => (
                                        <Grid item xs={8} sm={8}  >
                                            <Typography variant="subtitle1" gutterBottom >
                                                {skill.primarySkills}
                                            </Typography>

                                        </Grid>
                                    ))}
                                </Grid>
                            </CssBaseline>
                        </Container>

                    </div>

                    <div class="div3-2">
                        <Typography variant="subtitle1" gutterBottom maxWidth="xs" className={classes.container}>
                            SecondarySkills :   <button className="add" onClick={()=> setShowModalT(true)}><FiEdit2/></button>
                            {showModalT && <MyModalT/>}
                        </Typography>
                        <Container maxWidth="xs" className={classes.root} >
                            <CssBaseline>
                                <Grid container spacing={1}>

                                    {userInfo.skills?.map((skill) => (
                                        <Grid item xs={8} sm={8}  >
                                            <Typography variant="subtitle1" gutterBottom >
                                                {skill.secondarySkills}
                                            </Typography>

                                        </Grid>
                                    ))}
                                </Grid>
                            </CssBaseline>
                        </Container>
                    </div>

                    <div class="down">

                        {/* <div className="Add-Experience">Add Experience</div> */}
                        <Typography variant="subtitle1" gutterBottom maxWidth="xs" className={classes.container}>
                            Expereince :
                        </Typography>
                        <Container maxWidth="xs" >
                            <CssBaseline>
                                <Grid container spacing={1} className={classes.root}>
                                    {userInfo.experienceData?.map((experience) => (
                                        <Grid item xs={8} sm={8} key={experience._id} >
                                            <Typography variant="subtitle1" gutterBottom >
                                                Worked as {experience.jobTitle} at {experience.companyName}
                                            </Typography>
                                            <Typography variant="subtitle1" gutterBottom >
                                                Worked as {experience.jobTitle} at {experience.companyName}
                                            </Typography>

                                        </Grid>
                                    ))}
                                </Grid>
                            </CssBaseline>
                        </Container>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default UserProfile;