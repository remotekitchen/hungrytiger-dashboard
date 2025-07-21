import React from 'react'
import LoyaltyProgram from './LoyaltyProgram'
import BirthdayGift from './BirthdayGift'
import GiftCard from './GiftCard'
import MembershipCard from './MembershipCard'

const RetentionCampaigns = () => {
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-4">Retention Campaign</h1>
      <LoyaltyProgram/>
      <BirthdayGift/>
      <GiftCard/>
      <MembershipCard/>
    </div>
  )
}

export default RetentionCampaigns