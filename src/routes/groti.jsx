import React from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout";
import { getAudio } from "../dataService";
import AudioPlayer from "../components/audioPlayer";
import { useDispatch, useState } from "../StateContext";

export default function Groti() {
  const { list } = useState();
  const dispatch = useDispatch();
  const { id } = useParams();

  React.useEffect(() => {
    if (!list.length)
      getAudio().then((data) =>
        dispatch({ type: "gautasSarasas", payload: data })
      );
  }, [dispatch, list.length]);

  if (!list.length)
    return (
      <Layout>
        <div className="container">Kraunama...</div>
      </Layout>
    );
  if (!list.find((e) => e.id === id))
    return (
      <Layout>
        <div className="container">Nerasta</div>
      </Layout>
    );

  return list.length ? (
    <Layout>
      <div className="container">
        <AudioPlayer id={id} tracks={list} />
        <Link to="/lectures" className="btn btn-secondary">
          Atgal
        </Link>
      </div>
    </Layout>
  ) : null;
}
