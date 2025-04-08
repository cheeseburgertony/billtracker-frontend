import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { DatePicker, Popup } from "zarm";
import dayjs from "dayjs";

const PopupDate = memo(
  forwardRef(
    (
      {
        mode = "date",
        onSelect,
      }: { mode?: string; onSelect: (value: string) => void },
      ref
    ) => {
      const [show, setShow] = useState(false);
      const [date, setDate] = useState<Date>(new Date());

      // 将显示和隐藏的方法暴露出去
      useImperativeHandle(ref, () => ({
        show: () => setShow(true),
        close: () => setShow(false),
      }));

      // 选择时间后触发
      const handleChooseDate = (value: Date) => {
        setDate(value);
        setShow(false);
        if (mode === "month") {
          onSelect(dayjs(value).format("YYYY-MM"));
        } else if (mode === "date") {
          onSelect(dayjs(value).format("YYYY-MM-DD"));
        }
      };

      return (
        // @ts-ignore - zarm component type issue
        <Popup
          visible={show}
          direction="bottom"
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
      );
    }
  )
);

export default PopupDate;
