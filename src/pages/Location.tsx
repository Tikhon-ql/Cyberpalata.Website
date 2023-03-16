import React from "react"
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

export const Location = () => {
    const defaultState = {
        center: [53.911755, 27.633732],
        zoom: 15,
      };
    
      return (
        <div className="myConteiner">
            <YMaps>
            <Map style={{"width":"100%","height":"80vh"}} defaultState={defaultState}>
                <Placemark geometry={[53.911755, 27.633732]} />
            </Map>
            </YMaps>
        </div>
      );
}