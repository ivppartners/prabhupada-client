import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import {
  download,
  getAudio,
} from "../dataService";
import { useState, useDispatch } from "../StateContext";
import Layout from "../components/layout";

export default function Lectures() {
  const dispatch = useDispatch();
  const { list } = useState();
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });

  const handleDownload = async (e) => {
    const item = list.find((i) => i.id === e.target.value);
    if (!item) return;
    await download(e.target.value, item.failo_pavadinimas);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedList = () => {
    if (!sortConfig.key || !list.length) return list;

    const sortedList = [...list].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      
      // Handle numbers
      if (sortConfig.key === 'metai' || sortConfig.key === 'giesme' || 
          sortConfig.key === 'skyrius' || sortConfig.key === 'tekstas') {
        aVal = aVal ? parseInt(aVal) : 0;
        bVal = bVal ? parseInt(bVal) : 0;
      }

      // Handle strings (case insensitive)
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal ? bVal.toLowerCase() : '';
      }

      if (aVal === null || aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal || bVal === null) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedList;
  };

  const getSortIndicator = (columnKey) => {
    if (sortConfig.key !== columnKey) return ' ↕';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  React.useEffect(() => {
    getAudio().then((data) =>
      dispatch({ type: "gautasSarasas", payload: data })
    );
  }, [dispatch]);

  const sortedList = getSortedList();

  return (
    <Layout>
      <div className="container-fluid">
        <div className="table-responsive mt-5"></div>
        {list.length ? (
          <table className="table table-sm table-bordered table-hover">
            <thead>
              <tr>
                <th onClick={() => handleSort('pavadinimas')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Pavadinimas{getSortIndicator('pavadinimas')}
                </th>
                <th onClick={() => handleSort('dydis')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Dydis{getSortIndicator('dydis')}
                </th>
                <th onClick={() => handleSort('failo_data')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Failo data{getSortIndicator('failo_data')}
                </th>
                <th onClick={() => handleSort('data')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Įrašo data{getSortIndicator('data')}
                </th>
                <th onClick={() => handleSort('metai')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Metai{getSortIndicator('metai')}
                </th>
                <th onClick={() => handleSort('vieta')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Vieta{getSortIndicator('vieta')}
                </th>
                <th onClick={() => handleSort('knyga')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Knyga{getSortIndicator('knyga')}
                </th>
                <th onClick={() => handleSort('giesme')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Giesmė{getSortIndicator('giesme')}
                </th>
                <th onClick={() => handleSort('skyrius')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Skyrius{getSortIndicator('skyrius')}
                </th>
                <th onClick={() => handleSort('tekstas')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Tekstas{getSortIndicator('tekstas')}
                </th>
                <th onClick={() => handleSort('aprasymas')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  Aprašymas{getSortIndicator('aprasymas')}
                </th>
                <th>Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              {sortedList.map((item) => (
                <tr key={item.id}>
                  <td>{item.pavadinimas}</td>
                  <td className="right">{item.dydis}</td>
                  <td>{item.failo_data}</td>
                  <td>{item.data}</td>
                  <td>{item.metai}</td>
                  <td>{item.vieta}</td>
                  <td>{item.knyga}</td>
                  <td className="right">{item.giesme}</td>
                  <td className="right">{item.skyrius}</td>
                  <td className="right">{item.tekstas}</td>
                  <td>{item.aprasymas}</td>
                  <td>
                    &nbsp;
                    <Link to={`/play/${item.id}`} className="btn btn-info">
                      Groti
                    </Link>
                    &nbsp;
                    <button
                      onClick={handleDownload}
                      value={item.id}
                      className="btn btn-warning"
                    >
                      Atsisiųsti
                    </button>
                  </td>
                </tr>))}
            </tbody>
          </table>
        ) : null}
      </div>
    </Layout>
  );
};
