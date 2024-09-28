import { useState } from 'react'
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { useSelector } from 'react-redux'



const useErrors = (errors = []) => {

  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else toast.error(error?.data?.message || "Something went Wrong")
      }
    })
  }, [errors])
}


const useAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const [mutate] = mutationHook()

  const executeMutation = async (toastmessage, ...args) => {
    setIsLoading(true)
    const toastId = toast.loading(toastmessage || "Updating data...")

    try {
      const res = await mutate(...args);
      if (res?.data?.success) {
        toast.success(res.data.message || "Updated data Successfully", { id: toastId })
        setData(res.data)
      }
      else {
        toast.error(res?.error?.data?.message || "Something went wrong!", { id: toastId })
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId })
      setIsLoading(false)
    }
    finally {
      setIsLoading(false)
    }
  }



  return [executeMutation, isLoading, data]

}



const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);

    })

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);

      })
    }
  }, [socket, handlers])
}


export { useErrors, useAsyncMutation, useSocketEvents }