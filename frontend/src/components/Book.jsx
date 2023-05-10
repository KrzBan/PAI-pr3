import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../Api"

function Book(){

    const { id } = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        api.get(`books/${id}`).then(res => {
            setBook(res.data);
            setLoading(false);
        })
    }, [id]);

    const onClaim = () => {
        event.preventDefault();
        api.post(`books/${id}/claim`).then(() => {
            
        }).catch(err=>{
            console.log(err);
        })
    }

    const onReturn = () => {
        event.preventDefault();
        api.post(`books/${id}/return`).then(() => {
            
        }).catch(err=>{
            console.log(err);
        })
    }

    return(
    <div className=" mx-16 py-10">
        <div className="flex flex-col items-center text-center">

            <h1 className="text-3xl font-bold mb-4">Book</h1>

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <div className="w-60 text-start">
                 <p className="pb-4 text-4xl text-center font-bold">
                {book?.name}
                </p>

                <p className="mb-2 text-lg">
                <span className="font-bold">Author: </span>
                {book?.author}
                </p>

                <p className="mb-2 text-lg">
                <span className="font-bold">ISBN: </span>
                {book?.isbn}
                </p>

                <p className="mb-2 text-lg">
                <span className="font-bold">Available copies: </span>
                {book?.count}
                </p>

                <button onClick={onClaim}>Claim</button>
                <button onClick={onReturn}>Return</button>
                </div>
            )}

      </div>

    
    </div>
    ) 
}

export default Book