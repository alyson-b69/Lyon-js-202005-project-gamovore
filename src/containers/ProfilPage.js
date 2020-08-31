import React, { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import FirebaseContext from "../firebase-config/FirebaseContext";
import { UserBase } from "../UserBase";
import GameCard from "../components/GameCard";
import Profil from "../components/Profil";
import ProfilPageLayout from "../style/ProfilPageLayout";
import ProfilGameLayout from "../style/ProfilGameLayout";
import ProfilAsideLayout from "../style/ProfilAsideLayout";
import MyGamovoreLayout from "../style/MyGamovoreLayout";
import MyGamovoreProfilLayout from "../style/MyGamovoreProfilLayout";
import SecondaryTitle from "../style/SecondaryTitle";
import StyleForPseudo from "../style/Pseudo";
import StyleForAvatar from "../style/Avatar";
import CallIgdb from "./CallIgdb";
import Loading from "../style/Loading";
import Title from "../style/Title";
import LoadingImg from "../style/LoadingImg";

const API_KEY = process.env.REACT_APP_API_KEY;

const ProfilPage = () => {
  const { user } = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const nbGames = user.favoriteGameId.length;
  const gamesToLoad = user.favoriteGameId.toString();

  const dataCallIgdb = `fields name, summary, cover.url, genres.name, platforms.platform_logo.url ,platforms.name, themes.name, game_modes.name; limit 3; where id=(${gamesToLoad});`;

  const { gameList, setGameList, loading, setLoading } = CallIgdb(dataCallIgdb);

  useEffect(() => {
    if (nbGames !== 0 && nbGames !== null) {
      axios({
        url:
          "https://thingproxy.freeboard.io/fetch/https://api-v3.igdb.com/games",
        method: "POST",
        headers: {
          Accept: "application/json",
          "user-key": API_KEY,
        },
        data: dataCallIgdb,
      })
        .then((response) => response.data)
        .then((data) => {
          setGameList(data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [user]);

  const ViewGames = () => {
    if (nbGames !== 0) {
      return gameList.map((item) => (
        <GameCard little {...item} key={item.id} />
      ));
    } else {
      return <div>No games to your collection ... </div>;
    }
  };

  return (
    <ProfilPageLayout>
      <Profil />
      <ProfilAsideLayout>
        <section>
          <SecondaryTitle>My Games</SecondaryTitle>
          <ProfilGameLayout>
            {loading ? (
              <Loading>
                <Title>
                  Be patient young Gamovore, the duck is fishing a games for you
                  ...
                </Title>
                <LoadingImg
                  src="https://cdn.dribbble.com/users/591610/screenshots/3861704/pato.gif"
                  alt="loading"
                />
              </Loading>
            ) : (
              <ViewGames />
            )}
          </ProfilGameLayout>
        </section>
        <MyGamovoreLayout>
          <SecondaryTitle>My Gamovores</SecondaryTitle>
          <MyGamovoreProfilLayout>
            {UserBase.map((item) => (
              <div key={item.id}>
                <StyleForAvatar src={item.avatar} />
                <StyleForPseudo>{item.pseudo}</StyleForPseudo>
              </div>
            ))}
          </MyGamovoreProfilLayout>
        </MyGamovoreLayout>
      </ProfilAsideLayout>
    </ProfilPageLayout>
  );
};

export default ProfilPage;
