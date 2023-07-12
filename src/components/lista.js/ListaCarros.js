import axios from 'axios';
import { useEffect, useState } from "react";

export default function ListaCarros(){
    const [pessoas, setPessoas] = useState([])

    useEffect(()=> {
        axios.get('https://devwebapireact.eduardogoncalv5.repl.co')
        .then(res=>{
            const dadosPessoas = res.data
            setPessoas(dadosPessoas)
        })
    }, []) 

    return null;
}
