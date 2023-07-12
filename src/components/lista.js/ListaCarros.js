import axios from 'axios';
import { useEffect, useState } from "react";

export default function ListaCarros(){
    const [carros,setCarros] = useState([])

    useEffect(()=> {
        axios.get('https://devwebapireact.eduardogoncalv5.repl.co')
        .then(res=>{
            const dadosCarros = res.data
            setCarros(dadosCarros)
        })
    })


       
    }
