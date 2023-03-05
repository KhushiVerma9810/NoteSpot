import React from 'react'
import noteContext from './context/notes/noteContext';
import { useContext  , useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from './context/AlertContext';
import Alert from './Alert';
export const Addnote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
   

    const [note, setNote] = useState({title:"" , description:"" , tag:""})
    
    const navigate = useNavigate()
    const { showAlert } = useContext(AlertContext)

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         console.log("yoooo")
    //     } else {
    //         navigate('/login')
    //         showAlert("You need to signed in first", "error")
    //     }
    //   //  eslint-disable-next-line
    // }, [])

    const handleclick = (e)=>{
        e.preventDefault();
        addNote(note.title , note.description , note.tag);
        setNote({title:"" , description:"" , tag:""})
        showAlert("Added Successfully", "success")
    }
   const onChange = (e)=>{
    setNote({...note , [e.target.name]: e.target.value})
   }
  return (
    <div>
     < Alert alert={alert}/>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
             Add a Note
            </h2>

          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="title" className="sr-only" >
                 Title
                </label>
                <input
                  id="title"
                  name="title"
                  required
                  minLength={5}
                  type="text"
                  value={note.title}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Title"
                  onChange={onChange}
                />
              </div>
              <div>
                <label htmlFor="desc" className="sr-only">
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={note.description}
                  required
                  minLength={5}
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Description"
                  onChange={onChange}
                />
              </div>
              <div>
                <label htmlFor="tag" className="sr-only">
                 Tag
                </label>
                <input
                  id="tag"
                  name="tag"
                  type="text"
                  value={note.tag}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Tag"
                  onChange={onChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleclick}
                disabled ={note.title.length < 5 || note.description.length < 5}
              >
               Add Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
