import { QRCodeCanvas } from "qrcode.react";
import React from "react";

const Test = () => {
  return (
    <div>
      <QRCodeCanvas value="https://wa.me/8801521370824/?text='Hello world'" />
    </div>
  );
};

export default Test;
