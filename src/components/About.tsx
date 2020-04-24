import React from "react";
import {
  IonPage,
  IonContent,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonHeader,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import "./About.css";
import Virus from ".././img/virus.png";
import Hands from ".././img/hands.png";
import Dont from ".././img/dont.png";
import Distance from ".././img/distance.png";
const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Track Corona</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <strong>About COVID-19</strong>
          <p>
            Coronavirus disease (COVID-19) is an infectious disease caused by a
            new virus. The disease causes respiratory illness (like the flu)
            with symptoms such as a cough, fever, and in more severe cases,
            difficulty breathing. You can protect yourself by washing your hands
            frequently, avoiding touching your face, and avoiding close contact
            (1 meter or 3 feet) with people who are unwell.
          </p>

          <div className="wrapper">
            <img src={Virus} />
            <img src={Hands} />
            <img src={Dont} />
            <img src={Distance} />
          </div>
          <strong>How It Spreads:</strong>
          <p>
            Coronavirus disease spreads primarily through contact with an
            infected person when they cough or sneeze. It also spreads when a
            person touches a surface or object that has the virus on it, then
            touches their eyes, nose, or mouth.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default About;
