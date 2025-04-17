import { useRef, useState } from "react";

function OTPInput({ length = 6, onComplete }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Only allow single digit input
    if (value.match(/^\d$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }

      if (newOtp.every((digit) => digit !== "")) {
        onComplete(newOtp.join("")); // Call the onComplete callback with the OTP
      }
    }

    // Move focus to previous input on backspace
    if (value === "" && index >= 0) {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the value
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Move focus to previous input on backspace if current input is empty
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          style={{
            width: "40px",
            height: "40px",
            margin: "0 5px",
            textAlign: "center",
            fontSize: "18px",
            border: "1px solid #2C3092",
            borderRadius: "4px",
          }}
        />
      ))}
    </div>
  );
}

export default OTPInput;
