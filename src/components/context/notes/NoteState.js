
import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState =(props) =>{
  const host = "http://localhost:5000"
const notesInitial = []
const[notes , setNotes] = useState(notesInitial)
//Get all Notes
const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwMjNiNGQ3OTBjNWE0ZGUyNzljYzg2In0sImlhdCI6MTY3NzkyNjIwOH0.a5cVP8ReVWnHc-IwlEWirvFuL0QK16ZVCVIrNZ9SsS0',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const notes = await response.json();
      return notes;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
 // parses JSON response into native JavaScript objects
// const json = await response.json()
// setNotes(json)
// }
//Add a note
const addNote = async(title , description , tag)=>{
    ///TODO : API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlZjRjNjVhYzFhYjc5Y2VhNWY0Nzg3In0sImlhdCI6MTY3NjY1MDAyNn0.5vK1lybIfPSjQtDj2T4u_NQ_8GxHNMSBA5cvDQe0qz4"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title , description , tag}) // body data type must match "Content-Type" header
    });
     // parses JSON response into native JavaScript objects
    const note = await response.json();
    setNotes(notes.concat(note))

//     console.log("adding a new note")
//    const note = {
//         "_id": "63f38817943aab070c15f5d6",
//         "user": "63ef4c65ac1ab79cea5f4787",
//         "title": title,
//         "description": description,
//         "tag": tag,
//         "date": "2023-02-20T14:47:51.902Z",
//         "__v": 0
//     };
//   setNotes(notes.concat(note))
 }
//Delete a node
const deleteNote = async(id)=>{
  //TODO API call
   const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlZjRjNjVhYzFhYjc5Y2VhNWY0Nzg3In0sImlhdCI6MTY3NjY1MDAyNn0.5vK1lybIfPSjQtDj2T4u_NQ_8GxHNMSBA5cvDQe0qz4"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  const json =  response.json();
//   console.log(json); // parses JSON response into native JavaScript objects
// console.log("Deleting the note with id" + id);


const newNotes = notes.filter((note)=>{return note._id!==id})
setNotes(newNotes)
}
//Edit a note
const editnote = async(id , title , description , tag) =>{
  //TODO API call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlZjRjNjVhYzFhYjc5Y2VhNWY0Nzg3In0sImlhdCI6MTY3NjY1MDAyNn0.5vK1lybIfPSjQtDj2T4u_NQ_8GxHNMSBA5cvDQe0qz4"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({title , description , tag}) // body data type must match "Content-Type" header
  });
  const json = await response.json(); // parses JSON response into native JavaScript objects
  // console.log(json);
  
  let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

//Edit a node
       return(
        <NoteContext.Provider value={{notes,addNote , deleteNote , editnote , getNotes}}>
       
            {props.children}
          </NoteContext.Provider>

       )
       }
export default NoteState