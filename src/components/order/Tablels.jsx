import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Tablels = () => {
    const [tables, setTables] = useState([]);
    // const tables = [
    //     {
    //             type:"common",
    //             table_num:1,

    //     },
    //     {
    //             type:"common",
    //             table_num:2,

    //     },
    //     {
    //             type:"common",
    //             table_num:3,

    //     },
    // ]
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://server-08ld.onrender.com/orders');
            const jsonData = await response.json();
            setTables(jsonData);
           
          } catch (error)   
       {
            setError(error);
          }
        };
      
        fetchData();
      }, []);
    return (
        <div>
            {
                tables.map(table=>(
                  <div key={table._id}>
                      <h1>Tabble no: {table.table_num}<span style={{ fontSize: '20px' }}>({table.type})</span></h1>
                      
                      <Link to={`/orders/${table.table_num}`}><button>Manage</button> </Link>
                  </div>
                ))
            }
        </div>
    );
};

export default Tablels;