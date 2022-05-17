import React, {useState, useEffect} from 'react'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { tokenConfig } from '../actions/auth'


const NotePage = ({ match, history}) => {

    let noteId  = match.params.id;
    let [note, setNote] = useState(null)
    let userdata = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        getNote()
    }, [noteId])

    let getNote = async ()=>{
        if (noteId === 'new') return  
        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)

    }

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })

    }

    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
        history.push('/')

    }

    let createNote = async () => {
        fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify([note.body, userdata.user.username]),

        })

    }

    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === ''){
            deleteNote()
        }else if(noteId !== 'new'){
            updateNote()
        }else if(noteId == 'new' && note !== null){
            createNote()
        }
        history.push('/')
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                <ArrowLeft onClick={handleSubmit}/>
                </h3>
                { noteId !== 'new' ? (
                <button onClick={deleteNote}>Delete</button>
                ):(
                <button onClick={handleSubmit}> Done </button>
                )}
                            <h2>Author: {note?.author}</h2>
                
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value })}} value={note?.body}>
            </textarea>

        </div>
        
        
    )
}

export default NotePage;