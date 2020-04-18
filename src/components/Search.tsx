import React, { useState } from "react";
import "./Search.css";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";
const Search: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);

  const searchInput = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch(
      `https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${input}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
          "x-rapidapi-key":
            "678afc3fabmshc0937d1b8c0b77cp17e8c7jsn2e631e9b2e7c",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data.latest_stat_by_country);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          <strong>Search</strong>
          <br />
          <form onSubmit={searchInput}>
            <IonSearchbar
              value={input}
              onIonChange={(e) => setInput(e.detail.value!)}
              placeholder="E.g. India, USA"
            ></IonSearchbar>
          </form>
          <br />
          {result.map((item) => {
            const {
              country_name,
              total_recovered,
              total_cases,
              total_deaths,
              new_cases,
              new_deaths,
              serious_critical,
              active_cases,
            } = item;
            return (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>{country_name}</IonCardTitle>
                  <IonCardSubtitle>Cases: {total_cases}</IonCardSubtitle>
                  <IonCardSubtitle color="danger">
                    Deaths: {total_deaths}
                  </IonCardSubtitle>
                  <IonCardSubtitle color="success">
                    Total Recovered: {total_recovered}
                  </IonCardSubtitle>
                  <IonCardSubtitle color="danger">
                    New Deaths: {new_deaths}
                  </IonCardSubtitle>
                  <IonCardSubtitle>New Cases: {new_cases}</IonCardSubtitle>
                  <IonCardSubtitle color="danger">
                    Serious Critical: {serious_critical}
                  </IonCardSubtitle>
                  <IonCardSubtitle>
                    Active Cases: {active_cases}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Search;
