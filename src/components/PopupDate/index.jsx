import { forwardRef, memo, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Popup } from 'zarm'
import dayjs from 'dayjs'

const PopupDate = memo(forwardRef((props, ref) => {
  const { mode = 'date', onSelect } = props

  const [show, setShow] = useState(false)
  const [date, setDate] = useState(new Date())

  // 将显示和隐藏的方法暴露出去
  useImperativeHandle(ref, () => ({
    show: () => setShow(true),
    close: () => setShow(false)
  }))

  // 选择时间后触发
  const handleChooseDate = (value) => {
    setDate(value)
    setShow(false)
    if (mode === 'month') {
      onSelect(dayjs(value).format('YYYY-MM'))
    } else if (mode === 'date') {
      onSelect(dayjs(value).format('YYYY-MM-DD'))
    }
  }

  return (
    <Popup
      visible={show}
      direction='bottom'
      onMaskClick={() => setShow(false)}
      destroy={false}
      mountContainer={() => document.body}
    >
      <DatePicker
        visible={show}
        value={date}
        mode={mode}
        onOk={handleChooseDate}
        onCancel={() => setShow(false)}
      />
    </Popup>
  )
}))

PopupDate.propTypes = {
  mode: PropTypes.string,
  onSelect: PropTypes.func
}

export default PopupDate
