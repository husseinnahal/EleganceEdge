"use client"
import styles from './page.module.css'
import { CheckToken } from '@/Context/UserContext'

export default function Search() {
    const { setSearsh}=CheckToken();
    function searsh(){
        setSearsh("block")
    }
  return (
    <p className={styles.serach} onClick={searsh}>Search</p>
  )
}
