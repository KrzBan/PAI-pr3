import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {api, getToken} from "../Api";
import { useJwt } from "react-jwt";
import { MaterialReactTable } from 'material-react-table';

function Books(){

    let [books, setBooks] = useState([]);
    let [loading, setLoading] = useState(true);

    const { decodedToken } = useJwt(getToken());

    useEffect(() => {
        setLoading(true);
        api.get("books").then((res) => {
            setBooks(res.data);
            setLoading(false);
        })
    }, []);

    const tableCols =  [
      {
        accessorFn: (row) => `${row.id + (row.owned ? " - Owned" : "")}`, 
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Title',
        size: 150,
      },
      {
        accessorKey: 'author', 
        header: 'Author',
        size: 200
      },
      {
        accessorKey: 'isbn',
        header: 'ISBN',
        size: 150,
      },
      {
        header: '',
        size: 100,
        id: "details",
        Cell: ({ _, row }) => (
          <Link to={row.original.id.toString()} key={row.original.id}>Details</Link>
        )
      }
    ]

    return (
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-5">Books</h1>

          {decodedToken?.role === "admin" ? 
            (<Link to="create">Add Book</Link>) :
            ("")}
          

          {loading ? (
            <div className="">loading...</div>
          ) : (
            <MaterialReactTable columns={tableCols} data={books} />
          )}
        </div>
      );
}

export default Books;