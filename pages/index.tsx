import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Login from './auth/login'

// Dr. Sharma wants to login page to be the home page
const Home: NextPage = Login; 

export default Home;
