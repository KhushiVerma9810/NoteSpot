import React from 'react'
import { useContext} from 'react'
import { AlertContext } from './context/AlertContext'
export const Alert = (props) => {
  const {alert, open , removeAlert} = useContext(AlertContext)
  return (
    <div>
  {alert && open && (
    <div
      className={`${
        open ? 'block' : 'hidden'
      } bg-${
        alert.type === 'error' ? 'red' : 'green'
      }-100 border border-${
        alert.type === 'error' ? 'red' : 'green'
      }-400 text-${
        alert.type === 'error' ? 'red' : 'green'
      }-700 px-4 py-3 rounded `}
      role="alert"
    >
      <strong className="font-bold">
        {alert.type === 'error' ? 'Error: ' : 'Success: '}
      </strong>
      <span className="block sm:inline">{alert.message}</span>
      <span className="absolute top-0 right-0 px-4 py-3">
        <svg
          className={`fill-current h-6 w-6 text-${
            alert.type === 'error' ? 'red' : 'green'
          }-500`}
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 6.066 4.652a1 1 0 10-1.414 1.414L8.586 10l-3.934 3.934a1 1 0 101.414 1.414L10 11.414l3.934 3.934a1 1 0 001.414-1.414L11.414 10l3.934-3.934a1 1 0 000-1.414z" />
        </svg>
      </span>
    </div>
  )}
</div>

  )
}
export default Alert