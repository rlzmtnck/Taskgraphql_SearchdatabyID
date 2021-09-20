import { useState } from 'react';
import './App.css';
import { gql, useQuery, useLazyQuery } from '@apollo/client'

export default function App() {
  const [userId, setUserId] = useState(0);
  const [list, setList] = useState([]);
  const showData = gql`
  query MyQuery {
    Kampus_Merdeka_anggota {
      nama
      umur
      id
      jkelamin
      keterangans {
        nilai
        pelajaran
        status
      }
    }
  }
  
  `
  const onGetData = () => {
    getTodo({ variables: { id: userId } });
    setList(data?.Kampus_Merdeka_anggota);
  };
  const getByUserID = gql`
  query MyQuery($id: Int!) {
    Kampus_Merdeka_anggota(where: {id: {_eq: $id}}) {
      nama
      umur
      jkelamin
    }
  }
  
  
  `
  // const { data, loading, error } = useQuery(showData); ====> Show data
  const [getTodo, {data, loading, error}] = useLazyQuery(getByUserID);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>


  
  const onChangeUserId = (e) => {
    if(e.target){
      setUserId(e.target.value)
    }
  }
  return (
    <div style={{marginLeft: "700px"}}>
      <h1>DATA ANAK KAMPUS</h1>
      <table border="1">
          <tr>
              <td>Nama</td>
              <td>Umur</td>
              <td>Jenis Kelamin</td>
             
          </tr>
          {data?.Kampus_Merdeka_anggota.map((show) => (
          <tr>
              <td>{show.nama}</td>
              <td>{show.umur}</td>
              <td>{show.jkelamin}</td>
           
          </tr>
        ))}
      </table>
      <input value={userId} onChange={onChangeUserId} /> 
      <button onClick={onGetData}>Get Data</button>
    </div>
  );
}

