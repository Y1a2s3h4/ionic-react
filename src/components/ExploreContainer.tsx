import React, { useEffect, useState } from "react";
import "./ExploreContainer.css";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
interface ContainerProps {
  name: string;
}
interface CasesByCountry {
  country_name: string;
  cases: string;
  deaths: string;
  total_recovered: string;
  new_deaths: string;
  new_cases: string;
  serious_critical: string;
  active_cases: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  useEffect(() => {
    cases_country();
  }, []);
  const [cases, setCases] = useState([]);
  const cases_country = () => {
    fetch(
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
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
        console.log(data.countries_stat);
        setCases(data.countries_stat);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <IonContent>
      <div className="container">
        <strong>{name} BY COUNTRY</strong>
        {cases.map((item) => {
          const {
            country_name,
            cases,
            deaths,
            total_recovered,
            new_deaths,
            new_cases,
            serious_critical,
            active_cases,
          } = item;
          return (
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{country_name}</IonCardTitle>
                <IonCardSubtitle>Cases: {cases}</IonCardSubtitle>
                <IonCardSubtitle color="danger">
                  Deaths: {deaths}
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
                <IonCardSubtitle>Active Cases: {active_cases}</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          );
        })}
      </div>
    </IonContent>
  );
};

export default ExploreContainer;
