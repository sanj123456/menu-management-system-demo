 
import React, { useRef } from 'react'
import Button from './Button'
import { Icons } from '@/assets/Icons'
import Image from 'next/image'
 
 

const DeleteModal = ({
  message = "Are you sure you want to delete this?",
  deleteCallback,
  loading = false,
  closeModal,
  buttonName = "Delete"
} ) => {
  const ref = useRef (null)

  const handleClickOutside = (event ) => {
    if (!loading && ref.current && !ref.current.contains(event.target  )) {
      closeModal?.()
    }
  }

  return (
    <div 
      className="absolute bg-black z-[3000] top-0 left-0 w-full h-full bg-opacity-40 flex items-center justify-center p-4" 
      onClick={handleClickOutside}
    >
      <div 
        ref={ref} 
        className="relative max-w-[95%] md:max-w-max lg:max-w-96 bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center space-y-4 text-center"
      >
        <Image 
          src={Icons.alert} 
          alt="alert" 
          className="h-10 filter invert-[16%] sepia-[85%] saturate-[1810%] hue-rotate-[343deg] brightness-[89%] contrast-[113%]" 
        />
        
        <div className="max-w-[40ch] break-words">
          {message}
        </div>

        <div className="flex items-center justify-evenly gap-4">
          <Button
            className="min-w-min px-3 py-2 hover:bg-red-400 bg-[#8d8d8da2] tracking-[.3px] text-gray-700 hover:text-white rounded"
            loading={loading}
            onClick={deleteCallback}
          >
            {buttonName}
          </Button>
          
          <Button
            onClick={closeModal}
            className="min-w-min px-3 py-2 bg-pink-400 text-white rounded tracking-[.3px]"
            disabled={loading}
          >
            Cancel
          </Button>
        </div>

        <button 
          onClick={() => closeModal()} 
          className="absolute top-0 right-4 bg-transparent border-none cursor-pointer"
        >
          <Image  src={Icons.cross} alt="" className="h-7 w-min" />
        </button>
      </div>
    </div>
  )
}

export default DeleteModal