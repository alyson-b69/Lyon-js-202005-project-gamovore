import React, { useState, useContext, useEffect } from "react";
import FirebaseContext from "../firebase-config/FirebaseContext";
import StyleForPseudo from "../style/Pseudo";
import AvatarImg from "../style/AvatarImg";
import GamovoreDiv from "../style/GamovoreDiv";
import Linked from "../style/Linked";

const Gamovores = (props) => {
  const [gamovoresList, setGamovoresList] = useState([]);
  const firebase = useContext(FirebaseContext);
  const user = props.user;
  const userId = props.user.favoriteGamovoreID;

  useEffect(() => {
    if (user && userId.length) {
      firebase
        .firestore()
        .collection("users")
        .where("id", "in", userId)
        .get()
        .then((snapshot) => {
          let gamovores = [];
          snapshot.forEach((doc) => {
            if (doc && doc.exists) {
              gamovores.push(doc.data());
            }
          });
          setGamovoresList(gamovores);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userId, firebase, user]);

  if (gamovoresList) {
    return (
      <div>
        {gamovoresList.length !== 0 ? (
          gamovoresList.map((item) => (
            <Linked
              to={{
                pathname: `/gamovore/${item.id}`,
                state: { detail: item.pseudo, gvid: item.id },
              }}
              key={item.id}
            >
              <GamovoreDiv key={item.id} display="inline-block">
                <AvatarImg src={item.avatarUrl} />
                <StyleForPseudo>{item.pseudo}</StyleForPseudo>
              </GamovoreDiv>
            </Linked>
          ))
        ) : (
          <p>No gamovore</p>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading, please wait...</p>
      </div>
    );
  }
};

export default Gamovores;
