import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonChip,
  IonLabel,
  IonModal,
  IonButton,
} from "@ionic/react";
import "./Cases_India.css";
interface CasesIndia {
  active: string;
  confirmed: string;
  deaths: string;
  deltaconfirmed: string;
  deltadeaths: string;
  deltarecovered: string;
  lastupdatedtime: string;
  recovered: string;
  state: string;
}
const Cases_India: React.FC = () => {
  const [state, setState] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [stateZero, setStateZero] = useState([]);
  const [valueState, setValueState] = useState("");
  useEffect(() => {
    statewise();
  }, []);
  const statewise = () => {
    fetch("https://api.covid19india.org/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.statewise[0]);
        console.log(data.statewise);
        const arrZero: any = [];
        arrZero.push(data.statewise[0]);
        setStateZero(arrZero);
        data.statewise.shift();
        setState(data.statewise);
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
          <strong>CASES IN INDIA</strong>
          {stateZero.map((item: CasesIndia) => {
            return (
              <div key={uuid()} className="container">
                <IonText>Last Updated Time: {item.lastupdatedtime}</IonText>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonChip outline className="padding" color="danger">
                        <IonLabel className="">
                          Confirmed: {item.confirmed} [+ {item.deltaconfirmed}]
                        </IonLabel>
                      </IonChip>
                    </IonCol>

                    <IonCol>
                      <IonChip outline className="padding" color="success">
                        <IonLabel className="">
                          Recovered: {item.recovered} [+ {item.deltarecovered}]
                        </IonLabel>
                      </IonChip>
                    </IonCol>
                    <IonCol>
                      <IonChip outline className="padding" color="medium">
                        <IonLabel className="">
                          Deaths: {item.deaths} [+ {item.deltadeaths}]
                        </IonLabel>
                      </IonChip>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            );
          })}
        </div>

        <IonGrid className="padding-0">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">State</th>
                <th className="danger" scope="col">
                  Confirmed
                </th>
                <th className="success" scope="col">
                  Recovered
                </th>
                <th className="medium" scope="col">
                  Deaths
                </th>
              </tr>
            </thead>
            <tbody>
              {state.map((item: CasesIndia) => {
                return (
                  <tr key={uuid()}>
                    <td>
                      <a
                        onClick={(e) => {
                          setShowModal(true);
                          setValueState(e.currentTarget.innerHTML);
                        }}
                        className="c-pointer"
                      >
                        {item.state}
                      </a>
                    </td>
                    <td className="danger">
                      {item.confirmed}{" "}
                      {item.deltaconfirmed !== "0"
                        ? `[↑ ${item.deltaconfirmed}]`
                        : ""}
                    </td>
                    <td className="success">
                      {item.recovered}
                      {item.recovered !== "0" ? `[↑ ${item.recovered}]` : ""}
                    </td>
                    <td className="medium">
                      {item.deaths}
                      {item.deltadeaths !== "0"
                        ? `[↑ ${item.deltadeaths}]`
                        : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </IonGrid>
        <IonModal isOpen={showModal}>
          <div className="container">
            <p>{valueState}</p>
          </div>
          <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
export default Cases_India;
