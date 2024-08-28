import { forwardRef, memo, useImperativeHandle, useState } from 'react'

import s from './style.module.less'
import { Popup } from 'zarm'

const PopupAddBill = memo(forwardRef((props, ref) => {
  const [show, setShow] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
    close: () => setShow(false)
  }))

  return (
    <Popup
      visible={show}
      direction='bottom'
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <div style={{ height: 200, background: '#fff' }}>弹窗</div>
    </Popup>
  )
}))

export default PopupAddBill
