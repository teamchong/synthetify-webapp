import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import ModalTemplate from '@components/Modals/ModalTemplate/ModalTemplate'
import { mint } from '@selectors/modals'
import { userMaxMintUsd } from '@selectors/exchange'
import { actions } from '@reducers/modals'
import { BN } from '@project-serum/anchor'

export const SendMoneyModal = () => {
  const dispatch = useDispatch()
  const modalState = useSelector(mint)
  const maxUsd = useSelector(userMaxMintUsd)
  return (
    <ModalTemplate
      onSend={(amount: BN) => {
        dispatch(actions.mint({ amount }))
      }}
      open={modalState.open}
      title='Mint'
      ticker='xUSD'
      helpText='Enter a custom or max amount of xUSD you want to mint.'
      loading={modalState.sending}
      txid={modalState.txid}
      handleClose={() => {
        if (modalState.txid) {
          dispatch(actions.closeModal('mint'))
          setTimeout(() => {
            dispatch(actions.resetModal('mint'))
          }, 500)
        } else {
          dispatch(actions.closeModal('mint'))
        }
      }}
      balance={maxUsd}
      decimals={8}
    />
  )
}

export default SendMoneyModal
