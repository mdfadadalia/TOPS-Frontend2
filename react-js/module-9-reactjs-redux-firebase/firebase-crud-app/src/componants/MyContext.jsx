import { createContext, useEffect, useState } from "react";
import { db } from "./Firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, updateDoc, or, where, query } from "firebase/firestore";
import { toast } from "react-toastify";
export const MyContext = createContext()

export const MyContextProvider = ({ children }) => {
    const [stud, setStud] = useState([])
    const [allstud, setAllStud] = useState([])
    const [edit, setEdit] = useState()
    const getData = async () => {
        const resp = await getDocs(collection(db, "student"))
        const newArray = resp.docs.map(ele => ({ id: ele.id, ...ele.data() }))
        setStud(newArray)
        setAllStud(newArray)
    }

    useEffect(() => {
        getData()
    }, [])

    const addData = async (data) => {
        const resp = await addDoc(collection(db, "student"), data)
        getData()
        toast.success("Data Added Successfully!")
    }

    const delData = async (id) => {
        await deleteDoc(doc(db, "student", id))
        getData()
        toast.success("Data Deleted Successfully!")
    }

    const editData = async (id) => {
        const resp = await getDoc(doc(db, "student", id))
        const newArray = await { id: resp.id, ...resp.data() }
        setEdit(newArray)
    }
    const updateData = async (id, data) => {
        const docref = await doc(db, "student", id)
        await updateDoc(docref, data)
        toast.success("Data Updated Successfully!")
        setEdit()
        getData()
    }
    const serarchData = async (value) => {
        if (value == "") {
            setStud(allstud)
        }
        else {                       
                const newArray = allstud.filter((item) =>
                    item.name?.toLowerCase().includes(value.toLowerCase()) ||
                    item.email?.toLowerCase().includes(value.toLowerCase()) ||
                    item.phone?.includes(value)
                );                        
            setStud(newArray)
        }
    }
    return <>
        <MyContext value={{ stud, delData, addData, editData, edit, updateData, serarchData }}>
            {children}
        </MyContext>
    </>
}