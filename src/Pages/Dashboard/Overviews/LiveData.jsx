import React from "react";
import LiveDataCard4 from "./LiveDataCard4";
import LiveDataCard3 from "./LiveDataCard3";
import LiveDataCard2 from "./LiveDataCard2";
import LiveDataCard1 from "./LiveDataCard1";

const LiveData = ({
  selectedLocation,
  setSelectedLocation
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-5 mb-3">
        Real Time Insights
      </h1>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
        {selectedLocation === 'Richmond' ? (
          <>
            <LiveDataCard1 order={500} yesterdayOrder={200} />
            <LiveDataCard2 count={30} yesterdayCount={10}/>
            <LiveDataCard3 paid={60} yesterdayPaid={20}/>
            <LiveDataCard4 visit={2000} yesterdayVisit={800}/>
          </>
        ) : (
          <>
            <LiveDataCard1 order={800} yesterdayOrder={500} />
            <LiveDataCard2 count={80} yesterdayCount={30}/>
            <LiveDataCard3 paid={100} yesterdayPaid={60}/>
            <LiveDataCard4 visit={1200} yesterdayVisit={400}/>
          </>
        )}

      </div>
    </div>
  );
};

export default LiveData;
