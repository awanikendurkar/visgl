import { render } from "react-dom";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
// import DeckGL from "@deck.gl/react";
import { PolygonLayer } from "@deck.gl/layers";
import { PathLayer } from "@deck.gl/layers";
import axios from "axios";

import React, { useState, useEffect } from "react";
import DeckGL from "deck.gl";
import { TripsLayer } from "@deck.gl/geo-layers";
import { StaticMap } from "react-map-gl";

const initialStyle = {
  position: "relative",
  width: "100%",
  height: "550px",
  border: "1px solid black",
};

// Viewport settings
const initialViewState = {
  longitude: -111.92518396810091,
  latitude: 33.414291502635706,
  zoom: 15,
  minZoom: 2,
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

const BLUE = [23, 184, 190];
const RED = [253, 128, 93];

const temp = [
  {
    trajectory_id: 73,
    vehicle_id: 73,
    timestamp: [1664515076, 1664515106],
    location: [
      [-111.92518390436581, 33.414237578989216],
      [-111.92518384063071, 33.414183655342725],
    ],
  },
  {
    trajectory_id: 63,
    vehicle_id: 63,
    timestamp: [1664514836, 1664514851, 1664514866, 1664514881, 1664514896],
    location: [
      [-111.92282161935306, 33.41427909937204],
      [-111.92285157742808, 33.414252073168285],
      [-111.92282153563072, 33.41422517574458],
      [-111.92282149374189, 33.41419819611907],
      [-111.92285145187222, 33.414171205538906],
    ],
  },
  {
    trajectory_id: 0,
    vehicle_id: 0,
    timestamp: [
      1664511371, 1664511386, 1664511401, 1664511416, 1664511431, 1664511446,
      1664512181, 1664512196, 1664512211, 1664512226, 1664512241, 1664515751,
      1664515766, 1664515781, 1664515796, 1664515811, 1664516546, 1664516561,
      1664516591, 1664516606,
    ],
    location: [
      [-111.92518396810091, 33.414291502635706],
      [-111.9251839362123, 33.414264523000654],
      [-111.92518390436581, 33.414237578989216],
      [-111.9251838724772, 33.41421059935417],
      [-111.92518384063071, 33.414183655342725],
      [-111.9251838087421, 33.41415667570768],
      [-111.92518394751099, 33.41427408234834],
      [-111.92518391562238, 33.4142471027133],
      [-111.92518388377589, 33.41422015870185],
      [-111.92518385188728, 33.41419317906681],
      [-111.92518382004077, 33.41416623505537],
      [-111.9251839362123, 33.414264523000654],
      [-111.92518390436581, 33.414237578989216],
      [-111.9251838724772, 33.41421059935417],
      [-111.92518384063071, 33.414183655342725],
      [-111.9251838087421, 33.41415667570768],
      [-111.92518394751099, 33.41427408234834],
      [-111.92518391562238, 33.4142471027133],
      [-111.92518385188728, 33.41419317906681],
      [-111.92518382004077, 33.41416623505537],
    ],
  },
];

export default function App({ mapStyle = MAP_STYLE }) {
  const [viewState, setViewState] = useState(initialViewState);
  const [time, setTime] = useState(0);

  const layers = [
    new TripsLayer({
      id: "trips",
      data: temp,
      getPath: (d) => d.location,
      getTimestamps: (d) => d.timestamps,
      getColor: (d) => (d.vehicle_id == 0 ? RED : BLUE),
      opacity: 0.5,
      widthMinPixels: 3,
      rounded: true,
      trailLength: 180,
      currentTime: time,
    }),
  ];

  return (
    <div className='row' style={{ display: "flex" }}>
      <div className='column' style={{ float: "left", flex: 75 }}>
        <DeckGL
          controller
          viewState={viewState}
          layers={layers}
          // style={style}
          onViewStateChange={(nextViewState) => {
            setViewState(nextViewState.viewState);
          }}
          width='70%'
        >
          <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing={true} />
        </DeckGL>
      </div>

      <div className='column' style={{ float: "right", flex: 20 }}>
        <button>Submit</button>
        {/* onClick={getQuery} */}
        <div style={{ width: "90%" }}>
          <input
            style={{ width: "100%" }}
            type='range'
            min='0'
            max='2486'
            step='10'
            value={time}
            onChange={(e) => {
              setTime(Number(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function renderToDOM(container) {
  render(<App />, container);
}
