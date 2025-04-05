import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './ChatboxHome.css'

const GetUser = ({ switchCase, setSwitchCase, setUsername }) => {
    const [formValue, setFormValue] = useState([])
    console.log(switchCase);
    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername(formValue)
        setSwitchCase(switchCase + 1)
    }

    return (

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '80vh' }}>
            <div className="container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form_front" style={{ marginBottom: 8 }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                margin: "0.25em 0",
                                justifyContent: 'center',
                                position: 'relative',
                                bottom: 60
                            }}
                        >
                            {/* Gradient Definitions */}
                            <svg height="0" width="0" viewBox="0 0 64 64" style={{ position: "absolute" }}>
                                <defs>
                                    {/* Gradient for the first path */}
                                    <linearGradient id="b" gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0">
                                        <stop stopColor="#973BED" />
                                        <stop stopColor="#007CFF" offset="1" />
                                    </linearGradient>

                                    {/* Gradient for the second path */}
                                    <linearGradient id="c" gradientUnits="userSpaceOnUse" y2="0" x2="0" y1="64" x1="0">
                                        <stop stopColor="#FFC800" />
                                        <stop stopColor="#F0F" offset="1" />
                                        <animateTransform
                                            repeatCount="indefinite"
                                            keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
                                            keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
                                            dur="8s"
                                            values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
                                            type="rotate"
                                            attributeName="gradientTransform"
                                        />
                                    </linearGradient>

                                    {/* Gradient for the third path */}
                                    <linearGradient id="d" gradientUnits="userSpaceOnUse" y2="2" x2="0" y1="62" x1="0">
                                        <stop stopColor="#00E0ED" />
                                        <stop stopColor="#00DA72" offset="1" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* First SVG Path */}
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 64 64"
                                height="64"
                                width="64"
                                style={{ display: "inline-block" }}
                            >
                                <motion.path
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="8"
                                    stroke="url(#b)"
                                    d="M 54.722656,3.9726563 A 2.0002,2.0002 0 0 0 54.941406,4 h 5.007813 C 58.955121,17.046124 49.099667,27.677057 36.121094,29.580078 a 2.0002,2.0002 0 0 0 -1.708985,1.978516 V 60 H 29.587891 V 31.558594 A 2.0002,2.0002 0 0 0 27.878906,29.580078 C 14.900333,27.677057 5.0448787,17.046124 4.0507812,4 H 9.28125 c 1.231666,11.63657 10.984383,20.554048 22.6875,20.734375 a 2.0002,2.0002 0 0 0 0.02344,0 c 11.806958,0.04283 21.70649,-9.003371 22.730469,-20.7617187 z"
                                    initial={{ strokeDasharray: "0 1 359 0", strokeDashoffset: 365 }}
                                    animate={{
                                        strokeDasharray: ["0 1 359 0", "0 359 1 0", "359 1 0 0"],
                                        strokeDashoffset: [365, 5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </motion.svg>

                            {/* Second SVG Path */}
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 64 64"
                                height="64"
                                width="64"
                                style={{ display: "inline-block" }}
                            >
                                <motion.path
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="10"
                                    stroke="url(#c)"
                                    d="M 32 32 m 0 -27 a 27 27 0 1 1 0 54 a 27 27 0 1 1 0 -54"
                                    initial={{ strokeDasharray: "270 90", rotate: 0 }}
                                    animate={{
                                        strokeDasharray: ["270 90", "0 360", "270 90"],
                                        rotate: [0, 270, 540, 810, 1080],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    style={{ transformOrigin: "center" }}
                                />
                            </motion.svg>

                            {/* Spacer */}
                            <Box sx={{ width: "0.5em" }} />

                            {/* Third SVG Path */}
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 64 64"
                                height="64"
                                width="64"
                                style={{ display: "inline-block" }}
                            >
                                <motion.path
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="8"
                                    stroke="url(#d)"
                                    d="M 4,4 h 4.6230469 v 25.919922 c -0.00276,11.916203 9.8364941,21.550422 21.7500001,21.296875 11.616666,-0.240651 21.014356,-9.63894 21.253906,-21.25586 a 2.0002,2.0002 0 0 0 0,-0.04102 V 4 H 56.25 v 25.919922 c 0,14.33873 -11.581192,25.919922 -25.919922,25.919922 a 2.0002,2.0002 0 0 0 -0.0293,0 C 15.812309,56.052941 3.998433,44.409961 4,29.919922 Z"
                                    initial={{ strokeDasharray: "0 1 359 0", strokeDashoffset: 365 }}
                                    animate={{
                                        strokeDasharray: ["0 1 359 0", "0 359 1 0", "359 1 0 0"],
                                        strokeDashoffset: [365, 5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </motion.svg>

                        </Box>


                    </div>
                    <Box sx={{
                        mt: 40, display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 3, position: 'relative', bottom: 58,
                        label: {
                            color: 'white'
                        },
                        input: {
                            color: 'white',
                            border: 'none',
                            borderBottom: '2px solid white'
                        }
                    }}>
                        <TextField label='Username' onChange={(e) => setFormValue(e.target.value)} required />
                        <Button variant='contained' type='submit' sx={{}} >Submit</Button>
                    </Box>

                </form>
            </div>
            {/* <Button variant='outlined' type='submit'>Submit</Button>
                </Box>
            </Box> */}

        </div>
    )
}

export default GetUser