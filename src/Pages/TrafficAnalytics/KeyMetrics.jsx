import React from 'react';
import ZoomableTimeseriesChart from './ZoomableTimeSeriesChart';

const KeyMetrics = ({
	uniquePageViews,
	newRegistered,
	churnedUsers,
	repeatCustomers,
}) => {
	return (
		<div>
			<span className='text-2xl font-bold pb-3 border-b-4 border-[#12516F]'>
				Key Metrics Over Time
			</span>

			<div className='w-full p-3 border border-gray-300 rounded-xl mt-16'>
				<ZoomableTimeseriesChart
					uniquePageViews={uniquePageViews}
					newRegistered={newRegistered}
					churnedUsers={churnedUsers}
					repeatCustomers={repeatCustomers}
				/>
			</div>
			{/* Channel Sessions  */}
			{/* <ChannelSessions /> */}
		</div>
	);
};

export default KeyMetrics;
