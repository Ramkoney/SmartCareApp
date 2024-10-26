
const validateSAID = (id) => {
    if (!/^\d{13}$/.test(id)) {
        return { valid: false, message: "ID must be 13 digits long." };
    }
  
    const birthdate = id.substring(0, 6);
    const citizenshipDigit = id[10];
    const checkDigit = id[12];
  

    const yy = parseInt(birthdate.substring(0, 2), 10);
    const mm = parseInt(birthdate.substring(2, 4), 10);
    const dd = parseInt(birthdate.substring(4, 6), 10);
    const birthYear = yy > 49 ? 1900 + yy : 2000 + yy;
    const date = new Date(birthYear, mm - 1, dd);
    const today = new Date();
    
    if (date.getFullYear() !== birthYear || date.getMonth() + 1 !== mm || date.getDate() !== dd) {
        return { valid: false, message: "Invalid date of birth in ID." };
    }
  

    let age = today.getFullYear() - birthYear;
    if (today.getMonth() + 1 < mm || (today.getMonth() + 1 === mm && today.getDate() < dd)) {
        age -= 1;
    }
  

    const gender = parseInt(id.substring(6, 10)) >= 5000 ? "Male" : "Female";
    const citizenship = citizenshipDigit === '0' ? "South African Citizen" : "Permanent Resident";
  
    
    return {
        valid: true,
        message: "ID is valid.",
        details: { gender, age, citizenship,birthdate }
    };
  };
  
  export default validateSAID;
  