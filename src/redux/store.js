import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authenticationReducer from "./features/authentication/authenticationSlice";
import birthdayGiftReducer from "./features/birthdayGift/birthdayGiftSlice";
import bogoReducer from "./features/bogo/bogoSlice";
import categoryCreationReducer from "./features/categoryCreation/categoryCreationSlice";
import fissionCampaignReducer from "./features/fissionCampaign/fissionCampaignApi";
import giftCardReducer from "./features/giftCard/giftCardSlice";
import groupInvitationSlice from "./features/groupInvitation/groupInvitationSlice";
import groupOrderingReducer from "./features/groupOrdering/groupOrderingSlice";
import itemCreationReducer from "./features/itemCreation/itemCreationSlice";
import loyaltyProgramReducer from "./features/loyaltyProgram/loyaltyProgramSlice";
import membershipCardReducer from "./features/membershipCard/membershipCardSlice";
import munuCreationReducer from "./features/menuCreation/menuCreationSlice";
import showModalReducer from "./features/modal/modalSlice";
import modifierGroupReducer from "./features/modifierGroup/modifierGroupSlice";
import ordersReducer from "./features/orders/ordersSlice";
import platformReducer from "./features/platform/platformSlice";
import restaurantCreationReducer from "./features/restaurentCreation/restaurentCreationSlice";
import rewardsReducer from "./features/Rewards/rewardsSlice";
import spendxsaveyReducer from "./features/SpendXSaveY/spendxsaveySlice";
import voucherReducer from "./features/Voucher/voucherSlice";
import modalReducer from "./features/modal/modalSlice"

export const store = configureStore({
  reducer: {
    selectedPlatform: platformReducer,
    modalReducer: showModalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authenticationReducer,
    menuCreation: munuCreationReducer,
    categoryCreation: categoryCreationReducer,
    itemCreation: itemCreationReducer,
    restaurentCreation: restaurantCreationReducer,
    orders: ordersReducer,
    spendxsavey: spendxsaveyReducer,
    voucher: voucherReducer,
    bogo: bogoReducer,
    groupOrdering: groupOrderingReducer,
    loyaltyProgram: loyaltyProgramReducer,
    birthdayGift: birthdayGiftReducer,
    giftCard: giftCardReducer,
    membershipCard: membershipCardReducer,
    groupInvitationReducer: groupInvitationSlice,
    fissionCampaign: fissionCampaignReducer,
    rewards: rewardsReducer,
    modifierGroup: modifierGroupReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
