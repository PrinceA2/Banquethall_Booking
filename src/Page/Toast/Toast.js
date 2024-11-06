// import React, { useState } from "react";

// const Password = ({
//     name,
//     label,
//     type,
//     id
// }) => {


//     const [passwordVal, setPasswordValidation] = useState({
//         displayVal: "none",
//         //startWithLetter:false,
//         uppercase: false,
//         lowercase: false,
//         specialChar: false,
//         numeral: false,
//         minchar: false,
//         maxchar: true,
//         valid: false
//     });

//     const [password, setPassword] = useState("");

//     const checkPasswordHandler = event => {
//         console.log("Password Valude :" + event.target.value);
//         setPassword(event.target.value);
//         let pass = event.target.value;

//         setPasswordValidation(passwordVal => {
//             return { ...passwordVal, displayVal: "block" };
//         });

//         var lowerCaseLetters = new RegExp("[a-z]");
//         if (pass.match(lowerCaseLetters)) {
//             console.log("lowercase");
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, lowercase: true };
//             });
//         } else {
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, lowerCase: false };
//             });
//         }
//         //Validate capital letters
//         var upperCaseLetters = new RegExp("[A-Z]");
//         if (pass.match(upperCaseLetters)) {
//             console.log(passwordVal);
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, uppercase: true };
//             });
//         } else {
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, uppercase: false };
//             });
//         }
//         //Validate a number
//         var numbers = new RegExp("[0-9]");
//         if (pass.match(numbers)) {
//             console.log(passwordVal);
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, numeral: true };
//             });
//         } else {
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, numeral: false };
//             });
//         }
//         // Validate minimum length
//         var regex = new RegExp("[.*]{8,}");
//         if (pass.length >= 8) {
//             console.log(passwordVal);
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, minchar: true };
//             });
//         } else {
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, minchar: false };
//             });
//         }
//         // Validate maximum length
//         var regex = new RegExp("[.*]{8,50}");
//         if (pass.length > 50) {
//             console.log(passwordVal);
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, maxchar: false };
//             });
//         } else {
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, maxchar: true };
//             });
//         }
//         //Validate Special Character
//         var regex = new RegExp("[-@#$%^&]");
//         if (pass.match(regex)) {
//             console.log(passwordVal);
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, specialchar: true };
//             });
//         } else {
//             setPasswordValidation(passwordVal => {
//                 return { ...passwordVal, specialchar: false };
//             });
//         }
//     };

//     return (
//         <div className="dsu-row dsu-form-row">
//             <div>
//                 <div
//                     className={`dsu-input-item fc-toggled dsu-col-lg-12 dsu-col-md-12 divLeft`}
//                 >
//                     <label htmlFor={name}>{label}</label>
//                     <input
//                         type={type}
//                         aria-label={label}
//                         id={id}
//                         aria-required={true}
//                         onChange={event => checkPasswordHandler(event)}
//                         value={password}
//                     />

//                 </div>

//                 <div
//                     id="message"
//                     className="arrow_box divRight"
//                     style={{ display: passwordVal.displayVal, width: "40%" }}
//                 >
//                     <h3>Password must contain the following:</h3>
//                     <p
//                         id="letter"
//                         className={passwordVal.lowercase ? "valid" : "invalid"}
//                     >Must have 1 Lower Case Alphabet</p>
//                     <p
//                         id="capital"
//                         className={passwordVal.uppercase ? "valid" : "invalid"}
//                     >
//                         Must have 1 Upper Case Alphabet
//                     </p>
//                     <p id="number" className={passwordVal.numeral ? "valid" : "invalid"}>
//                         Must have 1 Numeral Case Alphabet
//                     </p>
//                     <p id="length" className={passwordVal.minchar ? "valid" : "invalid"}>
//                         Minimum 8 characters required
//                     </p>
//                     <p id="length" className={passwordVal.maxchar ? "valid" : "invalid"}>
//                         Maximum of 50 characters only
//                     </p>
//                     <p
//                         id="specialchar"
//                         className={passwordVal.specialchar ? "valid" : "invalid"}
//                     >
//                         Must have 1 Special Character [-@#$%^&]
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Password;