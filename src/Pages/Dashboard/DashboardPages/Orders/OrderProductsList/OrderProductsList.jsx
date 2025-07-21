import React, { useEffect } from 'react'
import Voucher from '../../../../Marketing/ActivationCampaign/Voucher';

function OrderProductsList({selectedOrderVoucher, orderdItem }) {

    

  
    useEffect(() => {
        const modal = document.getElementById('my_modal_4');
    
        if (modal) {
          // Close the modal when clicking outside of the modal box
          const handleBackdropClick = (event) => {
            if (event.target === modal) {
              modal.close();
            }
          };
    
          modal.addEventListener('click', handleBackdropClick);
    
          // Cleanup event listener on component unmount
          return () => {
            modal.removeEventListener('click', handleBackdropClick);
          };
        }
      }, []);




    return (
        <div>
            {/* <button id="open_modal_button" className="btn">Open Modals</button> */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table table-xs">
                                <thead className='font-bold text-black text-[18px]'>
                                    <tr>
                                        <th></th>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Reward</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody className='text-[16px]'>
                                    {orderdItem?.map((product, index) => <tr>
                                        <th>{index + 1}</th>
                                        <td>{product?.menu_item?.id}</td>
                                        <td>{product?.menu_item?.name}</td>
                                        <td>{Voucher?.reward?.item_details[0]?.name}</td>
                                        <td>${product?.menu_item?.base_price}</td>
                                    </tr>)}
                                </tbody>
                                {/* <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                    </tr>
                                </tfoot> */}
                            </table>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default OrderProductsList