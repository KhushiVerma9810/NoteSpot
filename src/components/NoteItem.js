import React from 'react'
import { useContext , useState} from 'react';
import noteContext from './context/notes/noteContext';
import { AlertContext } from './context/AlertContext';

export const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
    const { note, updateNote } = props;
    const { showAlert } = useContext(AlertContext) 

    const deleteclick =()=>{
      showAlert("deleted Successfully", "success")
    }
 
  return (
  <>
  
    <div className="flex-auto cards bg-gray-200 m-4 rounded-md inline-block left-28 relative">
      <div className='card p-4 '>
      <div className="px-2 py-2">
       <div className='flex'> <h1 className="font-bold text-xl mb-2 text-center">{note.title}</h1>
        <i className="bi bi-trash3-fill mx-2" onClick={() => {deleteNote(note._id); deleteclick()}}></i>
        <i className="bi bi-pencil-square mx-2"   onClick={()=>{updateNote(note)}}></i>
        </div>
        <p className="text-gray-700 text-base">
        {note.description}
        </p>
      </div>
      </div>
    </div>

    {/* Modal */}
    
    </>
  );
};
export default NoteItem