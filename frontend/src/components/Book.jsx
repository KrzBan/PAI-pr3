import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, getToken } from "../Api"
import { useJwt } from "react-jwt";
import Error from "./Error";

function Book(){

    const { id } = useParams();
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { decodedToken } = useJwt(getToken());

    useEffect(()=>{
        setLoading(true);
        api.get(`books/${id}`).then(res => {
            setBook(res.data);
            setLoading(false);
        })
    }, [id]);

    const onClaim = () => {
        api.post(`books/${id}/claim`).then(() => {
            window.location.reload(); 
        }).catch(error=>{
            console.log(error);
            setError(error.response.data.message);
        })
    }

    const onReturn = () => {
        api.post(`books/${id}/return`).then(() => {
            window.location.reload(); 
        }).catch(error=>{
            setError(error.response.data.message);
        })
    }

    const clearError = () => {
        setError("");
      }

    return(
    <div className=" mx-16 py-10">
        <div className="flex flex-col items-center text-center">

            <h1 className="text-3xl font-bold mb-4">Book</h1>
            {error?
            <Error msg={error} onClick={clearError} />
            :null
            } 
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
                
                {decodedToken ? (
                    <div>
                    {book.owned ? (
                        <button onClick={onReturn}>Return</button>
                    ) : (
                        <button onClick={onClaim}>Claim</button>
                    )}
                    </div>
                    ) : (
                    ""
                )}

                
                
                </div>
            )}

      </div>

    
    </div>
    ) 
}

export default Book