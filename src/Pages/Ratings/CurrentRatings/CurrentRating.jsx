import React from 'react'
import rating_1 from "../../../assets/Ratings/rating_1.png";
import rating_2 from "../../../assets/Ratings/rating_2.png";
import rating_3 from "../../../assets/Ratings/rating_3.png";
import rating_4 from "../../../assets/Ratings/rating_4.png";
import stars from "../../../assets/Ratings/stars.png";
import StoreRating from '../StoreRating/StoreRating';


const CurrentRating = () => {
  return (
    <div className="w-1/2">
            <div className="flex flex-col gap-4 p-2">
              <h1 className="text-[20px] leading-5 font-bold ">
                Current Ratings and Reviews
              </h1>
              <div className="flex flex-row gap-4">
                <img src={rating_2} alt="rating-2" />
                <div className="flex flex-col">
                  <img src={stars} alt="ratings-stars" />
                  <h2 className="text-xs">23 reviews</h2>
                </div>

                <div className="flex flex-row gap-2 justify-center items-center">
                  <h1 className="text-[16px] leading-4 font-medium">4.1</h1>
                  <div className="bg-[#25A249] w-[35px] h-[18px] text-[12px] leading-4 text-white rounded-xl px-[0.5px] py-[5.5px] flex flex-row items-center justify-center ">
                    +0.1
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <img src={rating_1} alt="rating-1" />
                <div className="flex flex-col">
                  <img src={stars} alt="ratings-stars" />
                  <h2 className="text-xs">23 reviews</h2>
                </div>

                <div className="flex flex-row gap-2 justify-center items-center">
                  <h1 className="text-[16px] leading-4 font-medium">4.1</h1>
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <img src={rating_3} alt="rating-3" />
                <div className="flex flex-col">
                  <img src={stars} alt="ratings-stars" />
                  <h2 className="text-xs">23 reviews</h2>
                </div>

                <div className="flex flex-row gap-2 justify-center items-center">
                  <h1 className="text-[16px] leading-4 font-medium">4.1</h1>
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <img src={rating_4} alt="rating-4" />
                <div className="flex flex-col">
                  <img src={stars} alt="ratings-stars" />
                  <h2 className="text-xs">23 reviews</h2>
                </div>

                <div className="flex flex-row gap-2 justify-center items-center">
                  <h1 className="text-[16px] leading-4 font-medium">4.1</h1>
                </div>
              </div>
            </div>

            <StoreRating/>
          </div>
  )
}

export default CurrentRating