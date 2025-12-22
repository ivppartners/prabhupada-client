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

  const handleDownload = async (e) => {
    const item = list.find((i) => i.id === e.target.value);
    if (!item) return;
    await download(e.target.value, item.failo_pavadinimas);
  };

  React.useEffect(() => {
    getAudio().then((data) =>
      dispatch({ type: "gautasSarasas", payload: data })
    );
  }, []);

  const renderList = (item) => (
    <tr key={item.id}>
      <td>{item.pavadinimas}</td>
      <td className="right">{item.dydis}</td>
      <td>{dayjs(item.failo_data).format("YYYY-MM-DD")}</td>
      <td>{item.data ? dayjs(item.data)?.format("YYYY-MM-DD") : null}</td>
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
    </tr>
  );

  return (
    <Layout>
      <div className="container-fluid">
        <div className="table-responsive mt-5"></div>
        {list.length ? (
          <table className="table table-sm table-bordered table-hover">
            <thead>
              <tr>
                <th>Pavadinimas</th>
                <th>Dydis</th>
                <th>Failo data</th>
                <th>Įrašo data</th>
                <th>Metai</th>
                <th>Vieta</th>
                <th>Knyga</th>
                <th>Giesmė</th>
                <th>Skyrius</th>
                <th>Tekstas</th>
                <th>Aprašymas</th>
              </tr>
            </thead>
            <tbody>{list.map(renderList)}</tbody>
          </table>
        ) : null}
      </div>
    </Layout>
  );
}
