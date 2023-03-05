import React, { useEffect } from 'react'
import { useContext, useRef, useState } from 'react';
import noteContext from './context/notes/noteContext';
import NoteItem from './NoteItem';
import { Addnote } from './Addnote';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from './context/AlertContext';



export const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editnote } = context;
  const navigate = useNavigate()
  const { showAlert } = useContext(AlertContext)


  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
      console.log(notes)
    } else {
      navigate("/login");
      showAlert("You need to signed in first", "error")
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {

    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  const handleclick = (e) => {
    console.log("Updating the note...", note);
    editnote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    showAlert("Updated Successfully", "success")
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Addnote />

      {/* <!-- Modal toggle --> */}

      {/* <!-- Modal toggle --> */}
      <button ref={ref} data-modal-target="staticModal" data-modal-toggle="staticModal"
        class="block text-white hidden bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Toggle modal
      </button>

      {/* <!-- Main modal --> */}
      <div id="staticModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div class="relative w-full h-full max-w-2xl md:h-auto">
          {/* <!-- Modal content --> */}
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Note
              </h3>
              <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="title" className="sr-only" >
                    Title
                  </label>
                  <input
                    id="etitle"
                    name="etitle"
                    required
                    minLength={5}
                    type="text"
                    value={note.etitle}
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
                    id="edescription"
                    name="edescription"
                    type="text"
                    value={note.edescription}
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
                    id="etag"
                    name="etag"
                    type="text"
                    required
                    value={note.etag}
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Tag"
                    onChange={onChange}
                  />
                </div>
              </div>
            </form>
            {/* <!-- Modal footer --> */}
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button data-modal-hide="staticModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                ref={refClose}
                onClick={handleclick}>I accept</button>
              <button data-modal-hide="staticModal" type="button"  ref={refClose} class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-6 my-3 py-5 px-5">
        <h2>your notes</h2>
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
          })
        ) : (
          <p>No notes to display</p>
        )}
      </div>
    </>
  )
}
export default Notes